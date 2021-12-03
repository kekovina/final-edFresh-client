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

   projectsCategory = [{ title: 'Доступный и комфортный городской транспорт', image: comfort, id: 1},
   { title: 'Безопасность дорожного движения', image: safety, id: 2},
   { title: 'Цифровые технологии в транспорте', image: technology, id: 3},
   { title: 'Здоровые улицы и экология', image: eco, id: 4},
   { title: 'Новые виды мобильности', image: mobility, id: 5}]

   @computed get isAuth (){
      return this.role !== 'guest';
   }

}

const store = new Store();

export default store;