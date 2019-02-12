import React, { Component } from "react";
import style from "./Select.scss";
import OptionJson from "./Option.json";

export class Select extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null,
      _tmpselected: null,
      limit: []
    };
    this.refreshProps = this.refreshProps.bind(this);
    this.Blur = this.Blur.bind(this);
    this.createSelectList = this.createSelectList.bind(this);
    this.HandleSelect = this.HandleSelect.bind(this);
    this.HandleSubmit = this.HandleSubmit.bind(this);
  }
  componentWillReceiveProps(nextprops) {
    this.refreshProps(nextprops);
  }
  componentDidMount() {
    this.refreshProps(this.props);
  }
  refreshProps(props) {
    if (this.state.selected == props.value) return;
    this.state.limit = props.limit? props.limit : this.state.limit;
    this.state.selected = props.value;
    this.state._tmpselected = this.state.selected;
    
    this.setState(this.state);
  }
  Blur() {
    this.refs.selectbox.blur();
  }
  HandleSelect(value) {
    this.state._tmpselected = value;
    this.setState(this.state);
  }
  createSelectList() {
    let resultArray = [];
    if (this.state.limit.length == 0) {
      for (let key in OptionJson) {
        resultArray.push(
          <div
            key={key}
            className={[
              style.SelectItem,
              this.state._tmpselected == key ? style.selected : ""
            ].join(" ")}
            onClick={this.HandleSelect.bind(this, key)}>
            {key}
          </div>
        );
      }
    } else if (this.state.limit.length == 1) {
      if (this.state.limit[0] != null) {
        for (let key in OptionJson[this.state.limit[0]]) {
          resultArray.push(
            <div
              key={key}
              className={[
                style.SelectItem,
                this.state._tmpselected == key ? style.selected : ""
              ].join(" ")}
              onClick={this.HandleSelect.bind(this, key)}>
              {key}
            </div>
          );
        }
      } else {
        resultArray.push(
          <div key={'cantselect'} className={style.SelectNone}>请先选择上一级</div>
        );
      }
    } else if (this.state.limit.length == 2) {
      if (this.state.limit[0] != null && this.state.limit[1] != null) {
        for (let key in OptionJson[this.state.limit[0]][this.state.limit[1]]) {
          resultArray.push(
            <div
              key={OptionJson[this.state.limit[0]][this.state.limit[1]][key]}
              className={[
                style.SelectItem,
                this.state._tmpselected ==
                OptionJson[this.state.limit[0]][this.state.limit[1]][key]
                  ? style.selected
                  : ""
              ].join(" ")}
              onClick={this.HandleSelect.bind(
                this,
                OptionJson[this.state.limit[0]][this.state.limit[1]][key]
              )}>
              {OptionJson[this.state.limit[0]][this.state.limit[1]][key]}
            </div>
          );
        }
      } else {
        resultArray.push(
          <div key={'cantselect'} className={style.SelectNone}>请先选择上一级</div>
        );
      }
    }
    return resultArray;
  }
  HandleSubmit() {
    this.state.selected = this.state._tmpselected;
    this.props.onSelect(this.state.selected);
    this.setState(this.state);
    this.Blur();
    
  }
  render() {
    return (
      <div className={style.SelectBox} tabIndex={"-1"} ref={"selectbox"}>
        <div className={style.Selected}>
          {this.state.selected
            ? this.state.selected
            : this.props.placeholder
              ?<span > {this.props.placeholder}</span>
              : <span >"请选择一个选项"</span>}
        </div>
        <div className={style.DropBox}>
          <div className={style.DropSelectBox}>
            <div className={style.DropHandleBox}>
              <div onClick={this.Blur}>取消</div>
              <div onClick={this.HandleSubmit}>确定</div>
            </div>
            <div className={style.DropContentBox}>
              {this.createSelectList()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Select;
