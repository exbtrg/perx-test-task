import { difference } from 'lodash'
import {
  FETCH_DATA_REQUEST,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILURE,
  UPDATE_DEALERS_DATA,
  CHANGE_PER_PAGE,
  CHANGE_CURRENT_PAGE,
} from './actionTypes'
import { fetchVehiclesData, fetchDealersData } from '../REST/api'

const getDealerIdsFromVehicles = (listVehicles) => {
  const dealersId = listVehicles.map(({ dealer }) => dealer)
  const uniqueId = [...new Set(dealersId)]
  const withOutNullId = uniqueId.filter((item) => item)

  return withOutNullId
}

const getDealerIdsFromDealers = (listDealers) => {
  return listDealers.map(({ id }) => id)
}

const fetchDataRequestAC = () => ({
  type: FETCH_DATA_REQUEST,
})

const fetchDataSuccessAC = (data) => ({
  type: FETCH_DATA_SUCCESS,
  payload: data,
})

const fetchDataFailureAC = (err) => ({
  type: FETCH_DATA_FAILURE,
  payload: err,
})

const updateDealersData = (data) => ({
  type: UPDATE_DEALERS_DATA,
  payload: data,
})

const changePerPageAC = (num) => ({
  type: CHANGE_PER_PAGE,
  payload: num,
})

const changeCurrentPageAC = (num) => ({
  type: CHANGE_CURRENT_PAGE,
  payload: num,
})

const fetchData = (currentPage, perPage) => async (dispatch, getState) => {
  try {
    dispatch(fetchDataRequestAC())

    const { dataDealers } = getState()
    const resVehicles = await fetchVehiclesData(currentPage, perPage)
    const dataVehicles = await resVehicles.json()
    const totalVehiclesCount = resVehicles.headers.get('x-total-count')

    const oldDealersList = getDealerIdsFromDealers(dataDealers)
    const newDealersList = getDealerIdsFromVehicles(dataVehicles)

    const diff = difference(newDealersList, oldDealersList)

    if (diff.length !== 0) {
      const resDealers = await fetchDealersData(diff)
      const bodyDealers = await resDealers.json()

      dispatch(updateDealersData(bodyDealers))
    }

    dispatch(fetchDataSuccessAC({ dataVehicles, totalVehiclesCount }))
  } catch (error) {
    fetchDataFailureAC(error)
  }
}

export { fetchData, changePerPageAC, changeCurrentPageAC }
