import React from 'react'
import { PerxApiServiceConsumer } from '../contexts/perxApiService'

const withPerxApiService = () => (Wrapped) => {
  return (props) => (
    <PerxApiServiceConsumer>
      {(perxApiService) => (
        <Wrapped perxApiService={perxApiService} {...props} />
      )}
    </PerxApiServiceConsumer>
  )
}

export default withPerxApiService
