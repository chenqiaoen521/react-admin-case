import React from 'react';
import Unit from '@base/unit/unit';
import { Col } from 'antd';
import {observer, inject} from 'mobx-react';

const themeColor = 'unit-color';
const state = {disabled: true}
/*let data = [
     { 
      title: '审查逮捕',
      contractor: '李XXX',
      infos: [{name:'立案',date:'2018年7月3日'},
        {name:'审查',date:'2018年7月3日'},
        {name:'批捕',date:'2018年7月3日'},
        {name:'立案',date:'2018年7月3日'},
        {name:'审查',date:'2018年7月3日'},
        {name:'批捕',date:'2018年7月3日'}
        ],
      theme: 'unit-color1',
      treeData: [  
        [{"ID":"D411ADC4B16B46B7A08C778E8C31DF62","PARENTID":"-1","NODENAME":"诉讼问书卷"},{"ID":"4D7B443C0EA54617824F61B734793033","PARENTID":"D411ADC4B16B46B7A08C778E8C31DF62","NODENAME":"卷宗"},{"ID":"2C7ED20B051742BDBBE9ED0F1A75450A","PARENTID":"4D7B443C0EA54617824F61B734793033","NODENAME":"第 1 页"},{"ID":"4ECF22942AB343F28FCFD2D8075A9DAB","PARENTID":"4D7B443C0EA54617824F61B734793033","NODENAME":"第 2 页"},{"ID":"F69A6DCB47DA4BF99122BD4A1AD05B30","PARENTID":"4D7B443C0EA54617824F61B734793033","NODENAME":"第 3 页"},{"ID":"6521B3BD0EDA4F78AF9D805A85149DBE","PARENTID":"4D7B443C0EA54617824F61B734793033","NODENAME":"第 4 页"},{"ID":"23CF56FAC03145E5BFB2F0E1BE5A7F11","PARENTID":"4D7B443C0EA54617824F61B734793033","NODENAME":"第 5 页"},{"ID":"75C9EA168D92420E84F23724E723C2B2","PARENTID":"4D7B443C0EA54617824F61B734793033","NODENAME":"第 6 页"},{"ID":"3AA6B2C628F346708F6B09F7E7091D75","PARENTID":"4D7B443C0EA54617824F61B734793033","NODENAME":"第 7 页"},{"ID":"C2EEDFEB62854DFA8CBC2EDDA3F72F4C","PARENTID":"4D7B443C0EA54617824F61B734793033","NODENAME":"第 8 页"},{"ID":"61F847B86C71488A978F0EEDC0623434","PARENTID":"4D7B443C0EA54617824F61B734793033","NODENAME":"第 9 页"}],
        [{"ID":"D411ADC4B16B46B7A08C778E8C31DF61","PARENTID":"-1","NODENAME":"电子问书卷"},{"ID":"4D7B443C0EA54617824F61B734793034","PARENTID":"D411ADC4B16B46B7A08C778E8C31DF61","NODENAME":"卷宗"},{"ID":"C2EEDFdaddDFA8CBC2EDDA3F72F4C","PARENTID":"4D7B443C0EA54617824F61B734793034","NODENAME":"第 8 页"},{"ID":"61F847B86C71488A978F0EEDC06A2557","PARENTID":"4D7B443C0EA54617824F61B734793034","NODENAME":"第 9 页"}]
      ]
     }
    ]
*/
/* eslint-disable no-undef */
@inject('caseState') @observer
class Main extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
    this._setData = this._setData.bind(this)
    this.renderBody = this.renderBody.bind(this)
    this._transformTree = this._transformTree.bind(this)
  }
  componentDidMount() {
    window.setData = this._setData;
    // window.setData(data);
  }
  _setData (data) {
  data = JSON.parse(data)
  this._transfromData(data)
    this.setState({
      data
    })
  }
  _transfromData (data) {
    let len = data.length
    for (let i = 0; i < len ; i++) {
     if (i >= 3) break; 
      data[i].theme = themeColor + (i + 1)
      let trees = data[i].treeData;
      if (trees && trees.length) {
        let temptree = this._filter(trees);
        for (let j = 0; j < temptree.length; j++) {
          this._transformTree(temptree[j])
        }
        data[i].treeData = temptree
      }
    }
  }
  _transformTree (data) {
    if(data.children && data.children.length > 0) {
      data.state = state;
      for (let i = 0; i < data.children.length ; i++) {
        this._transformTree(data.children[i])
      }
    } else {
      return
    }
  }
  _findChild (treedata, id) {
    var data = [];
    for (let i = 0; i < treedata.length; i++) {
      if(treedata[i]['PARENTID'] == id) {
        let children = this._findChild(treedata, treedata[i]['ID']);
        let jsonobj = {
          "id": treedata[i]['ID'],
          "text": treedata[i]['NODENAME'],
          "data": treedata[i],
          "icon" : "jstree-file"
        }
        children.length > 0 ? jsonobj['children'] = children : jsonobj;
        data.push(jsonobj)
      }
    }
    return data;
  }
  _filter (treedata) {
    let data = [];
    for (let j = 0; j < treedata.length; j++) {
      let temptree = treedata[j]
      for (let i = 0; i < temptree.length; i++) {
        if(temptree[i]['PARENTID'] == -1) {
          let tempData = this._findChild(temptree, temptree[i]['ID']);
          data.push({
            "id": temptree[i]['ID'],
            "text": temptree[i]['NODENAME'],
            "data": treedata[i]['DOCTYPE'],
            "children": tempData
          })
        }
      }
    }
    return data;
  }
  render() {
    return (
      <div className="case-inner">
        {this.renderBody()}
      </div>
    )
  }
  renderBody () {
    const len = this.state.data.length
    let colspan = 1
    if (len === 1) {
      colspan = 24
    }
    if (len === 2) {
      colspan = 12
    }
    if (len === 3) {
      colspan = 8
    }
    return (
      <div className="case-inner">
        {
          this.state.data.map((item, i) => {
            return (<Col key={i} className="h100 mr15" span={colspan}><Unit {...item} key={i}></Unit></Col>)
          })
        }
      </div>
    )
  }
}

export default Main;