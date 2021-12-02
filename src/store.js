import { observable, action, decorate } from 'mobx';
import cookies from 'react-cookie';

class Store{
   @observable role = 'guest';
   @action changeRole = role => this.role = role
}


export default new Store();