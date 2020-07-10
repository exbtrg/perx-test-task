import React from 'react'
import { number, func } from 'prop-types'
import { connect } from 'react-redux'
import {
  fetchData,
  changePerPageAC,
  changeCurrentPageAC,
} from '../../redux/actionCreators'
import Pagination from '../../components/Pagination'

const PaginationContainer = ({
  totalItemsCount,
  perPage,
  currentPage,
  // fetchData,
  changePerPageAC,
  changeCurrentPageAC,
}) => {
  const pageCount = Math.ceil(totalItemsCount / perPage)

  const onChangePageNumber = (num) => {
    changeCurrentPageAC(num)
    // fetchData(num - 1, perPage)
  }

  const onChangePerPage = (e) => {
    const perPageValue = e.target.value
    console.log(e.target)
    changePerPageAC(perPageValue)
    changeCurrentPageAC(1)
    // fetchData(0, perPageValue)
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

const mapStateToProps = ({ totalItemsCount, perPage, currentPage }) => ({
  totalItemsCount,
  perPage,
  currentPage,
})

const mapDispatchToProps = (dispatch) => ({
  // fetchData: fetchData(dispatch),
  changePerPageAC: (num) => dispatch(changePerPageAC(num)),
  changeCurrentPageAC: (num) => dispatch(changeCurrentPageAC(num)),
})

export default connect(mapStateToProps, mapDispatchToProps)(PaginationContainer)
