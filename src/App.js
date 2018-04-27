import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Qrcode from './containers/Blog/Qrcode/Qrcode';
import Layout from './hoc/Layout/Layout';
class App extends Component {
  render() {
    return (
      <Layout>
        <BrowserRouter>
            <div className="App">
                  <Route path="/:userid" component={Qrcode} />
            </div>
        </BrowserRouter>
      </Layout>
    );
  }
}

export default App;
