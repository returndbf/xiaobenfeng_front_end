import {Button, Image, View} from "@tarojs/components";
import {AtCard, AtFloatLayout, AtList, AtListItem, AtNoticebar} from "taro-ui";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
// 引入reducer
import {changeReward} from "../../store"

import {getDateFormat, httpRequest, Result} from "../../utils/utils"

import './index.css'
import storeImg from "../../assets/store.png";
// state类型
import {RootState} from "../../store/store";
import Modal from "../../components/Modal/Modal";
import {showToast} from "../../utils/effect";


interface goods {
  id: string,
  goods: string,
  reward: number,
  icon: string,
  description: string,
  del_flag: number
}
interface reward {
  reward: number
}

interface getGoods {
  id: string,
  goods_id: string,
  today: string,
  is_get: number,
}

interface getGoodsInfo extends goods{
  today : string
  is_get : number
}


const Index = () => {
  const [storeList, setStoreList] = useState<goods[]>([]) // 物品列表
  const [isOpenExchange, setIsOpenExchange] = useState<boolean>(false) // 兑换确认的弹窗
  const [needExchangeGoods, setNeedExchangeGoods] = useState<goods>() // 点击的物品卡片
  const [isGetGoodsListOpen, setIsGetGoodsListOpen] = useState<boolean>(false) // 展示获得的物品的弹窗
  const [getGoods, setGetGoods] = useState<getGoodsInfo[]>([]) //获得的物品 interface getGoods

  // 提交reducer
  const dispatch = useDispatch()
  // 解构获得数据
  const {reward,user} = useSelector((state: RootState) => state.userReducer)
  useEffect(() => {
    user ? initData() : showToast('没有登录','error')
  }, [])

  // 初始化数据
  const initData= () =>{
    httpRequest('store/getStoreList', null, "GET").then((response: Result<goods[]>) => {
      setStoreList(response.data)
      console.log(response.data,'storeList')
    })
    httpRequest('user/queryReward', null, "GET").then((response: Result<reward>) => {
      const resReward = response.data.reward
      // redux提交数据
      dispatch(changeReward(resReward))
    })
  }
  // 查询获得的物品
  const checkGetGoods = () => {
    setIsGetGoodsListOpen(true)
    httpRequest('getGoods/queryGetGoods', null, "GET").then((response: Result<getGoods[]>) => {
      // response.data.forEach((item) =>{
      //   storeList.forEach( i =>{
      //     if(item.goods_id == i.id){
      //       getGoodsList.push(i)
      //     }
      //   })
      const getGoodsList :getGoodsInfo[] = []
      response.data.forEach((item) => {
        getGoodsList.push({...storeList.find(i => {
          return i.id == item.goods_id
        }), today:item.today,is_get:item.is_get} as getGoodsInfo)
      })
      setGetGoods(getGoodsList)
      })

    }

  // 物品卡片点击事件
  const goodsClick = (goods: goods) => {
    setIsOpenExchange(true)
    setNeedExchangeGoods(goods)
    console.log(goods)
  }
  //确定兑换的事件
  const exchangeClick = () => {
    if (needExchangeGoods?.reward! > reward) {
      showToast('积分不够哦', 'error',)
      setIsOpenExchange(false)
    } else {
      const exchangeReward = needExchangeGoods?.reward
      const currentDay = getDateFormat()
      httpRequest('store/exchangeGoods', {today:currentDay,goods_id:needExchangeGoods?.id,reward: exchangeReward}, 'PUT').then((res: Result<string>) => {
        setIsOpenExchange(false)
        dispatch(changeReward(reward - exchangeReward!))
        showToast(res.data, 'success',)
      }).catch((err: Result<string>) => {
        showToast(err.data, 'error',)
        setIsOpenExchange(false)
      })
    }
  }


  return (
    <View>
      {user && <AtNoticebar >渺渺的积分： {reward}</AtNoticebar>}
      {user && <Button size='mini' plain onClick={checkGetGoods} className='queryGetGoods'>已获得</Button>}
      <View className='container'>
        <Image src={storeImg} className='store-img'></Image>
        <View className='store-list'>
          {storeList.map((item) => {
            return <AtCard
              extra={`积分:${item.reward}`}
              title={item.goods}
              thumb={item.icon}
              onClick={() => goodsClick(item)}
            >
              {item.description}
            </AtCard>
          })}
        </View>
      </View>
      <Modal
        modalTitle={"确定兑换" + needExchangeGoods?.goods! + "吗？"}
        isOpen={isOpenExchange}
        onCancelClick={() => setIsOpenExchange(false)}
        onOkClick={exchangeClick}
      >
      </Modal>
      <AtFloatLayout isOpened={isGetGoodsListOpen} title='已获得的物品' onClose={() => setIsGetGoodsListOpen(false)}>
        <AtList>
          { getGoods.map(goods=>{
              return <AtListItem title={goods.goods} extraText={goods.today} note={goods.is_get?"已领取":"未领取"}></AtListItem>
            })
          }
        </AtList>
      </AtFloatLayout>
    </View>
  )

}
export default Index
