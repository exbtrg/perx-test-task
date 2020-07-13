import withGetParams from '../utils/withGetParams'
import { urlVehicles, urlDealers } from './config'

const fetchVehiclesData = (pageNumber, perPage) => {
  const getParams = [
    { name: 'state', value: 'active' },
    { name: 'hidden', value: 'false' },
    { name: 'group', value: 'new' },
    { name: 'page', value: pageNumber },
    { name: 'per_page', value: perPage },
  ]

  const params = {
    headers: {
      'Content-Type': 'application/json',
      'X-CS-Dealer-Id-Only': 1,
    },
  }

  return fetch(withGetParams(urlVehicles, getParams), params)
}

const fetchDealersData = async (dealersIds) => {
  const getParams = [{ name: 'id__in', value: dealersIds.join(',') }]

  return fetch(withGetParams(urlDealers, getParams))
}

export { fetchVehiclesData, fetchDealersData }
