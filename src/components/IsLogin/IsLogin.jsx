import React, { Component } from 'react'
import style from './IsLogin.scss'
import {api} from 'common/app'
  
export class IsLogin extends Component {
constructor(props) {
  super(props);
  this.state = {};
     this.refreshProps = this.refreshProps.bind(this);
     this.isLogin = this.isLogin.bind(this);
}
componentWillReceiveProps(nextprops) {
  this.refreshProps(nextprops);
}
componentDidMount() {
  this.refreshProps(this.props);
  this.isLogin();
}
refreshProps(props) {
  
}
isLogin(){
    api.isLogin().then(res=>{
        if (res.code != 200) {
            window.location.hash = '#/login'
        }else{
            window.localStorage.setItem('sessionid',res.data.sessionid);
        }
        
    },err=>{

    })
}
render() {
  return (
    <div style={{display:'none'}}>
    
    </div>
   )
   }
}
export default IsLogin