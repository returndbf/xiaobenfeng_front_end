import Taro from "@tarojs/taro";

export function getDateFormat(): string {
  let d = new Date()
  let currDate = d.getDate().toString()
  let currMonth = (d.getMonth() + 1).toString()
  let currYear = d.getFullYear()
  if (currMonth.length < 2) {
    currMonth = '0' + currMonth
  }
  if (currDate.length < 2) {
    currDate = '0' + currDate
  }
  return (currYear + '-' + currMonth + '-' + currDate)
}


//封装网络请求，返回promise
export function httpRequest(url, data, method) {
  let header: { "content-type": string };
  if (method == "POST" || method == "PUT") {
    header = {
      'content-type': 'application/x-www-form-urlencoded'
    }
  }
  return new Promise((resolve, reject) => {
    Taro.request({
      url: `https://4ks1206463.zicp.fun/${url}`,
      data,
      method,
      header,
      success: res => {
        if(res.data.code ===1){
          resolve(res.data)
        }else{
          reject(res.data)
        }
      },
      fail: err => {
        reject(err)
      }
    })
  })
}




export interface  Result<T>{
  code: number,
  msg: string,
  data : T
}


export const getUser = (successCallBack,failureCallBack) =>{
  Taro.getStorage({
    key: 'user',
    success: (res) => {
      successCallBack(res.data)
    },
    fail: () => failureCallBack()
  })
}

