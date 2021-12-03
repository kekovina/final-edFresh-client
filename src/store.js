import { observable, action, computed } from 'mobx';

class Store{
   @observable role = 'guest';
   @action changeRole = role => this.role = role

   @computed get isAuth (){
      return this.role !== 'guest';
   }
}

const store = new Store();

export default store;