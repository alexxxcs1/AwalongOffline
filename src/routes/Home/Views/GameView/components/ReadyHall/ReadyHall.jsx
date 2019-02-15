import React, { Component } from 'react';
import PropTypes from "prop-types";
import style from './ReadyHall.scss';
import isaac from 'assets/isaac.png';


import Button from 'components/Button'
    
export class ReadyHall extends Component {
constructor(props) {
   super(props);
   this.state = {
       roominfo:null,
       roomkey:null,
   };
   this.refreshProps = this.refreshProps.bind(this);
   this.createPlayerSite = this.createPlayerSite.bind(this);
   this.ReadyForGame = this.ReadyForGame.bind(this);
}
componentWillReceiveProps(nextprops) {
   this.refreshProps(nextprops);
}
componentDidMount() {
   this.refreshProps(this.props);
}
refreshProps(props) {
    this.state.roominfo = props.roominfo?props.roominfo:this.state.roominfo;
    this.state.roomkey = props.roomkey?props.roomkey:this.state.roomkey;
    this.setState(this.state);
}
createPlayerSite(){
    if (this.state.roominfo == null) return;
    console.log(this.state.roominfo);
    let result = [];
    for (let z = 0; z < this.state.roominfo.maxplayer; z++) {
        if (this.state.roominfo.player[z]) {
            result.push(
            <div className={[style.SiteBox,'childcenter childcolumn'].join(' ')}>
                {this.state.roominfo.player[z].ready?<div className={[style.IconReady,'childcenter childcolumn'].join(' ')}></div>:''}
                <img src={isaac} className={style.SiteIcon} alt=""/>
                <div className={[style.SiteID,'childcenter'].join(' ')}>{z+1}号玩家</div>
            </div>)
        }else{
            result.push(
                <div className={[style.SiteBox,'childcenter childcolumn'].join(' ')}>
                    <div className={style.SiteIcon} alt=""/>
                    <div className={[style.SiteID,'childcenter'].join(' ')}>{z+1}号玩家</div>
                </div>
            )
        }
    }
    return result;
}
ReadyForGame(){
    if (!this.state.roomkey||!this.state.roominfo) {
        alert('错误的房间号！');
        return;
    }
    let sessionid = window.localStorage.getItem('sessionid');
    let roomkey = this.state.roomkey;

    var strf = {
        type:'playerready',
        props:{
          sessionid,
          roomkey
        }
    };//字符串
    this.context.ws.send(JSON.stringify(strf)); 
}
render() {
   return (
   <div className={[style.ReadyHall,'childcenter childcolumn'].join(' ')}>
       <div className={[style.RoomName,'childcenter'].join(' ')}>
        {this.state.roominfo?this.state.roominfo.roomname:''}
       </div>
       <div className={[style.Hall,'childcenter'].join(' ')}>
        <div className={[style.PlayerSiteBox,'childcenter'].join(' ')}>
            <div className={[style.PlayerSite,'childcenter'].join(' ')}>
                {this.createPlayerSite()}
            </div>
        </div>
        <div className={[style.GameStatusBox,'childcenter childcolumn'].join(' ')}>
            <div className={style.PlayerIndexBox}><span>{this.state.roominfo?(this.state.roominfo.playerindex+1):''}</span><span>号</span></div>
            <Button value={this.state.roominfo?(this.state.roominfo.player[this.state.roominfo.playerindex].ready?'已准备':'准备'):''} onClick={this.ReadyForGame}/>
        </div>
       </div>
   </div>
   );
}
}
ReadyHall.contextTypes = {
    ws: PropTypes.object
};
export default ReadyHall;