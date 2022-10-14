import Taro from "@tarojs/taro";

export const showToast = (title: string,icon:'success'|'error') => {
  return Taro.showToast({title,icon})
}

// export const showModal = (title: string,content: string,editable: boolean) => {
//   return Taro.showModal({title,content,editable})
// }
