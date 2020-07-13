export default (baseUrl, getParams = []) => {
  const paramsCount = getParams.length

  const prepareGetParam = getParams.map(({ name, value }, i) => {
    const isLastParams = i === paramsCount - 1
    return `${name}=${value}${isLastParams ? '' : '&'}`
  })

  return paramsCount ? `${baseUrl}/?${prepareGetParam.join('')}` : baseUrl
}
