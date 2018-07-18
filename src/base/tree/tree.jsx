import React from 'react';
import $ from 'jquery';
import { Input, Button, message as MSG} from 'antd';
import './tree.less';
import {observer, inject} from 'mobx-react';
import context from '@common/context';

/* eslint-disable no-undef */
@inject('caseState') @observer
class Tree extends React.Component{
	constructor(props) {
    super(props);
    this.state = {
      searchResult : ''
    }
    this._search = this._search.bind(this);
    this.submit = this.submit.bind(this);
    this._renderTree = this._renderTree.bind(this);
    this._rightMenu = this._rightMenu.bind(this);
  }
  componentDidMount() {
    this.uukk = {}
    this.docs = new Array(2)
    this._renderTree(this.refs.jstree1, this.props.treeData[0], 0);
    this._renderTree(this.refs.jstree2, this.props.treeData[1], 1);
  }
  render() {
    return (
      <div style={{height:'100%'}}>
        <div className="jstree-input-wrapper">
        <Input name="searchResult" onPressEnter={this._search} onChange={this._search} className="input" placeholder="请输入关键词....." />
        <Button className="btn" onClick={this.submit}  icon="search">搜索</Button>
        </div>
      	<div className="jstree-wrapper">
          <div ref="jstree1"></div>
          <div ref="jstree2"></div>
        </div>
      </div>
    );
  }
  componentWillReceiveProps() {
   
  }
  _renderTree(dom, data, i) {
    let _this = this;
    $(dom).jstree({
      plugins: ["types", "search"],
      'core': {
        'data': data
      }
    }).on('select_node.jstree', (e, {node}) => {
      _this.uukk['type'] = node.data
      _this.uukk['id'] = node.id
      _this.docs[i] = node.data
      /*f (this.docs.length >=1 && this.state.docs[0].DOCTYPE == node.data.DOCTYPE) {
        $(this.refs.jstree).jstree('deselect_node', node.id);
        return
      } else if (this.docs.length >=2) {
        this.docs.shift()
        this.docs.push(node.data)
        return
      }*/
      //this.docs.push(node.data)
      //_this.props.caseState.addCase(node.id, node.data)
    }).on('dblclick.jstree', () => {
      if (_this.uukk['type'] === undefined) {
        return
      } else {
        window.tyywObj.loadDoc(JSON.stringify(_this.uukk['type']))
      }
      _this.uukk['type'] = undefined
    }).bind('ready.jstree',  () => {
      this._rightMenu()
    })
  }
  _rightMenu () {
    let _this = this;
    context.init({
        preventDoubleContext: false
    });
    context.attach('.jstree-anchor.jstree-clicked', [{
        header: '选项'
    }, {
        text: '对比',
        action: function(e) {
          e.preventDefault();
          console.log(_this.docs)
          if (_this.docs[0] === undefined || _this.docs[1] === undefined) {
            MSG.error('请确认有两个对比文件！');
          } else {
            window.tyywObj.contrastDoc(JSON.stringify(_this.docs))
          }
        }
    }]);
  }
  _search(e) {
    let key = e.target.name
    let v = e.target.value
   this.setState({
    [key]: v
   })
  }
  submit() {
    if (this.state.searchResult) {
      $(this.refs.jstree1).jstree(true).search(this.state.searchResult);
      $(this.refs.jstree2).jstree(true).search(this.state.searchResult);
    }
  }
}

export default Tree;