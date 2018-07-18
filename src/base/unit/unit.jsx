import React from 'react';
import Tree from '@base/tree/tree';
import './unit.less';

class Unit extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }
  render() {
    return (
      <div className={'unit-outer ' + this.props.theme} >
        <h3 className="title">
          {this.props.title}
        </h3>
        <div className="contractor">
          <i className="icon"></i>承办人：{this.props.contractor}
        </div>
        <div className="list-wrapper">
          <ul className="item-list clearfix">
            {this.renderLi()}
          </ul>
        </div>
        <div className="tree-wrapper">
          <Tree treeData={this.props.treeData}></Tree>
        </div>
      </div>
    );
  }
  renderLi () {
    let list = this.props.infos,len = list.length,wid = 100/len;
    return list.map((item, i) => {
      let span  = 'line';
      if (i === 0) {
        span = 'line first' ;
      } 
      else if (i === (len - 1)) {
        span = 'line last';
      }
      return (
        <li key={i} className="item" style={{width:`${wid}%`}}>
            <p className="text">{item.name}</p>
            <span className={span}>
              <div className="point"></div>
            </span>
            <div className="date">{item.date}</div>
          </li>
        )
    })
  }
}

Unit.defaultProps = { 
  title: '审查逮捕',
  contractor: '李XXX',
  infos: [{name:'立案',date:'2018年7月3日'},
  {name:'审查',date:'2018年7月3日'},
  {name:'批捕',date:'2018年7月3日'},
  {name:'立案',date:'2018年7月3日'},
  {name:'审查',date:'2018年7月3日'},
  {name:'批捕',date:'2018年7月3日'}
  ]
};

export default Unit;