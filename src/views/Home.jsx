import React, { useEffect } from 'react';
import Error from '../components/Error';
import Loader from '../components/Loader'
import useRequestData from '../hooks/useRequestData'
import { Link } from 'react-router-dom';
import { formatDistanceToNow, format } from 'date-fns';
import { da } from 'date-fns/locale'


const Home = () => {


  const { data, isLoading, error, makeRequest } = useRequestData()

  useEffect(() => {

    makeRequest("https://api.airtable.com/v0/appKD8PbhWfK371me/Event",
      {
        "Authorization": "Bearer " + process.env.REACT_APP_WishList
      })


  }, [])

  return (
    <div className='main'>
      {isLoading && <Loader />}
      {error && <Error />}
      <section className='hero'>
        <img className='hero-bg' src="/assets/Hero-image.jpg" alt="" />
        <div className='hero-logo'>
        </div>
        <div className='hero-text'>
          {data && data.records.length > 0 && (
            <div>
              <h2> Se min ønskeseddel: {data.records[0].fields.EventName}</h2>
              som er om {formatDistanceToNow(new Date(data.records[0].fields.Dato), { locale: da })} (Den {format(new Date(data.records[0].fields.Dato), 'dd/MM/yyyy', { locale: da })})
              <br />
              <Link className='btn' to={"/wishList"}>se min ønskeliste</Link>
            </div>
          )}
        </div>
      </section>
      <section className='aboutsection'>
        <div className='content'>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illum ipsam veniam incidunt molestiae, ratione ducimus alias temporibus voluptas sint facilis. Voluptatem, odio explicabo? Pariatur optio quia iste quod facilis labore!
        </div>
        <div className='image'>
          <img src="/assets/phone-team.jpg" alt="" />
        </div>
        <div className='image'>
          <img src="/assets/phone.png" alt="" />
        </div>
        <div className='content'>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illum ipsam veniam incidunt molestiae, ratione ducimus alias temporibus voluptas sint facilis. Voluptatem, odio explicabo? Pariatur optio quia iste quod facilis labore!
        </div>
      </section>
      <section className='countersection' >
        {data && data.records.length > 0 && (
          <div>
            <h2> Se min ønskeseddel: {data.records[0].fields.EventName}</h2>
            Der er kun {formatDistanceToNow(new Date(data.records[0].fields.Dato), { locale: da })} til (Den {format(new Date(data.records[0].fields.Dato), 'dd/MM/yyyy', { locale: da })})
            <br />
            <Link className='btn' to={"/wishList"}>se min ønskeliste</Link>
          </div>
        )}
        <img src="/assets/3d-balloons-present-box.png" alt="" />
      </section>
    </div>
  )
}

export default Home