import React from 'react'
import { number, func } from 'prop-types'
import { connect } from 'react-redux'
import {
  updateData,
  changePerPageAC,
  changeCurrentPageAC,
} from '../../redux/actionCreators'
import withApiService from '../../HOC/withApiService'
import { compose } from '../../utils/compose'
import Pagination from '../../components/Pagination'

const PaginationContainer = ({
  listDealers,
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
    fetchData(num - 1, perPage, listDealers)
  }

  const onChangePerPage = (e) => {
    const perPageValue = e.target.value
    console.log(e.target)
    changePerPageAC(perPageValue)
    changeCurrentPageAC(1)
    fetchData(0, perPageValue, listDealers)
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

PaginationContainer.propTypes = {
  totalItemsCount: number,
  perPage: number,
  currentPage: number,
  fetchData: func,
  changePerPageAC: func,
  changeCurrentPageAC: func,
}

const mapStateToProps = ({
  listDealers,
  totalItemsCount,
  perPage,
  currentPage,
}) => ({
  listDealers,
  totalItemsCount,
  perPage,
  currentPage,
})

const mapDispatchToProps = (dispatch, { perxApiService }) => ({
  fetchData: updateData(dispatch, perxApiService),
  changePerPageAC: (num) => dispatch(changePerPageAC(num)),
  changeCurrentPageAC: (num) => dispatch(changeCurrentPageAC(num)),
})

export default compose(
  withApiService(),
  connect(mapStateToProps, mapDispatchToProps)
)(PaginationContainer)
