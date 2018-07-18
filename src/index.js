import React from 'react';
import ReactDOM from 'react-dom';
import App from '@cpts/App';
import { AppContainer } from 'react-hot-loader';
import {Provider} from 'mobx-react';
import caseState from '@store/case';


 //document.oncontextmenu=new Function("event.returnValue=false;");
 //document.onselectstart=new Function("event.returnValue=false;");

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Provider caseState={caseState}>
        <Component />
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  );
};
// 模块热替换的 API
if (module.hot) {
  module.hot.accept(App, () => {
    render(App)
  });
} 
render(App)

//registerServiceWorker();
