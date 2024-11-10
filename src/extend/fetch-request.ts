import process from 'node:process'
import FetchRequest from '@/lib/fetch'

const $request = new FetchRequest()

$request.config.baseUrl = 'http://localhost:3000/'
$request.config.isJson = true

$request.config.headers = {
  'content-type': 'application/json',
}

$request.interceptor.response.convert = (res) => {
  const contentType = res.headers.get('content-type')
  // contentType => application/json;
  if (contentType?.includes('application/json')) {
    return res.json()
  }
  return res.text()
}

$request.interceptor.response.next = (res) => {
  switch (res.code) {
    case 300:
      console.error(res.message)
      break
    case 400:
      // 未登录
      // 跳转登录
      break
  }
}

$request.interceptor.request = (init) => {
  return new Promise((resolve) => {
    if (window.isLogin) {
      if (window.loginData === null) {
        tools.ipcInvoke('readFileSync', resolve(`${process.cwd()}/loginData.json`)).then((fileData) => {
          window.loginData = JSON.parse(fileData)
          let headers = init.headers ?? {}
          headers = {
            ...headers,
            ...window.loginData,
          }
          init.headers = headers
          resolve(init)
        })
      }
      else {
        let headers = init.headers ?? {}
        headers = {
          ...headers,
          ...window.loginData,
        }
        init.headers = headers
        resolve(init)
      }
    }
    else {
      resolve(init)
    }
  })

  // const userId = localStorage.getItem('x-id')
  // const time = localStorage.getItem('x-time')
  // const token = localStorage.getItem('x-token')

  // let loginData = {}
  // if (userId !== null && time !== null && token !== null) {
  //   loginData = {
  //     'x-id': userId,
  //     'x-time': time,
  //     'x-token': token,
  //   }
  // }

  // let headers = init.headers ?? {}
  // headers = {
  //   ...headers,
  //   ...loginData,
  // }
  // init.headers = headers
  // return init
}

export default $request
