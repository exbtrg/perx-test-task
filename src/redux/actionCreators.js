import {
  FETCH_DATA_REQUEST,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILURE,
  CHANGE_PER_PAGE,
  CHANGE_CURRENT_PAGE,
} from './actionTypes'

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

const changePerPageAC = (num) => ({
  type: CHANGE_PER_PAGE,
  payload: num,
})

const changeCurrentPageAC = (num) => ({
  type: CHANGE_CURRENT_PAGE,
  payload: num,
})

const updateData = (dispatch, apiService) => (
  pageNumber,
  perPage,
  listDealers
) => {
  dispatch(fetchDataRequestAC())
  apiService
    .fetchData(pageNumber, perPage, listDealers)
    .then((data) => {
      dispatch(fetchDataSuccessAC(data))
    })
    .catch((err) => {
      fetchDataFailureAC(err)
    })
}

export { updateData, changePerPageAC, changeCurrentPageAC }
