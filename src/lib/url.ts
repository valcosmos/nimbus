export function httpBuildQuery(params: Record<string, string>) {
  const strArray = []
  for (const key in params) {
    strArray.push(`${key}=${params[key]}`)
  }
  // strArray => ['id=1','x=2']
  return strArray.join('&')
  // id=1&x=2
  // {
  //  id:1,
  //  x:2
  // }
  // id=1&x=2
}
