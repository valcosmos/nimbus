export default class FetchRequest {
  constructor() { }

  config = {
    baseUrl: '',
    isJson: false,
    headers: {},
  }

  interceptor = {
    request(init: RequestInit): any {
      return init
    },
    response: {
      convert(res: Response): any {
        return res
      },
      next(res: { code: number, message: string }): any {
        return res
      },
    },

  }

  getRealUrl(url: string) {
    if (url.startsWith('/')) {
      url = url.slice(1)
    }
    this.config.baseUrl = this.config.baseUrl ?? ''
    if (this.config.baseUrl.endsWith('/')) {
      this.config.baseUrl = this.config.baseUrl.slice(0, -1)
    }
    return `${this.config.baseUrl}/${url}`
  }

  post(url: string, params: Record<string, string>, headers = {}) {
    url = this.getRealUrl(url)
    let data = {}
    if (this.config.isJson === true && !(params instanceof FormData)) {
      data = params
    }
    headers = {
      ...(this.config.headers ?? {}),
      ...headers,
    }

    return this.request(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    })
  }

  request(url: string, init: RequestInit): Promise<any> {
    return new Promise((resolve) => {
      init = this.interceptor.request(init)
      if (init instanceof Promise) {
        init.then((res) => {
          fetch(url, res).then(res => this.interceptor.response.convert(res)).then((res) => {
            this.interceptor.response.next(res)
            resolve(res)
          })
        })
      }
      else {
        fetch(url, init).then(res => this.interceptor.response.convert(res)).then((res) => {
          this.interceptor.response.next(res)
          resolve(res)
        })
      }
    })
  }

  httpBuildQuery(params: Record<string, string>) {
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

  get(url: string, params = {}, headers = {}) {
    url = this.getRealUrl(url)
    let symbol = '?'
    if (url.endsWith('?') || url.endsWith('&')) {
      symbol = ''
    }
    else if (url.includes('?')) {
      symbol = '&'
    }
    url = url + symbol + this.httpBuildQuery(params)

    headers = {
      ...(this.config.headers ?? {}),
      ...headers,
    }
    return this.request(url, {
      method: 'GET',
      headers,
    })
  }
}
