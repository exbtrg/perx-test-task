export const FETCH_INIT = 'FETCH_INIT'
export const FETCH_SUCCESS = 'FETCH_SUCCESS'
export const FETCH_FAILURE = 'FETCH_FAILURE'

const fetchInitAC = () => ({
  type: FETCH_INIT,
})

const fetchSuccessAC = (data, headers) => ({
  type: FETCH_SUCCESS,
  payload: {
    data,
    headers,
  },
})

const fetchFailureAC = (error) => ({
  type: FETCH_FAILURE,
  payload: error,
})

export { fetchInitAC, fetchSuccessAC, fetchFailureAC }
