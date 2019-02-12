import React, { Component } from 'react'
import style from './AnmiBackgroundBox.scss'
  
export class AnmiBackgroundBox extends Component {
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
    <div className={style.AnmiBackgroundBox}>
        <div className={style.AnmiListBox}>
        
        </div>
    </div>
   )
   }
}
export default AnmiBackgroundBox