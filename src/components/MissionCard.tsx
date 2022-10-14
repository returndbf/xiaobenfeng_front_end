import {View, Image, Text} from "@tarojs/components";
import {CSSProperties} from "react";


const CardStyle: CSSProperties = {
  marginTop: "10px",
  height: '200rpx',
  boxShadow: '0px 0px 10px yellow',
  borderRadius: '20rpx',
  lineHeight: '180rpx'
}
const imgStyle: CSSProperties = {
  width: '200rpx',
  height: '200rpx',
  float: 'right',
  marginRight: '20rpx'
}
const textStyle: CSSProperties = {
  marginLeft: '30rpx',
  fontSize: '35rpx'
}
const rewardStyle: CSSProperties = {
  fontSize: '25rpx',
  color: '#6f6f6f'
}
export default (props) => {
  const {mission_name, icon, reward, is_complete,cardClick} = props
  return (
    <View style={{...CardStyle, backgroundColor: is_complete ? '#f8e9e9' : '#c0f1f7'}} onClick={()=>cardClick(props)}>
      <Text style={textStyle}>{mission_name}</Text>
      <Text style={rewardStyle}>({reward}积分)</Text>
      <Image src={icon} style={imgStyle}></Image>
    </View>
  )
}
