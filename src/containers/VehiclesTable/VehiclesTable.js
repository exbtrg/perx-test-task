import React, { useEffect } from 'react'
import { array, bool, oneOf, string, number, func } from 'prop-types'
import { connect } from 'react-redux'
import { updateData } from '../../redux/actionCreators'
import vehiclesFields from './vehiclesFields'
import Table from '../../components/Table'
import { transformData } from './selectTableData'
import withApiService from '../../HOC/withApiService'
import { compose } from '../../utils/compose'

const VehiclesTable = ({
  listVehicles,
  listDealers,
  loading,
  error,
  perPage,
  fetchData,
}) => {
  useEffect(() => {
    fetchData(0, perPage, listDealers)
  }, [fetchData, perPage])

  if (error) {
    return <p>Opps.... somthing went wrong</p>
  }

  return (
    <Table
      data={transformData(listVehicles, listDealers)}
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
  listVehicles,
  listDealers,
  loading,
  error,
  perPage,
}) => ({
  listVehicles,
  listDealers,
  loading,
  error,
  perPage,
})

const mapDispatchToProps = (dispatch, { perxApiService }) => ({
  fetchData: updateData(dispatch, perxApiService),
})

export default compose(
  withApiService(),
  connect(mapStateToProps, mapDispatchToProps)
)(VehiclesTable)
