
function getIconNameFromURL(url) {
  let startPos = url.indexOf('/icons/')
  if (startPos === -1) return ''

  startPos += '/icons/'.length
  let endPos = url.indexOf('?')
  if (endPos === -1 || endPos <= startPos) return ''

  return url.slice(startPos, endPos)
}
function getIconStyleFromURL(url) {
  let startPos = url.indexOf('style=')
  if (startPos === -1) return ''

  startPos += 'style='.length
  return url.slice(startPos, url.length)
}
function getIconInfoFromURL(url, iconIfno) {
  const iconName = getIconNameFromURL(url)
  if (!iconName) return false

  const iconStyle = getIconStyleFromURL(url)
  if (!iconStyle) return false

  iconIfno['iconName'] = iconName
  iconIfno['iconStyle'] = iconStyle
  return true
}

module.exports = {
  getIconInfoFromURL: getIconInfoFromURL
}
