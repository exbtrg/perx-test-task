import {
  FETCH_DATA_REQUEST,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILURE,
  CHANGE_PER_PAGE,
  CHANGE_CURRENT_PAGE,
} from './actionTypes'

const rootReducer = (state, action) => {
  if (state === undefined) {
    return {
      data: [],
      loading: true,
      error: null,
      totalItemsCount: 0,
      perPage: 50,
      currentPage: 1,
    }
  }

  switch (action.type) {
    case FETCH_DATA_REQUEST:
      return {
        ...state,
        data: [],
        loading: true,
      }

    case FETCH_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload.list,
        totalItemsCount: Number(action.payload.headers.totalVehiclesCount),
        loading: false,
      }

    case FETCH_DATA_FAILURE:
      return {
        ...state,
        data: [],
        loading: false,
        error: action.payload,
      }

    case CHANGE_PER_PAGE:
      return {
        ...state,
        perPage: Number(action.payload),
      }

    case CHANGE_CURRENT_PAGE:
      return {
        ...state,
        currentPage: Number(action.payload),
      }

    default:
      return state
  }
}

export default rootReducer
