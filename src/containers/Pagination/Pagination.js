import React from 'react'
import { connect } from 'react-redux'
import {
  fetchData,
  changePerPageAC,
  changeCurrentPageAC,
} from '../../redux/actionCreators'
import withApiService from '../../HOC/withApiService'
import { compose } from '../../utils/compose'
import Pagination from '../../components/Pagination'

const PaginationContainer = ({
  totalItemsCount,
  perPage,
  currentPage,
  fetchData,
  changePerPageAC,
  changeCurrentPageAC,
}) => {
  const pageCount = Math.ceil(totalItemsCount / perPage)

  const onChangePageNumber = (num) => {
    changeCurrentPageAC(num)
    fetchData(num - 1, perPage)
  }

  const onChangePerPage = (e) => {
    const perPageValue = e.target.value
    changePerPageAC(perPageValue)
    changeCurrentPageAC(1)
    fetchData(0, perPageValue)
  }

  return (
    <Pagination
      onChangePageNumber={onChangePageNumber}
      onChangePerPage={onChangePerPage}
      count={pageCount}
      perPage={perPage}
      currentPage={currentPage}
    />
  )
}

const mapStateToProps = ({ totalItemsCount, perPage, currentPage }) => ({
  totalItemsCount,
  perPage,
  currentPage,
})

const mapDispatchToProps = (dispatch, { perxApiService }) => ({
  fetchData: fetchData(dispatch, perxApiService),
  changePerPageAC: (num) => dispatch(changePerPageAC(num)),
  changeCurrentPageAC: (num) => dispatch(changeCurrentPageAC(num)),
})

export default compose(
  withApiService(),
  connect(mapStateToProps, mapDispatchToProps)
)(PaginationContainer)
