import React from 'react'
import { number, func } from 'prop-types'
import { connect } from 'react-redux'
import {
  changePerPageAC,
  changeCurrentPageAC,
} from '../../redux/actionCreators'
import Pagination from '../../components/Pagination'

const PaginationContainer = ({
  totalItemsCount,
  perPage,
  currentPage,
  changePerPageAC,
  changeCurrentPageAC,
}) => {
  const pageCount = Math.ceil(totalItemsCount / perPage)

  const onChangePageNumber = (num) => {
    changeCurrentPageAC(num - 1)
  }

  const onChangePerPage = (e) => {
    const perPageValue = e.target.value
    changePerPageAC(perPageValue)
    changeCurrentPageAC(0)
  }

  return (
    <Pagination
      onChangePageNumber={onChangePageNumber}
      onChangePerPage={onChangePerPage}
      count={pageCount}
      perPage={perPage}
      currentPage={currentPage + 1}
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

const mapDispatchToProps = {
  changePerPageAC,
  changeCurrentPageAC,
}

export default connect(mapStateToProps, mapDispatchToProps)(PaginationContainer)
