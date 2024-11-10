export function dataCompress(data, callbackfn = null) {
  // data = [{id:1,username:xxx},{id:2,username:1111},{username:555}]
  if (!(Array.isArray(data))) {
    return data
  }

  let header = []
  const body = []
  let i = 0
  for (let item of data) {
    if (!(item instanceof Object)) {
      return data
    }
    if (callbackfn instanceof Function) {
      item = callbackfn({
        ...item,
      })
    }
    const cKey = Object.keys(item) // [id,username]
    const cData = Object.values(item) // [1,xxx] [2,1111]

    // username              id|username
    if (i > 0 && cKey.join('|') !== header.join('|')) {
      return data
    }
    header = cKey
    body.push(cData)
    i++
  }

  return {
    header,
    body,
  }
  // header [id,username]
  // body
  // [1,xxxx]
  // [2,xxxx]
  // [3,xxxx]
  // [4,xxxx]
  // [5,xxxx]
}

export function dataUnCompress(data) {
  // {
  // 0   1
  // temp = {};
  // temp.username = 1
  // temp.nickname = xxxx
  // temp.phone = 66
  // header:[username,nickname,phone],
  // body:[
  //   [1,xx,66]
  //   [2,xx,777]
  //   .....
  // ]
  //
  //
  // }

  // data = [{id:1,username:xxx},{id:2,username:1111},{username:555}]
  const header = data.header
  const body = data.body
  const newArray = []

  for (const item of body) {
    const temp = {}
    for (const key in header) {
      temp[header[key]] = item[key]
    }
    newArray.push(temp)
  }
  return newArray
}
