import { FETCH_INIT, FETCH_SUCCESS, FETCH_FAILURE } from './fetchActions'

const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case FETCH_INIT:
      return {
        data: null,
        headers: null,
        loading: true,
        error: null,
      }

    case FETCH_SUCCESS:
      return {
        data: action.payload.data,
        headers: action.payload.headers,
        loading: false,
        error: null,
      }

    case FETCH_FAILURE:
      return {
        data: null,
        headers: null,
        loading: false,
        error: action.payload,
      }

    default:
      return state
  }
}

export default dataFetchReducer
