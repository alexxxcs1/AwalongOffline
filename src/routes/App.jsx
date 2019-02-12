import React, { Component } from 'react';
import { HashRouter,Route,Switch} from 'react-router-dom';
// import style from  './App.scss';

import Home from 'routes/Home'
import Login from 'routes/Login'
import Register from 'routes/Register'

class App extends Component {
  render() {
    return (
      <div style={{height: '100%'}}>
        <HashRouter >
          <div style={{height: '100%'}}>
              <Switch>
                  
                  {/* 首页 */}
                  <Route path='/register' component={Register} />
                  <Route path='/login' component={Login} />
                  <Route path='/' component={Home} />
                  
                    
              </Switch>
          </div>
        </HashRouter>
      </div>
    );
  }
}

export default App;
