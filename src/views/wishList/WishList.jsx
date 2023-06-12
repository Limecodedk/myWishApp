import React, { useEffect } from 'react';
import Error from '../../components/Error';
import Loader from '../../components/Loader'
import useRequestData from '../../hooks/useRequestData'
import { Link } from 'react-router-dom';


const WishList = () => {
  const { data, isLoading, error, makeRequest } = useRequestData()

  useEffect(() => {

    makeRequest("https://api.airtable.com/v0/appKD8PbhWfK371me/Wish",
      {
        "Authorization": "Bearer " + process.env.REACT_APP_WishList
      })


  }, [])
  return (
    <>
      <h1>Ønskeliste</h1>
      {isLoading && <Loader />}

      {error && <Error />}
      {

        data && data.records.map(s =>
          <article key={s.id}>
            <table>
              <thead>
                <tr>
                  <th>Produkt:</th>
                  <th>Beskrivelse:</th>
                  <th>Link</th>
                  <th>Billede:</th>
                  <th>Ønskes af:</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{s.fields.Title}</td>
                  <td>{s.fields.Description}</td>
                  <td><Link to={s.fields.Link}>Se mere</Link></td>

                  {
                    s.fields.Images && <td ><img src={s.fields.Images} alt="" width={'150px'} height={'100px'} /></td>
                  }

                  <td>{s.fields.Name}</td>

                </tr>
              </tbody>
            </table>
          </article>
        )
      }
    </>
  )
}

export default WishList