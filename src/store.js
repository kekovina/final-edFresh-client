import { observable, action, computed } from 'mobx';
import comfort from './img/comfort.png'
import eco from './img/eco.png'
import mobility from './img/mobility.png'
import safety from './img/safety.png'
import technology from './img/technology.png'
import axios from 'axios';
import { serverURL } from './config.js'

class Store{
   @observable role = 'guest';
   @action changeRole = role => this.role = role

   @observable projects = []
   @observable compare = []

   @action addCompare = id => { 
      this.compare.push(id) 
      localStorage.setItem('compare', JSON.stringify(this.compare))
   }
   @action removeCompare = id => {
      this.compare.splice(this.compare.indexOf(id), 1)
      localStorage.setItem('compare', JSON.stringify(this.compare))
   }

   @action getManyProjects = (ids) => {
      return axios(`${serverURL}/api/projects`, {
         params: {
            'ids': ids
         }
      }).then((data) => {
         if(data.status == 200){
            if(data.data){
               return data.data
            } else {
               throw new Error('Empty payload')
            }
         }
      }).catch((err) => {
         console.log(err)
      })
   }

   @action getProjects = () => {
      return axios(`${serverURL}/api/projects`).then((data) => {
         if(data.status == 200){
            if(data.data){
               return data.data
            } else {
               throw new Error('Empty payload')
            }
         }
      }).catch((err) => {
         console.log(err)
      })
   }
   @action getProjectsByCategory = (id) => {
      return axios(`${serverURL}/api/projects`, {
         params: {
            'categories[]': id
         }
      }).then((data) => {
         if(data.status == 200){
            if(data.data){
               this.projects = data.data
               return data.data
            } else {
               throw new Error('Empty payload')
            }
         }
      }).catch((err) => {
         console.log(err)
      })
   }
   @action getUnconfirmed = () => {
      return axios(`${serverURL}/api/projects`, {
         params: {
            'statuses': [1]
         }
      }).then((data) => {
         if(data.status == 200){
            if(data.data){
               this.projects = data.data
               return data.data
            } else {
               throw new Error('Empty payload')
            }
         }
      }).catch((err) => {
         console.log(err)
      })
   }

   @action getCompleted = (params) => {
      return axios(`${serverURL}/api/projects`, {
         params: {
            'statuses': [7],
            'categories[]': params
         }
      }).then((data) => {
         if(data.status == 200){
            if(data.data){
               this.projects = data.data
               return data.data
            } else {
               throw new Error('Empty payload')
            }
         }
      }).catch((err) => {
         console.log(err)
      })
   }
   @action dropProjects = () => {
      this.projects = []
   }
   @action setProjects = (projects) => {
      this.projects = projects
   }

   projectsCategory = [{ title: '?????????????????? ?? ???????????????????? ?????????????????? ??????????????????', image: comfort, id: 1},
   { title: '???????????????????????? ?????????????????? ????????????????', image: safety, id: 2},
   { title: '???????????????? ???????????????????? ?? ????????????????????', image: technology, id: 3},
   { title: '???????????????? ?????????? ?? ????????????????', image: eco, id: 4},
   { title: '?????????? ???????? ??????????????????????', image: mobility, id: 5},
   { title: '???????????????????????? ????????????', image: mobility, id: 'admin', secure: 1}]

   @computed get isAuth (){
      return this.role !== 'guest';
   }

   @computed get isAdmin() {
      return this.role == "admin";
   }

   @computed get isCompany(){
      return this.role == "company";
   }

}

const store = new Store();

export default store;