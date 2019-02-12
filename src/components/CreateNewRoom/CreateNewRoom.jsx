import React, { Component } from 'react'
import style from './CreateNewRoom.scss'
import DarkBox from 'components/DarkBox'
import Button from 'components/Button'
import Select from 'components/Select'
  
export class CreateNewRoom extends Component {
constructor(props) {
  super(props);
  this.state = {
      isPublic:false,
  };
     this.refreshProps = this.refreshProps.bind(this);
     this.HandlePublic = this.HandlePublic.bind(this);
}
componentWillReceiveProps(nextprops) {
  this.refreshProps(nextprops);
}
componentDidMount() {
  this.refreshProps(this.props);
}
refreshProps(props) {
  
}
HandlePublic(boolean){
    if (boolean) {
        alert('未开放公开游戏房间功能，请期待以后的更新');
        return
    }
    this.state.isPublic = boolean;
    this.setState(this.state);
}
render() {
  return (
    <DarkBox>
        <div className={[style.NewRoomBox,'childcenter childcolumn '].join(' ')}>
            <div className={style.HandleClose} onClick={this.props.onClose}></div>
            <div className={style.InputBox}>
                <input type="text" placeholder='房间暗号(必填，把暗号告诉你的朋友)'/>
            </div>
            <div className={style.InputBox}>
                <input type="text" placeholder='房间介绍(选填，在房间列表显示)'/>
            </div>
            <div className={style.InputBox}>
                <Select
                    placeholder={"请选择游戏人数"}
                    // value={this.state.BankName}
                    // onSelect={this.onStateChange.bind(this, "BankName")}
                />
            </div>
            <div className={[style.isPublic,'childcenter'].join(' ')}>
                <div className={[style.CheckContent,'childcenter'].join(' ')} onClick={this.HandlePublic.bind(this,false)}>
                    <div className={[style.CheckBox,this.state.isPublic?'':style.ActCheck].join(' ')}></div>
                    <div className={style.CheckName}>私人</div>
                </div>
                <div className={[style.CheckContent,'childcenter'].join(' ')} onClick={this.HandlePublic.bind(this,true)}>
                    <div className={[style.CheckBox,this.state.isPublic?style.ActCheck:''].join(' ')}></div>
                    <div className={style.CheckName}>公开</div>
                </div>
            </div>
            <Button value='创建房间' onClick={()=>{}}/>
        </div>
    </DarkBox>
   )
   }
}
export default CreateNewRoom