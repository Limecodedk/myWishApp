import React, { useEffect, useState } from 'react';
import Error from '../../../components/Error';
import Loader from '../../../components/Loader'

import useRequestData from '../../../hooks/useRequestData'

const CreateWish = () => {

  //init request-hook
  const { data, isLoading, error, makeRequest } = useRequestData()
  const { data: dataWish, isLoading: isLoadingWish, error: errorWish, makeRequest: makeRequestWish } = useRequestData()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [link, setLink] = useState('')
  const [image, setImage] = useState('')
  const [wishGategorie, setWishGategorie] = useState('')



  useEffect(() => {

    makeRequestWish("https://api.airtable.com/v0/appKD8PbhWfK371me/categorie?sort%5B0%5D%5Bfield%5D=Name",
      { "Authorization": "Bearer " + process.env.REACT_APP_WishList, "Content-Type": "application/json" }
    )

  }, [])

  const handleSubmit = e => {
    e.preventDefault();

    makeRequest("https://api.airtable.com/v0/appKD8PbhWfK371me/Wish",
      {
        "Authorization": "Bearer " + process.env.REACT_APP_WishList,
        "Content-Type": "application/json"
      }, null, "POST",
      {
        "fields": {
          "Title": title,
          "Description": description,
          "Link": link,
          "Images": image,
          "categorie": [
            wishGategorie
          ]
        }
      })
    e.target.reset() //Tøm input felter efter oprettelse 
  }

  return (
    <>
      <h1>Tilføj et ønske</h1>
      {isLoading && <Loader />}

      {error && <Error />}

      <form onSubmit={handleSubmit}>
        <input type="text" name="" id="" onChange={e => setTitle(e.target.value)} placeholder='Skriv navnet på ønsket' required />
        <input type="text" name="" id="" onChange={e => setDescription(e.target.value)} placeholder='Beskriv kort ønsket' required />
        <input type="text" name="" id="" onChange={e => setLink(e.target.value)} placeholder='Indsæt et link' />
        <input type="text" name="" id="" onChange={e => setImage(e.target.value)} placeholder='Indsæt billede url adresse' />

        <select onChange={e => setWishGategorie(e.target.value)} defaultValue="DEFAULT">
          <option value="DEFAULT" disabled>Vælg en kategori</option>
          {dataWish && dataWish.records.map(s =>
            <option key={s.id} value={s.id} >{s.fields.Name}</option>
          )
          }
        </select>
        <button type='submit'>Opret Ønske</button>
      </form>
      {
        data &&
        < article >
          {data.fields.Item} er oprettet
        </article >
      }

    </>
  )
}

export default CreateWish
