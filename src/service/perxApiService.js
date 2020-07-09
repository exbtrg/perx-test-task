export default class {
  _apiBase = 'https://jlrc.dev.perx.ru/carstock/api/v1'

  _apiVehiclesPageUrl = (pageNumber, perPage) => {
    return `/vehicles/?state=active&hidden=false&group=new&page=${pageNumber}&per_page=${perPage}`
  }

  _apiDealersUrl = (dataVihicles) => {
    const dealersId = dataVihicles.map(({ dealer }) => dealer)
    const uniqueId = [...new Set(dealersId)]
    const withOutNullId = uniqueId.filter((item) => item)

    const collectIdForUrl = `/dealers/?id__in=${withOutNullId
      .map((item) => `${item}`)
      .join(',')}`
    return collectIdForUrl
  }

  getResource = async (url, params = {}) => {
    const res = await fetch(`${this._apiBase}${url}`, params)

    if (!res.ok) {
      throw new Error(`Could no fetch ${url}, status ${res.status}`)
    }

    return res
  }

  getData = async (pageNumber, perPage) => {
    const {
      getResource,
      _apiVehiclesPageUrl,
      _apiDealersUrl,
      _transformData,
    } = this

    const params = {
      headers: {
        'Content-Type': 'application/json',
        'X-CS-Dealer-Id-Only': 1,
      },
    }

    const vehiclesRes = await getResource(
      _apiVehiclesPageUrl(pageNumber, perPage),
      params
    )
    const vehiclesBody = await vehiclesRes.json()

    const dealersRes = await getResource(_apiDealersUrl(vehiclesBody))
    const dealersBody = await dealersRes.json()

    const totalVehiclesCount = await vehiclesRes.headers.get('x-total-count')

    return {
      headers: {
        totalVehiclesCount: totalVehiclesCount,
      },
      list: _transformData(vehiclesBody, dealersBody, totalVehiclesCount),
    }
  }

  _transformData = (vehicles, dealers) => {
    const preparedData = vehicles.map(
      ({ id, vin, model, brand, grade, dealer, office_ids }) => {
        const { offices = [], title = '-' } =
          dealers.find((item) => item.id === dealer) || {}

        const { address = '-' } =
          offices.find((item) => item.id === office_ids[0]) || {}

        return {
          id,
          vin,
          brand,
          model,
          grade,
          dealerName: title,
          dealerAddress: address,
        }
      }
    )

    return preparedData
  }
}
