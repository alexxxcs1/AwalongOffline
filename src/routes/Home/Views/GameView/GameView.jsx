import React, { Component } from 'react'
import style from './GameView.scss'
import PropTypes from "prop-types";
import {api} from 'common/app'

import entity from 'assets/entity.gif'

import ReadyHall from './components/ReadyHall'
  
export class GameView extends Component {
constructor(props) {
  super(props);
  this.state = {
      roomkey:null,
      roominfo:null,
      ws_connection:null,
  };
  this.refreshProps = this.refreshProps.bind(this);
  this.EnterRoom = this.EnterRoom.bind(this);
}
componentWillReceiveProps(nextprops) {
  this.refreshProps(nextprops);
  this.state.roomkey = nextprops.roomkey;
    if (this.state.roomkey == null) {
        this.context.LinkRoute('index');
        alert('错误的房间暗号！');
    }
  this.setState(this.state);
}
componentDidMount() {
  this.refreshProps(this.props);
  this.EnterRoom();
}
refreshProps(props) {
    
}
EnterRoom(){
    this.state.roomkey = this.props.rk;
    let sessionid = window.localStorage.getItem('sessionid');
    let roomkey = this.state.roomkey;
    let connection = new WebSocket('ws://hellworld.packy.club:8089/awalong');
    this.state.ws_connection = connection;
    this.setState(this.state);
    let self = this;
    //open connection
    connection.onopen = function () {
      self.state.WebSocketStatus = true;
      self.setState(self.state);
      var strf = {
          type:'enterroom',
          props:{
            sessionid,
            roomkey
          }
      };//字符串
      connection.send(JSON.stringify(strf)); 
    };
    connection.onclose = function () {
    //   window.location.reload();
      alert('网络连接已断开，请刷新重试');
    }
    //onerror
    connection.onerror = function (error) {
      console.log('WebSocket Error ' + error);
      alert('网络连接失败，请刷新重试');
    };
    
    //to receive the message from server
    connection.onmessage = function (e) {
      console.log('Server: ' + e.data);
      let data = JSON.parse(e.data);
      switch (data.type) {
          case 'link':
              if (data.props.msg) {
                  alert(data.props.msg)
              }
              self.context.LinkRoute(data.props.to);
              break;
          case 'updateroominfo':
              self.state.roominfo = data.props.roominfo;
              self.state.roomkey = data.props.roomkey;
              self.setState(self.state);
              if (data.props.roomkey) {
                api.EnterRoom(data.props.roomkey).then(res=>{
                    if (res.code != 200) {
                        alert('更新房间信息失败！');
                        self.context.LinkRoute('index');
                    }
                },err=>{
                    alert('更新房间信息失败！')
                    // self.context.LinkRoute('index'); //编辑样式  暂时关闭退出房间
                })
              }
              break;
          default:
              break;
      }
    };
}
customRoute(){
    if (!this.state.roominfo){
        return;
    };
    switch (this.state.roominfo.gamestatus) {
        case 'ready':
            return <ReadyHall roominfo={this.state.roominfo}/>
        
    }
}
render() {
  return (
    <div className={[style.GameView,'childcenter childcolumn'].join(' ')}>
        {this.state.roomkey==null?<div className={[style.WaitForEnter,'childcenter childcolumn'].join(' ')}>
            <img src={entity} className={style.entity} alt=""/>
            <div className={style.LoadingTips}>
                进入房间中...
            </div>
        </div>:this.customRoute()}
    </div>
   )
   }
}
GameView.contextTypes = {
    LinkRoute: PropTypes.func
};
export default GameView