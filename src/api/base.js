import axios from 'axios';

export function get (...args) {
  return axios.get(...args);
}
export function post (...args) {
  return axios.post(...args);
}
