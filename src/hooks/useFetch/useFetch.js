import { useReducer, useEffect, useState } from 'react'
import dataFetchReducer from './dataFetchReducer.js'
import { fetchInitAC, fetchSuccessAC, fetchFailureAC } from './fetchActions'

const useFetch = (
  initialUrl,
  params = null,
  mastBeSent = true,
  data = null
) => {
  const [url, setUrl] = useState(initialUrl)

  const [state, dispatch] = useReducer(dataFetchReducer, {
    data: data,
    headers: null,
    loading: true,
    error: null,
  })

  useEffect(() => {
    let cancelled = false

    const fetchData = async () => {
      dispatch(fetchInitAC())

      try {
        const res = await fetch(url, params)
        const body = await res.json()
        const headers = res.headers

        if (!cancelled) {
          dispatch(fetchSuccessAC(res, headers))
        }
      } catch (error) {
        if (!cancelled) {
          dispatch(fetchFailureAC(error))
        }
      }
    }

    if (mastBeSent) {
      fetchData()
    }

    return () => {
      cancelled = true
    }
  }, [mastBeSent, params, url])

  return [state, setUrl]
}

export default useFetch
