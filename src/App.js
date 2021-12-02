import React from 'react';
import { Provider } from 'mobx-react'
import mainStore from './store'
import RoleSelector from './components/RoleSelector'
import Home from './pages/Home'
import Rates from './pages/Rates'
import { Switch, Route } from 'react-router'

function App(){
    return <Provider store={mainStore}>
        <RoleSelector/>
        <main>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/startup" component={Home}/>
                <Route exact path="/category" component={Home}/>
                <Route exact path="/company" component={Home}/>
                <Route exact path="/rates" component={Rates}/>
            </Switch>
        </main>
    </Provider>
}

export default App;