import {AtModal, AtModalAction, AtModalContent, AtModalHeader} from "taro-ui";
import {Button, View} from "@tarojs/components";
import "./Modal.css"


export default (props) => {
  const {modalTitle, isOpen, onCancelClick, onOkClick} = props
  return (<View>
      <AtModal isOpened={isOpen} >
        <AtModalHeader>{modalTitle}</AtModalHeader>
        {props.children?<AtModalContent>
          {props.children}
        </AtModalContent>:null}
        <AtModalAction>
          <Button onClick={onCancelClick}>取消</Button>
          <Button onClick={onOkClick}>确定</Button>
        </AtModalAction>
      </AtModal>
    </View>
  )
}
