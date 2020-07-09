import React from 'react'

const perxApiServiceContext = React.createContext()

const {
  Provider: PerxApiServiceProvider,
  Consumer: PerxApiServiceConsumer,
} = perxApiServiceContext

export { perxApiServiceContext, PerxApiServiceProvider, PerxApiServiceConsumer }
