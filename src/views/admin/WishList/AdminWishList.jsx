import React, { useEffect } from 'react';
import Error from '../../../components/Error';
import Loader from '../../../components/Loader'
import useRequestData from '../../../hooks/useRequestData'
import { FiEdit } from "react-icons/fi";
import { MdOutlineDelete } from "react-icons/md";
import { Link } from 'react-router-dom';

const AdminWishListe = () => {

  //init request-hook
  const { data, isLoading, error, makeRequest } = useRequestData()
  const { data: dataDelete, isLoading: isLoadingDelete, error: errorDelete, makeRequest: makeRequestDelete } = useRequestData()

  useEffect(() => {

    makeRequest("https://api.airtable.com/v0/appKD8PbhWfK371me/Wish",
      {
        "Authorization": "Bearer " + process.env.REACT_APP_WishList
      })

  }, [dataDelete])

  const handleDelete = (id, Title) => {

    if (window.confirm("Wow er du sikker på at du vil slette " + Title + "?")) {
      makeRequestDelete("https://api.airtable.com/v0/appKD8PbhWfK371me/Wish/" + id,
        {
          "Authorization": "Bearer " + process.env.REACT_APP_WishList
        }, null, "DELETE")
    }
  }

  return (
    <>
      <h1>Ønskeliste</h1>
      {isLoading && <Loader />}

      {error && <Error />}


      <table>
        <thead>
          <tr>
            <th>Produkt:</th>
            <th>Antal:</th>
            <th>Note:</th>
            <th>ID nummer:</th>
            <th>Ret</th>
            <td>Slet</td>
          </tr>
        </thead>
        <tbody>
          {
            data && data.records.map(s =>

              <tr key={s.id}>
                <td>{s.fields.Title}</td>
                <td>{s.fields.Description}</td>
                <td>{s.fields.Link}</td>
                <td>{s.id}</td>
                <td><Link to={"/admin/editwish/" + s.id} ><FiEdit size={"1.5em"} /></Link></td>
                <td><MdOutlineDelete size={"1.7em"} color='darkred' onClick={() => handleDelete(s.id, s.fields.Title)} /></td>
              </tr>
            )
          }
        </tbody >
      </table>

    </>
  )
}

export default AdminWishListe
