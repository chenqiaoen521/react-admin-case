import React from 'react';
import './theme.less';
class Layout extends React.Component{
  render() {
    return (
      <div className="case-inner">
        {this.props.children}
      </div>
    );
  }
}

export default Layout;