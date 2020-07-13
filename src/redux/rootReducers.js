import {
  FETCH_DATA_REQUEST,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILURE,
  UPDATE_DEALERS_DATA,
  CHANGE_PER_PAGE,
  CHANGE_CURRENT_PAGE,
} from './actionTypes'

const initialState = {
  dataDealers: [],
  dataVehicles: [],
  loading: true,
  error: null,
  totalItemsCount: 0,
  perPage: 50,
  currentPage: 0,
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA_REQUEST:
      return {
        ...state,
        dataVehicles: [],
        loading: true,
      }

    case FETCH_DATA_SUCCESS:
      return {
        ...state,
        dataVehicles: action.payload.dataVehicles,
        totalItemsCount: Number(action.payload.totalVehiclesCount),
        loading: false,
      }

    case FETCH_DATA_FAILURE:
      return {
        ...state,
        dataVehicles: [],
        loading: false,
        error: action.payload,
      }

    case UPDATE_DEALERS_DATA:
      return {
        ...state,
        dataDealers: [...state.dataDealers, ...action.payload],
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
