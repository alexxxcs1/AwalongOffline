import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import style from './Register.scss'
import trite from 'assets/trite.gif'
  
import AnmiBackgroundBox from 'components/AnmiBackgroundBox'

export class Register extends Component {
constructor(props) {
  super(props);
  this.state = {};
     this.refreshProps = this.refreshProps.bind(this);
     this.toRegister = this.toRegister.bind(this);
}
componentWillReceiveProps(nextprops) {
  this.refreshProps(nextprops);
}
componentDidMount() {
  this.refreshProps(this.props);
}
refreshProps(props) {
  
}
toRegister(){
    alert('尚未开放注册')
}
render() {
  return (
    <div className={[style.RegisterBox,'childcenter'].join(' ')}>
        <div className={style.RegisterForm}>
            <div className={[style.LogoTitle,'childcenter childcolumn'].join(' ')}>
                <img src={trite} className={style.Hanger} alt=""/>
            </div>
            <div className={[style.FormBody,'childcenter childcolumn'].join(' ')}>
                <div className={style.InputBox}>
                    <input type="text" placeholder='用户名'/>
                </div>
                <div className={style.InputBox}>
                    <input type="password" placeholder='密码'/>
                </div>
                <div className={[style.RegisterButton,'childcenter'].join(' ')} onClick={this.toRegister}>
                    注册
                </div>
                <div className={style.goToRegister}>
                    <Link to='/login'>去登录</Link>
                </div>
            </div>
        </div>
        <AnmiBackgroundBox />
    </div>
   )
   }
}
export default Register