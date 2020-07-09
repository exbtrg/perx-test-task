import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchData } from '../../redux/actionCreators'
import vehiclesFields from './vehiclesFields'
import Table from '../../components/Table'
import withApiService from '../../HOC/withApiService'
import { compose } from '../../utils/compose'

const VehiclesTable = ({ data, loading, error, perPage, fetchData }) => {
  useEffect(() => {
    fetchData(0, perPage)
  }, [fetchData, perPage])

  if (error) {
    return <p>Opps.... что то надо починить</p>
  }

  return (
    <Table
      data={data}
      fields={vehiclesFields}
      loading={loading}
      perPage={perPage}
    />
  )
}

const mapStateToProps = ({ data, loading, error, perPage }) => ({
  data,
  loading,
  error,
  perPage,
})

const mapDispatchToProps = (dispatch, { perxApiService }) => ({
  fetchData: fetchData(dispatch, perxApiService),
})

export default compose(
  withApiService(),
  connect(mapStateToProps, mapDispatchToProps)
)(VehiclesTable)
