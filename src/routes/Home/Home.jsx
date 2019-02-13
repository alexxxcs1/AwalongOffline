import React, { Component } from 'react'
import {Route,Switch  } from 'react-router-dom';
import PropTypes from "prop-types";
import {api} from 'common/app'
import style from './Home.scss'
import AnmiBackgroundBox from 'components/AnmiBackgroundBox'
import Button from 'components/Button'
import IsLogin from 'components/IsLogin'
import EnterCode from 'components/EnterCode'
import CreateNewRoom from 'components/CreateNewRoom'
import LoadingBox from 'components/LoadingBox'

import forgotten from 'assets/forgotten.png'

import ServerList from './Views/ServerList'
import GameView from './Views/GameView'

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onLoading:false,

      stageStatus:'index',
      EnterCodeInput:false,
      CreateNewRoomTable:false,

      RoomKey:null,
    }
    this.customRoute = this.customRoute.bind(this);
    this.LinkRoute = this.LinkRoute.bind(this);
    this.HandleEnterCode = this.HandleEnterCode.bind(this);
    this.onCreateRoom = this.onCreateRoom.bind(this);
    this.onEnterRoom = this.onEnterRoom.bind(this);
    this.isLoginOver = this.isLoginOver.bind(this);
  }
  getChildContext() {
    return {
      LinkRoute: this.LinkRoute
    };
  }
  componentDidMount()
  {
    
  }
  HandleEnterCode(boolean){
    this.state.EnterCodeInput = boolean;
    this.setState(this.state);
  }
  HandleNewRoomTable(boolean){
    this.state.CreateNewRoomTable = boolean;
    this.setState(this.state);
  }
  LinkRoute(route){
    this.state.stageStatus = route;
    this.setState(this.state);
  }
  customRoute(){
    switch (this.state.stageStatus) {
      default:
      case 'index':
        return [
          <div key='index' className={[style.TitleBox,'childcenter childcolumn'].join(' ')}>
            <img src={forgotten} alt=""/>
            <div className={style.Title}>阿瓦隆-Offline</div>
            <div className={style.SmTitle}>本挨屁屁由拔刀啪提供</div>
          </div>,
          <div key={'indexlist'} className={[style.ContentBody,'childcenter childcolumn'].join(' ')}>
            <Button value='房间列表' onClick={this.LinkRoute.bind(this,'severlist')}/>
            <Button value='KnockKnock' onClick={this.HandleEnterCode.bind(this,true)}/>
            <Button value='俺是地主' onClick={this.HandleNewRoomTable.bind(this,true)}/>
            <Button value='不玩儿了' onClick={()=>{alert('谁允许你不玩的！继续！')}}/>
          </div>
        ]
      case 'severlist':
        return <ServerList />
      case 'gameview':
        return <GameView rk={this.state.RoomKey}/>
    }
  }
  onCreateRoom(roomCode,roomContent,userCount,isPublic){
    this.state.onLoading = true;
    // this.state.stageStatus = 'gameview';
    api.createNewRoom(roomCode,roomContent,userCount,isPublic).then(res=>
      {
        if (res.code == 200) {
            this.state.RoomKey = res.data.keycode;
            this.state.CreateNewRoomTable = false;
            this.state.onLoading = false;
            this.setState(this.state);
            this.state.stageStatus = 'gameview';
            this.setState(this.state);
        }else{
            this.state.onLoading = false;
            this.setState(this.state);
            alert(res.data.msg)
        }
      },err=>{
        console.log(err);
      })
    this.setState(this.state);
  }
  onEnterRoom(roomcode){
    if (roomcode) {
      this.state.RoomKey = roomcode;
      this.state.EnterCodeInput = false;
      this.setState(this.state);
      this.state.stageStatus = 'gameview';
      this.setState(this.state);
    }else{
      alert('错误的房间暗号！')
    }
    
  }
  isLoginOver(){
    console.log();
    let userinfo = JSON.parse(window.localStorage.getItem('userinfo'));
    if (userinfo) {
      if (userinfo.room!=null) {
        this.state.RoomKey = userinfo.room;
        this.setState(this.state);
        this.state.stageStatus = 'gameview';
        this.setState(this.state);
      }
    }
  }
  render() {
    return (
      <div className={[style.Box,'childcenter childcolumn'].join(' ')}>
        {this.state.onLoading?<div className={[style.LoadinView,'childcenter'].join(' ')}>
            <div className={[style.LoadingBox,'childcenter'].join(' ')}>
                <LoadingBox />
            </div>
        </div>:''}
        {this.state.CreateNewRoomTable?<CreateNewRoom onClose={this.HandleNewRoomTable.bind(this,false)} onSubmit={this.onCreateRoom}/>:''}
        {this.state.EnterCodeInput? <EnterCode onClose={this.HandleEnterCode.bind(this,false)} onSubmit={this.onEnterRoom}/>:''}
        <IsLogin onCheckOver={this.isLoginOver}/>
        {this.customRoute()}
        <AnmiBackgroundBox />
      </div>
    )
  }
}
Home.childContextTypes = {
  LinkRoute: PropTypes.func
};
export default Home
