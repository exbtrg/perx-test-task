import React, { useEffect } from 'react'
import { array, bool, oneOf, string, number, func } from 'prop-types'
import { connect } from 'react-redux'
import { fetchData } from '../../redux/actionCreators'
import vehiclesFields from './vehiclesFields'
import Table from '../../components/Table'
import transformData from '../../REST/transformData'

const VehiclesTable = ({
  dataVehicles,
  dataDealers,
  loading,
  error,
  perPage,
  currentPage,
  fetchData,
}) => {
  useEffect(() => {
    let cancelled = false
    if (!cancelled) {
      fetchData(currentPage, perPage, cancelled)
    }
    return () => {
      cancelled = true
    }
  }, [currentPage, fetchData, perPage])

  if (error) {
    return <p>Opps.... somthing went wrong</p>
  }

  return (
    <Table
      data={transformData(dataVehicles, dataDealers)}
      fields={vehiclesFields}
      loading={loading}
      perPage={perPage}
    />
  )
}

VehiclesTable.propTypes = {
  data: array,
  loading: bool,
  error: oneOf([null, string]),
  perPage: number,
  fetchData: func,
}

const mapStateToProps = ({
  dataVehicles,
  dataDealers,
  loading,
  error,
  perPage,
  currentPage,
}) => ({
  dataVehicles,
  dataDealers,
  loading,
  error,
  perPage,
  currentPage,
})

const mapDispatchToProps = {
  fetchData,
}

export default connect(mapStateToProps, mapDispatchToProps)(VehiclesTable)
