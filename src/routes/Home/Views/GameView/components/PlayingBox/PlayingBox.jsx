import React, { Component } from 'react'
import style from './PlayingBox.scss'
  
export class PlayingBox extends Component {
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
    <div className={[style.PlayingBox,'childcenter childcolumn'].join(' ')}>
        PlayingBox
    </div>
   )
   }
}
export default PlayingBox