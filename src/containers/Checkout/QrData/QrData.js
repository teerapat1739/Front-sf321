import React, { Component } from 'react';
import QrReader from 'react-qr-reader'
import { Route } from 'react-router-dom';
import { Button } from 'reactstrap';
import axios from 'axios';


class QrData extends Component {
    constructor(props){
        super(props)
        this.state = {
          delay: 300,
          result: 'No result',
          userid:"pao"
        }
        this.handleScan = this.handleScan.bind(this)
      }
      handleScan(data){
        if(data){
          this.setState({
            result: data,
          })
        }
      }
      handleError(err){
        console.error(err)
      }
      qrHandler = () => {
        axios({
          method: 'put',
          url: `http://localhost:3009/qrcode/${this.state.userid}`,
          data: {
            credit: this.props.price
          }
        }).then(res => {
          console.log(res);
        }).catch(err => {
          console.log(err);
        })
        axios({
          method: 'post',
          url: `https://jc-cafeteria-a60e0.firebaseio.com/stock.json`,
          data: {
              orders: this.props.orders,
              price: this.props.price
          }
        }).then(res => {
          console.log(res);
        }).catch(err => {
          console.log(err);
        })

      }
      render(){
          console.log("Qrdata page");
          
          console.log(this.props.price)
        return(
          <div>
            <QrReader
              delay={this.state.delay}
              onError={this.handleError}
              onScan={this.handleScan}
              style={{ width: '100%' }}
              />
              <div className="container">
                <div className="text-center">
                    Checkout
                    <div>
                            <Button color="primary" onClick={this.qrHandler}>CONTINUE</Button>
                    </div>
                </div>
            </div>
            <p>{this.state.result}</p>
          </div>
        )
      }
}

export default QrData;