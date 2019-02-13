import React, { Component } from 'react'
import style from './CreateNewRoom.scss'
import DarkBox from 'components/DarkBox'
import Button from 'components/Button'
import Select from 'components/Select'
  
export class CreateNewRoom extends Component {
constructor(props) {
  super(props);
  this.state = {
      roomcode:'',
      roomcontent:'',
      isPublic:false,
      userCount:5,
  };
     this.refreshProps = this.refreshProps.bind(this);
     this.HandlePublic = this.HandlePublic.bind(this);
     this.onStateChange = this.onStateChange.bind(this);
     this.onInputChange = this.onInputChange.bind(this);
     this.createRoom = this.createRoom.bind(this);
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
onInputChange(type,e){
    this.state[type] = e.target.value;
    this.setState(this.state);
}
onStateChange(type,value){
    // console.log(type,value);
    this.state[type] = value;
    this.setState(this.state);
}
createRoom(){
    if (!this.state.roomcode){
        alert('请输入房间暗号');
        return;
    };
    this.props.onSubmit(this.state.roomcode,this.state.roomcontent,this.state.userCount,this.state.isPublic);
}

render() {
  return (
    <DarkBox>
        <div className={[style.NewRoomBox,'childcenter childcolumn '].join(' ')}>
            <div className={style.HandleClose} onClick={this.props.onClose}></div>
            <div className={style.InputBox}>
                <input value={this.state.roomcode} type="text" placeholder='房间暗号(必填，把暗号告诉你的朋友)' onChange={this.onInputChange.bind(this, "roomcode")}/>
            </div>
            <div className={style.InputBox}>
                <input value={this.state.roomcontent} type="text" placeholder='房间介绍(选填，在房间列表显示)'onChange={this.onInputChange.bind(this, "roomcontent")}/>
            </div>
            <div className={style.InputBox}>
                <Select
                    placeholder={"请选择游戏人数"}
                    value={this.state.userCount + '人局'}
                    onSelect={this.onStateChange.bind(this, "userCount")}
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
            <Button value='创建房间' onClick={this.createRoom}/>
        </div>
    </DarkBox>
   )
   }
}
export default CreateNewRoom