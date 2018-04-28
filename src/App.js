import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Qrcode from './containers/Blog/Qrcode/Qrcode';
import Order from './containers/Blog/Order/Order';
import Layout from './hoc/Layout/Layout';
class App extends Component {
  render() {
    return (
      <div>
          <Layout>
          <Switch>
                    <Route path="/order" exact component={Order} />
                    <Route path="/topup/:userid" component={Qrcode} />
          </Switch>
        </Layout>
      </div>
     
    );
  }
}

export default App;
