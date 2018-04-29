import React, { Component } from 'react';

import Stock from '../../components/Stock/Stock'
import axios from 'axios';
import { Badge} from 'reactstrap';
class Stocks extends Component {
    state = {
        stocks: [],
        loading: true,
        totalPrice: 0,
        time: null
    }

    componentDidMount() {
        const temp = 0
        axios.get('https://jc-cafeteria-a60e0.firebaseio.com/stock.json')
            .then(res => {
                const fetchedStocks = [];
                for (let key in res.data) {
                    // this.setState({ totalPrice: this.state.totalPrice + res.data.price[key] })
                    fetchedStocks.push({
                        ...res.data[key],
                        time: ""+new Date((parseInt(res.data[key].time)*1000)),
                        id: key
                    });
                    console.log(res.data[key].time)
                    this.setState( {totalPrice: this.state.totalPrice +  parseInt(res.data[key].price)} )
                }
                this.setState( {loading: false, stocks: fetchedStocks} );
            })
            .catch(err => {
                this.setState({ loading: false });
            });
    }
    render() {
        // console.log(new Date(1524987662242*1000));
        console.log(this.state.stocks);
        
        return(
            <div className="container">< br/>
                
                <h1 class="text-center"><Badge color="primary">ยอดขายทั้งหมด {this.state.totalPrice} บาท</Badge></h1>< br/>
                {this.state.stocks.map(stock => (
                    <Stock
                        key={stock.id}
                        orders = {stock.orders}
                        price = {stock.price}
                        time = {stock.time}

                       />
                ))}
                xxx
            </div>  
        )
    }
}

export default Stocks;