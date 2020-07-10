import { useMemo } from 'react'
import { difference } from 'lodash'
import useFetch from './useFetch'
import urlWithGetParams from '../utils/urlWithGetParams'

const baseUrl = 'https://jlrc.dev.perx.ru/carstock/api/v1'

const urlVehicles = `${baseUrl}/vehicles`
const urlDealers = `${baseUrl}/dealers`

const useVehiclesData = (pageNumber, perPage) => {
  const getParams = [
    { name: 'state', value: 'active' },
    { name: 'hidden', value: 'false' },
    { name: 'group', value: 'new' },
    { name: 'page', value: pageNumber },
    { name: 'per_page', value: perPage },
  ]

  const params = useMemo(
    () => ({
      headers: {
        'Content-Type': 'application/json',
        'X-CS-Dealer-Id-Only': 1,
      },
    }),
    []
  )

  return useFetch(urlWithGetParams(urlVehicles, getParams), params)
}

const useDealersData = (vehicles, dealers) => {
  const newDealersId = vehicles.map(({ dealer }) => dealer)
  const oldDealersId = dealers.map(({ id }) => id)
  const uniqueId = [...new Set(newDealersId)]
  const withoutNullId = uniqueId.filter((item) => item)
  const dealerIdsToUrl = withoutNullId.join('')
  const getParams = [{ name: 'id__in', value: dealerIdsToUrl }]

  const mastBeSent = difference(withoutNullId, oldDealersId).length !== 0

  return useFetch(
    urlWithGetParams(urlDealers, getParams),
    null,
    mastBeSent,
    oldDealersId
  )
}

export { useVehiclesData, useDealersData }
