import React, { Component } from 'react'
import {Route,Switch  } from 'react-router-dom';
import PropTypes from "prop-types";
import style from './Home.scss'
import AnmiBackgroundBox from 'components/AnmiBackgroundBox'
import Button from 'components/Button'
import IsLogin from 'components/IsLogin'
import EnterCode from 'components/EnterCode'
import CreateNewRoom from 'components/CreateNewRoom'

import forgotten from 'assets/forgotten.png'

import ServerList from './Views/ServerList'

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stageStatus:'index',
      EnterCodeInput:false,
      CreateNewRoomTable:false,
    }
    this.customRoute = this.customRoute.bind(this);
    this.LinkRoute = this.LinkRoute.bind(this);
    this.HandleEnterCode = this.HandleEnterCode.bind(this);
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
          <div className={[style.TitleBox,'childcenter childcolumn'].join(' ')}>
            <img src={forgotten} alt=""/>
            <div className={style.Title}>阿瓦隆-Offline</div>
            <div className={style.SmTitle}>本挨屁屁由拔刀啪提供</div>
          </div>,
          <div className={[style.ContentBody,'childcenter childcolumn'].join(' ')}>
            <Button value='房间列表' onClick={this.LinkRoute.bind(this,'severlist')}/>
            <Button value='KnockKnock' onClick={this.HandleEnterCode.bind(this,true)}/>
            <Button value='俺是地主' onClick={this.HandleNewRoomTable.bind(this,true)}/>
            <Button value='不玩儿了' onClick={()=>{alert('谁允许你不玩的！继续！')}}/>
          </div>
        ]
      case 'severlist':
        return <ServerList />
    }
  }
  render() {
    return (
      <div className={[style.Box,'childcenter childcolumn'].join(' ')}>
        {this.state.CreateNewRoomTable?<CreateNewRoom onClose={this.HandleNewRoomTable.bind(this,false)}/>:''}
        {this.state.EnterCodeInput? <EnterCode onClose={this.HandleEnterCode.bind(this,false)}/>:''}
        <IsLogin />
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
