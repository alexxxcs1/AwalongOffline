import React, { Component } from 'react'
import style from './EnterCode.scss'
import DarkBox from 'components/DarkBox'
import Button from 'components/Button'
  
export class EnterCode extends Component {
constructor(props) {
  super(props);
  this.state = {
    roomcode:'',
  };
     this.refreshProps = this.refreshProps.bind(this);
     this.submit = this.submit.bind(this);
     this.onInputChange = this.onInputChange.bind(this);
}
componentWillReceiveProps(nextprops) {
  this.refreshProps(nextprops);
}
componentDidMount() {
  this.refreshProps(this.props);
}
refreshProps(props) {
  
}
submit(){
  if (this.state.roomcode) {
    this.props.onSubmit(this.state.roomcode);
  }else{
    alert('错误的房间暗号！')
  }
  
}
onInputChange(type,e){
  this.state[type]= e.target.value;
  this.setState(this.state);
}
render() {
  return (
    <DarkBox>
        <div className={[style.EnterCodeBox,'childcenter childcolumn'].join(' ')}>
            <div className={style.HandleClose} onClick={this.props.onClose}></div>
            <div className={[style.Question,'childcenter'].join(' ')}>
                Who's there?
            </div>
            <div className={style.AnswerInput}>
                <input type="text" value={this.state.roomcode} onChange={this.onInputChange.bind(this,'roomcode')}/>
            </div>
            <Button value='确定' onClick={this.submit}/>
        </div>
    </DarkBox>
   )
   }
}
export default EnterCode