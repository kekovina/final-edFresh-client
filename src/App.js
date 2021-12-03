import React from 'react';
import { Provider } from 'mobx-react'
import mainStore from './store'
import RoleSelector from './components/RoleSelector'
import Home from './pages/Home'
import ShowCase from './pages/ShowCase'
import Rates from './pages/Rates'
import { Switch, Route } from 'react-router'
import './scss/main.scss'
import Projects from './pages/Projects'
import Project from './pages/Project'
import Footer from './components/Footer';
import NavBar from './components/NavBar';


function App(){
    return <Provider store={mainStore}>
        <div>
            <RoleSelector/>
            <NavBar/>
        </div>
        <main>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/showcase" component={ShowCase}/>
                <Route exact path="/projects" component={Projects}/>
                <Route exact path="/projects/:category" component={Projects}/>
                <Route exact path="/project/:projectId" component={Project}/>
                <Route exact path="/company" component={Home}/>
                <Route exact path="/rates" component={Rates}/>
            </Switch>
        </main>
        <Footer/>
    </Provider>
}

export default App;