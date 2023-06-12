import React, { useEffect, useState } from 'react';
import Error from '../../../components/Error';
import Loader from '../../../components/Loader'
import { useParams } from 'react-router-dom';

import useRequestData from '../../../hooks/useRequestData'

const EditWish = () => {

  const { id } = useParams()

  //init request-hook
  const { data, isLoading, error, makeRequest } = useRequestData()
  const { data: dataWish, isLoading: isLoadingWish, error: errorWish, makeRequest: makeRequestWish } = useRequestData()
  const { data: dataUser, isLoading: isLoadingUser, error: errorUser, makeRequest: makeRequestUser } = useRequestData()

  const [title, setTitle] = useState()
  const [description, setDescription] = useState()
  const [link, setLink] = useState()
  const [image, setImage] = useState()
  const [wishGategorie, setWishGategorie] = useState()
  const [wishUser, setWishUser] = useState()

  useEffect(() => {

    // hent oplysninger på varen der skal rettets ud fra id
    makeRequest("https://api.airtable.com/v0/appKD8PbhWfK371me/Wish/" + id,
      {
        "Authorization": "Bearer " + process.env.REACT_APP_WishList,
      })

    //Hent alle butikker
    makeRequestWish("https://api.airtable.com/v0/appKD8PbhWfK371me/categorie?sort%5B0%5D%5Bfield%5D=Name",
      { "Authorization": "Bearer " + process.env.REACT_APP_WishList, "Content-Type": "application/json" }
    )

    //Hent Hvem der ønsker sig
    makeRequestUser("https://api.airtable.com/v0/appKD8PbhWfK371me/User?sort%5B0%5D%5Bfield%5D=Name",
      { "Authorization": "Bearer " + process.env.REACT_APP_WishList, "Content-Type": "application/json" }
    )

  }, []);


  //Når vare er hentet - ligger i data
  useEffect(() => {
    if (data) {
      setTitle(data.fields.Title)
      setDescription(data.fields.Description)
      setLink(data.fields.Link)
      setImage(data.fields.Images)
      setWishGategorie(data.fields.categorie[0])
      setWishUser(data.fields.User)
    }
  }, [data])


  const handleSubmit = e => {
    e.preventDefault();

    makeRequest("https://api.airtable.com/v0/appKD8PbhWfK371me/Wish/" + id,
      {
        "Authorization": "Bearer " + process.env.REACT_APP_WishList,
        "Content-Type": "application/json"
      }, null, "PATCH",
      {
        "fields": {
          "Title": title,
          "Description": description,
          "Link": link,
          "Images": image,
          "categorie": [
            wishGategorie
          ],
          "User": [
            wishUser
          ]
        }
      })
  }

  return (
    <>
      <h1>Ret Ønskeliste - {title}</h1>
      {isLoading && <Loader />}

      {error && <Error error={error} />}

      <form onSubmit={e => handleSubmit(e)}>
        <input type="text" name="" id="" value={title ? title : ''} onChange={e => setTitle(e.target.value)} placeholder={'skriv et navn'} required />
        <input type="text" name="" id="" value={description ? description : ''} onChange={e => setDescription(e.target.value)} placeholder='Skriv en beskrivelse' />
        <input type="text" name="" id="" value={link ? link : ''} onChange={e => setLink(e.target.value)} placeholder='Indsæt link' />
        <input type="text" name="" id="" value={image ? image : ''} onChange={e => setImage(e.target.value)} placeholder='Indsæt link til billede' />
        <select onChange={e => setWishGategorie(e.target.value)} value={wishGategorie ? wishGategorie : "DEFAULT"}>
          <option value="DEFAULT" disabled>Vælg en kategori</option>
          {dataWish && dataWish.records.map(s =>
            <option key={s.id} value={s.id} >{s.fields.Name}</option>
          )
          }
        </select>
        <select onChange={e => setWishUser(e.target.value)} value={wishUser ? wishUser : "DEFAULT"}>
          <option value="DEFAULT" disabled>Hvem ønsker sig</option>
          {dataUser && dataUser.records.map(s =>
            <option key={s.id} value={s.id} >{s.fields.Name}</option>
          )
          }
        </select>
        {/*   {
          image && <td ><img src={image} alt="" width={'150px'} height={'100px'} /></td>
        } */}
        <button type='submit'>Ret vare</button>
      </form>
    </>
  )
}

export default EditWish;