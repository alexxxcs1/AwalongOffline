import React, { Component } from 'react';
import style from './ReadyHall.scss';
import isaac from 'assets/isaac.png'
    
export class ReadyHall extends Component {
constructor(props) {
   super(props);
   this.state = {
       roominfo:null
   };
   this.refreshProps = this.refreshProps.bind(this);
   this.createPlayerSite = this.createPlayerSite.bind(this);
}
componentWillReceiveProps(nextprops) {
   this.refreshProps(nextprops);
}
componentDidMount() {
   this.refreshProps(this.props);
}
refreshProps(props) {
    this.state.roominfo = props.roominfo?props.roominfo:this.state.roominfo;
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
render() {
   return (
   <div className={style.ReadyHall}>
       <div className={[style.PlayerSiteBox,'childcenter'].join(' ')}>
            <div className={[style.PlayerSite,'childcenter'].join(' ')}>
                {/* <div className={[style.SiteBox,'childcenter childcolumn'].join(' ')}>
                    <img src={isaac} className={style.SiteIcon} alt=""/>
                    <div className={[style.SiteID,'childcenter'].join(' ')}>1号玩家</div>
                </div> */}
                {this.createPlayerSite()}
            </div>
       </div>
   </div>
   );
}
}
export default ReadyHall;