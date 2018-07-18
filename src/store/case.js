import {observable, computed,action} from 'mobx';

class CaseState {
  @observable typeData = []
  @observable docs = []
 
  @action addCase (docs) {
    this.docs = docs
  }
  _isExist (id) {
    for (let i = 0; i < this.ids.length; i++) {
      if(this.ids[i] == id) return true
    }
    return false
  }
}
const caseState = new CaseState();

export default caseState