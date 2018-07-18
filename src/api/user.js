import {post, get} from './base';
import {config} from '@common/config'
export function login (url, params) {
	return new Promise((resolve, reject) => {
    post(url, params, config).then(res => {
      if(0 === res.data.status) {
        typeof resolve === 'function' && resolve(res);
      } else if (10 === res.data.status) {
        _doLogin();
      } else {
        reject(res.data.msg);
      }
    }).catch(err => {
      reject(err.statusText);
    })
  })
}

export function logout () {
  const url = '/user/logout.do';
  return post(url);
}
function _doLogin () {
  window.location.href = '/login?redirect=' + encodeURIComponent(window.location.pathname);
}