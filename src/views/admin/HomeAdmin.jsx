import React, { useEffect, useState } from 'react';
import Error from '../../components/Error';
import Loader from '../../components/Loader'
import { formatDistanceToNow, format } from 'date-fns';
import { da } from 'date-fns/locale'
import { MdOutlineDelete } from "react-icons/md";


import useRequestData from '../../hooks/useRequestData'

const HomeAdmin = () => {
  //init request-hook
  const { data, isLoading, error, makeRequest } = useRequestData()
  const { data: dataEvent, isLoading: isLoadingEvent, error: errorEvent, makeRequest: makeRequestEvent } = useRequestData()
  const { data: dataDelete, isLoading: isLoadingDelete, error: errorDelete, makeRequest: makeRequestDelete } = useRequestData()

  const [eventName, setEventName] = useState('')
  const [dato, setDato] = useState('')
  const [note, setNote] = useState('')



  useEffect(() => {

    makeRequestEvent("https://api.airtable.com/v0/appKD8PbhWfK371me/Event",
      {
        "Authorization": "Bearer " + process.env.REACT_APP_WishList
      })

  }, [dataEvent, dataDelete])

  const handleSubmit = e => {
    e.preventDefault();

    makeRequest("https://api.airtable.com/v0/appKD8PbhWfK371me/Event",
      {
        "Authorization": "Bearer " + process.env.REACT_APP_WishList,
        "Content-Type": "application/json"
      }, null, "POST",
      {
        "fields": {
          "EventName": eventName,
          "Dato": dato,
          "Notes": note,
        }
      })
    e.target.reset() //Tøm input felter efter oprettelse 
  }

  const handleDelete = (id, EventName) => {

    if (window.confirm("Wow er du sikker på at du vil slette " + EventName + "?")) {
      makeRequestDelete("https://api.airtable.com/v0/appKD8PbhWfK371me/Event/" + id,
        {
          "Authorization": "Bearer " + process.env.REACT_APP_WishList
        }, null, "DELETE")
    }
  }

  return (
    <>
      <h1>Velkommen Admin!</h1>
      {isLoading && <Loader />}

      {error && <Error />}
      <h2>Opret en ny begivenhed!</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="" id="" onChange={e => setEventName(e.target.value)} placeholder='Skriv navnet på event' required />
        <input type="date" name="" id="" onChange={e => setDato(e.target.value)} placeholder='Beskriv kort ønsket' required />
        <input type="text" name="" id="" onChange={e => setNote(e.target.value)} placeholder='Skriv en privatnote' />
        <button type='submit'>Opret Ønske</button>
      </form>

      {data && data.fields && data.fields.Item && (
        <article>
          {data.fields.Item} er oprettet
        </article>
      )}

      {dataEvent && dataEvent.records && dataEvent.records.length > 0 && (
        <div>
          <h2>Oprettet begivenhed:</h2>
          <table>
            <thead>
              <tr>
                <td>Begivenhed:</td>
                <td>Slet</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{dataEvent.records[0].fields.EventName}" om {formatDistanceToNow(new Date(dataEvent.records[0].fields.Dato), { locale: da })} (Den {format(new Date(dataEvent.records[0].fields.Dato), 'dd/MM/yyyy', { locale: da })}) <br /> <p>Note: {dataEvent.records[0].fields.Notes}</p></td>
                <td>  <MdOutlineDelete size={"1.7em"} color='darkred' onClick={() => handleDelete(dataEvent.records[0].id, dataEvent.records[0].fields.EventName)} /></td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

    </>
  )
}

export default HomeAdmin
