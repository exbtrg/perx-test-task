import urlWithGetParams from '../utils/urlWithGetParams'
import { difference } from 'lodash'

export default class {
  _baseUrl = 'https://jlrc.dev.perx.ru/carstock/api/v1'
  _urlVehicles = `${this._baseUrl}/vehicles`
  _urlDealers = `${this._baseUrl}/dealers`

  getDealerIdsFromVehicles = (listVehicles) => {
    const dealersId = listVehicles.map(({ dealer }) => dealer)
    const uniqueId = [...new Set(dealersId)]
    const withOutNullId = uniqueId.filter((item) => item)

    return withOutNullId
  }

  getDealerIdsFromDealers = (listDealers) => {
    return listDealers.map(({ id }) => id)
  }

  getResource = async (url, params = null) => {
    const res = await fetch(url, params)

    if (!res.ok) {
      throw new Error(`Could no fetch ${url}, status ${res.status}`)
    }

    return res
  }

  fetchVehicles = async (pageNumber, perPage) => {
    const { _urlVehicles, getResource } = this

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

    const vehiclesRes = await getResource(
      urlWithGetParams(_urlVehicles, getParams),
      params
    )

    const vehiclesBody = await vehiclesRes.json()
    const totalVehiclesCount = vehiclesRes.headers.get('x-total-count')

    return {
      data: vehiclesBody,
      totalVehiclesCount,
    }
  }

  fetchDealers = async ({ data }, listDealers) => {
    const {
      _urlDealers,
      getResource,
      getDealerIdsFromVehicles,
      getDealerIdsFromDealers,
    } = this

    const oldList = getDealerIdsFromDealers(listDealers)
    const newList = getDealerIdsFromVehicles(data)

    const diff = difference(newList, oldList)

    const getParams = [{ name: 'id__in', value: diff.join(',') }]

    if (diff.length !== 0) {
      const dealersRes = await getResource(
        urlWithGetParams(_urlDealers, getParams)
      )
      return await dealersRes.json()
    }

    return listDealers
  }

  fetchData = async (pageNumber, perPage, listDealers) => {
    const { fetchVehicles, fetchDealers } = this

    const vehicles = await fetchVehicles(pageNumber, perPage)

    const dealers = await fetchDealers(vehicles, listDealers)

    return { vehicles, dealers }
  }
}
