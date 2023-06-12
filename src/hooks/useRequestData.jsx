import React from 'react'
import { useState } from 'react'
import axios from 'axios'


const useRequestData = () => {

  const [data, setData] = useState()
  const [isLoading, setIsLoading] = useState()
  const [error, setError] = useState()

  const makeRequest = async (url, headers = null, params = null, method = "GET", bodydata = null) => {

    setIsLoading(true); // Der loades = afventer svar fra api

    try {
      let response

      if (method === "GET") {
        response = await axios.get(url, { headers: headers, params: params })

      } else if (method === "POST") {
        response = await axios.post(url, bodydata, { headers: headers, params: params })

      } else if (method === "DELETE") {
        response = await axios.delete(url, { headers: headers, params: params })

      } else if (method === "PATCH") {
        response = await axios.patch(url, bodydata, { headers: headers, params: params })

      } /* else {
        throw new Error('Get post put patch delete was expected!')
      } */

      setData(response.data)
      setError()

    } catch (error) {
      console.log(error)
      setError("Der er opstået en fejl:" + error.message)

    } finally {
      setIsLoading(false)
    }
  }

  return (
    { data, isLoading, error, makeRequest }
  )
}

export default useRequestData