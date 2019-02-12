import React, { Component } from 'react'
import style from './EnterCode.scss'
import DarkBox from 'components/DarkBox'
import Button from 'components/Button'
  
export class EnterCode extends Component {
constructor(props) {
  super(props);
  this.state = {};
     this.refreshProps = this.refreshProps.bind(this);
}
componentWillReceiveProps(nextprops) {
  this.refreshProps(nextprops);
}
componentDidMount() {
  this.refreshProps(this.props);
}
refreshProps(props) {
  
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
                <input type="text"/>
            </div>
            <Button value='确定' onClick={()=>{}}/>
        </div>
    </DarkBox>
   )
   }
}
export default EnterCode