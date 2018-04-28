import React, { Component } from 'react';
import Logo from '../../../components/Logo/Logo';
import classes from './Order.css';
import axios from 'axios';
import Aux from '../../../hoc/Aux';
import Spinner from '../../../components/UI/Spinner/Spinner';
import BuildControls from '../../../components/Product/BuildControls/BuildControls';
// import Modal from '../../../components/UI/Modal/Modal';
import OrderSummary from '../../../components/Product/OrderSummary/OrderSummary';
import ModalExample from '../../../components/UI/Modal/ModalExample';

const ORDER_PRICES = {
    fanta: 15,
    somtam: 30,
    coke: 20,
    yenyen: 25
}

class Order extends Component {
    state = {
        orders: null,
        totalPrice: 0,
        purchasable: false,
        error: false,
        purchasing: false,

    }

    componentDidMount() {
        console.log(this.props);
        axios.get('https://jc-cafeteria-a60e0.firebaseio.com/orders.json')
            .then(res => {
                // console.log(res.data);
                this.setState({ orders: res.data })
            })
            .catch(error => {
                // console.log(error);
                this.setState( { error: true } );
            })
    }

    updatePurchaseState ( orders ) {
        const sum = Object.keys( orders )
            .map( igKey => {
                return orders[igKey]
            } )
            .reduce( ( sum, el) => {
                return sum + el;
            }, 0);
        this.setState( { purchasable: sum > 0 } )
    }

    addOrderHandler = ( type ) => {
        const oldCount = this.state.orders[type];
        const updateCount = oldCount  + 1;
        const updateOrders = {
            ...this.state.orders
        }
        updateOrders[type] = updateCount
        // console.log(updateOrders);
        
        const priceAddition = ORDER_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState( { totalPrice: newPrice, orders: updateOrders } );
        this.updatePurchaseState( updateOrders );
    }
    removeOrderHandler = ( type ) => {
        const oldCount = this.state.orders[type];
        if( oldCount <= 0) {
            return;
        }
        const updateCount = oldCount  + 1;
        const updateOrders = {
            ...this.state.orders
        }
        updateOrders[type] = updateCount
        const priceAddition = ORDER_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState( { totalPrice: newPrice, orders: updateOrders } );
        this.updatePurchaseState( updateOrders );
    }
    purchaseContinueHandler = () => {
        // alert('You continue!');
        
        const queryParams = [];
        for (let i in this.state.orders) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.orders[i]));
        }
        queryParams.push('price=' + this.state.totalPrice);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
    }

    render() {
        const disabledInfo = {
            ...this.state.orders
        };
        for( let key in disabledInfo ) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = null;
        let product = this.state.error ? <p>Product can't be loaded!</p> : <Spinner />;
        // console.log(this.state.orders)
        if ( this.state.orders ) {
            product = (
                <Aux>
                   <BuildControls
                        orderAdded={this.addOrderHandler}
                        orderRemoved={this.removeOrderHandler}
                        disabled={disabledInfo}
                        ordered={this.purchaseHandler}
                        purchasable={this.state.purchasable}
                        price={this.state.totalPrice} />
                </Aux>
            );
            orderSummary = <OrderSummary
                orders = {this.state.orders}
                price={this.state.totalPrice}
                 />;
        }
        return (
            <Aux >
                 {/* <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal> */}
                {product}
                <div className="text-center">
                <ModalExample 
                    orders = {this.state.orders}
                    buttonLabel="Order Now" 
                    purchasable={this.state.purchasable}
                    purchaseContinued={this.purchaseContinueHandler}>
                    {orderSummary}
                </ModalExample>
                </div>
            </Aux>
        );
    }
}

export default Order;