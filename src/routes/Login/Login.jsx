import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import style from './Login.scss'
import hanger from 'assets/hanger.png'
import {api} from 'common/app'

import AnmiBackgroundBox from 'components/AnmiBackgroundBox'
  
export class Login extends Component {
constructor(props) {
  super(props);
  this.state = {
      uname:'',
      upassword:''
  };
     this.refreshProps = this.refreshProps.bind(this);
     this.HandleInput = this.HandleInput.bind(this);
     this.toLogin = this.toLogin.bind(this);
}
componentWillReceiveProps(nextprops) {
  this.refreshProps(nextprops);
}
componentDidMount() {
  this.refreshProps(this.props);
}
refreshProps(props) {
  
}
HandleInput(type,e){
   this.state[type] = e.target.value;
   this.setState(this.state);
}
toLogin(){
    if(this.state.uname&&this.state.upassword){
        api.Login(this.state.uname,this.state.upassword).then(res=>{
            if (res.code == 200) {
                window.localStorage.setItem('sessionid',res.data.sessionid);
                window.location.hash = '#/'
            }else{
                
            }
        },err=>{

        })
    }else{
        alert('请输入正确的用户名密码')
    }
}
render() {
  return (
    <div className={[style.LoginBox,'childcenter'].join(' ')}>
        <div className={style.LoginForm}>
            <div className={[style.LogoTitle,'childcenter childcolumn childcontentstart'].join(' ')}>
                <img src={hanger} className={style.Hanger} alt=""/>
            </div>
            <div className={[style.FormBody,'childcenter childcolumn'].join(' ')}>
                <div className={style.InputBox}>
                    <input type="text" placeholder='用户名' value={this.state.uname} onChange={this.HandleInput.bind(this,'uname')}/>
                </div>
                <div className={style.InputBox}>
                    <input type="password" placeholder='密码' value={this.state.upassword} onChange={this.HandleInput.bind(this,'upassword')}/>
                </div>
                <div className={[style.LoginButton,'childcenter'].join(' ')} onClick={this.toLogin}>
                    登录
                </div>
                <div className={style.goToRegister}>
                    <Link to='/register'>去注册</Link>
                </div>
            </div>
        </div>
        <AnmiBackgroundBox />
    </div>
   )
   }
}
export default Login