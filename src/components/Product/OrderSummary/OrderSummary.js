import React, { Component } from 'react';

import Aux from '../../../hoc/Aux';
import {  ModalHeader } from 'reactstrap'

class OrderSummary extends Component {
    // This could be a functional component, doesn't have to be a class
    componentWillUpdate() {
        console.log('[OrderSummary] WillUpdate');
        // console.log(this.props)
    }

    render() {
        const orderSummary = Object.keys(this.props.orders)
            .map(igKey => {
                return (
                    <li key={igKey}>
                        <span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {this.props.orders[igKey]}
                    </li>);
            });

        return (
            <Aux>
                <ModalHeader>Your Order</ModalHeader>
                <p>A delicious burger with the following ingredients:</p>
                <ul>
                    {orderSummary}
                </ul>
                <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
                <p>Continue to Checkout?</p>
            </Aux>
        );
    }
}

export default OrderSummary;