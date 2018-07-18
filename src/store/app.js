import {observable, computed,action} from 'mobx';

class AppState {
  @observable count = 0
  @observable name = 'HKOWK'
  @computed get msg() {
    return `${this.name} say count is ${this.count}`
  }
  @action add () {
    this.count ++;
  }
}
const appState = new AppState();
setInterval(() => {
  appState.add()
}, 300)
export default appState