import React, { Component } from 'react'
import PropTypes from "prop-types";
import style from './ServerList.scss'
import Button from 'components/Button'

let mockdata=[
    {
        roomname:'超级无敌妈腿房',
        player:6,
        maxplayer:10,
        id:1,
    },
    {
        roomname:'无敌风火轮！',
        player:7,
        maxplayer:8,
        id:2,
    },
    {
        roomname:'暴雨初歇阿瓦隆局',
        player:2,
        maxplayer:10,
        id:3,
    }
];
export class ServerList extends Component {
constructor(props) {
  super(props);
  this.state = {
      listdata:[],
  };
     this.refreshProps = this.refreshProps.bind(this);
     this.ReturnBack = this.ReturnBack.bind(this);
     this.getServerList = this.getServerList.bind(this);
     this.createList = this.createList.bind(this);
}
componentWillReceiveProps(nextprops) {
  this.refreshProps(nextprops);
}
componentDidMount() {
  this.refreshProps(this.props);
  this.getServerList();
}
refreshProps(props) {
  
}
ReturnBack(){
    this.context.LinkRoute('index');
}
getServerList(){
    this.state.listdata = mockdata;
    this.setState(this.state);
}
createList(){
    if (this.state.listdata.length == 0 ) return;
    let result = [];
    for (let z = 0; z < this.state.listdata.length; z++) {
        
        result.push(
            <div key={'servercard'+this.state.listdata[z].id} className={[style.ListCard,'childcenter childcolumn childcontentstart'].join(' ')}>
                <div className={[style.RoomName,'childcenter'].join(' ')}>
                    {this.state.listdata[z].roomname}
                </div>
                <div className={[style.RoomInfo,'childcenter'].join(' ')}>
                    {this.state.listdata[z].player}/{this.state.listdata[z].maxplayer}
                </div>
            </div>
        );
    }
    return result;
}
render() {
  return (
    <div className={[style.ServerListBox,'childcenter childcolumn childcontentstart'].join(' ')}>
        <div className={[style.HandleRow,'childcenter childcontentstart'].join(' ')}>
            <div className={[style.ReturnButton,'childcenter'].join(' ')} onClick={this.ReturnBack}>
                返回
            </div>
        </div>
        <div className={style.ListBody}>
            {this.createList()}
        </div>
    </div>
   )
   }
}
ServerList.contextTypes = {
    LinkRoute: PropTypes.func
};
export default ServerList