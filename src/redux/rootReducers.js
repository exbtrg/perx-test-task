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
      listVehicles: [],
      listDealers: [],
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
        listVehicles: [],
        loading: true,
      }

    case FETCH_DATA_SUCCESS:
      return {
        ...state,
        listVehicles: action.payload.vehicles.data,
        listDealers: [...state.listDealers, ...action.payload.dealers],
        totalItemsCount: Number(action.payload.vehicles.totalVehiclesCount),
        loading: false,
      }

    case FETCH_DATA_FAILURE:
      return {
        ...state,
        listVehicles: [],
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
