import {useEffect, useState} from "react";
import Taro from "@tarojs/taro";
import {useDispatch, useSelector} from "react-redux";
import {View, Image, Input} from '@tarojs/components'
import './index.css'
import {getDateFormat, httpRequest, Result, getUser} from "../../utils/utils"
import Card from "../../components/MissionCard"
import Modal from "../../components/Modal/Modal"

import missionImg from "../../assets/mission.png"

import {showToast} from "../../utils/effect";

import {RootState} from "../../store/store";
import {changeReward, login} from "../../store";


interface mission {
  id: string,
  mission_name: string,
  today: string,
  reward: number,
  icon: string,
  is_complete: number,
  is_special: number
}

interface user {
  id: number,
  reward: number,
  secret: string,
  user: string,
}


const Index = () => {

  const [isCompleteOpen, setIsCompleteOpen] = useState<boolean>(false)
  const [isSecretOpen, setIsSecretOpen] = useState<boolean>(false)
  const [secret, setSecret] = useState<string>('')
  const [dayMissions, setDayMissions] = useState<mission[]>([])
  const [needCompleteMission, setNeedCompleteMission] = useState<mission>()
  // 提交reducer
  const dispatch = useDispatch()
  // 解构获得数据
  const {reward, user} = useSelector((state: RootState) => state.userReducer)

  useEffect(() => {
    getUser(
      (localUser) => {
        dispatch(login(localUser))
        getDayMissions(currentDay)
      },
      () => setIsSecretOpen(true))
  }, [])

  const currentDay = getDateFormat()

  const getDayMissions = (date) => {
    httpRequest('mission/getDayMissions', {date}, 'GET').then((res: Result<mission[]>) => {
      setDayMissions(res.data)
    })
  }

  // const insertMission = () => {
  //   httpRequest('insertDayMission',{mission:'t',today:getDateFormat(),reward:100},'PUT').then((res) => {
  //     console.log(res)
  //   })
  // }
  //
  const cardClick = (data) => {
    console.log(user)
    delete data.cardClick
    setIsCompleteOpen(true)
    setNeedCompleteMission(data)
  }

  const completeClick = () => {
    if (needCompleteMission?.is_complete === 1) {
      showToast('此任务已完成！', 'success')
      setIsCompleteOpen(false)
      return
    }
    httpRequest('mission/completeMission', {...needCompleteMission, is_complete: 1}, 'PUT').then(() => {
      showToast('渺渺真棒！', 'success')
      setIsCompleteOpen(false)
      getDayMissions(currentDay)
      dispatch(changeReward(reward + needCompleteMission?.reward!))
    }).catch(() => {
      showToast('请求失败', 'error')
    })
  }

  const secretConfirmClick = () => {
    if(!secret.trim()){
      setIsSecretOpen(false)
      return
    }
     httpRequest('user/queryUser', {secret}, 'GET').then((result: Result<user>) => {
      console.log(result)
      setIsSecretOpen(false)
      getDayMissions(currentDay)
      Taro.setStorageSync("user", result.data)
      dispatch(login(result.data))
    }).catch((result: Result<string>) => {
      showToast(result.data, 'error')
    })

  }

  return (
    <View className='container'>
      <Image src={missionImg} className='mission-img'></Image>
      <View className='card'>
        {dayMissions.map((item) => {
          return <Card {...item} cardClick={cardClick}></Card>
        })}
      </View>

      <Modal
        modalTitle='渺渺完成任务了吗'
        isOpen={isCompleteOpen}
        onCancelClick={() => setIsCompleteOpen(false)}
        onOkClick={completeClick}
      />

      <Modal
        modalTitle='输入暗号'
        isOpen={isSecretOpen}
        onCancelClick={() => Taro.exitMiniProgram()}
        onOkClick={secretConfirmClick}
      >
        <Input value={secret} onInput={e => setSecret(e.detail.value)}/>
      </Modal>
    </View>
  )
}
export default Index;
