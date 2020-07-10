import React, { useCallback } from 'react'
import { array, bool, oneOf, string, number, func } from 'prop-types'
import { connect } from 'react-redux'
import { useVehiclesData, useDealersData } from '../../hooks/usePerxApi'
import { fetchData } from '../../redux/actionCreators'
import vehiclesFields from './vehiclesFields'
import Table from '../../components/Table'

const VehiclesTable = ({ perPage }) => {
  const [vehiclesData] = useVehiclesData(0, perPage)

  useCallback(() => {}, [])

  if (vehiclesData.error) {
    return <p>Opps.... somthing went wrong</p>
  }

  return (
    <Table
      data={vehiclesData.data}
      fields={vehiclesFields}
      loading={vehiclesData.loading}
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

const mapStateToProps = ({ perPage }) => ({
  perPage,
})

const mapDispatchToProps = (dispatch) => ({
  fetchData: fetchData(dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(VehiclesTable)
