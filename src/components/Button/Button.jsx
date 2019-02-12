import React, { Component } from 'react'
import style from './Button.scss'
  
export class Button extends Component {
constructor(props) {
  super(props);
  this.state = {};
     this.refreshProps = this.refreshProps.bind(this);
     this.onClick = this.onClick.bind(this);
}
componentWillReceiveProps(nextprops) {
  this.refreshProps(nextprops);
}
componentDidMount() {
  this.refreshProps(this.props);
}
refreshProps(props) {
  
}
onClick(){
    this.props.onClick();
}
render() {
  return (
    <div className={[style.Button,'childcenter childcolumn'].join(' ')} onClick={this.onClick}>{this.props.value}</div>
   )
   }
}
export default Button