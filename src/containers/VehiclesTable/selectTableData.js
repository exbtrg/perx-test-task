export const transformData = (vehicles, dealers) => {
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
