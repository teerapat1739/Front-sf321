import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './Qrcode.css';
import axios from '../../../axios-qrs';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
    state = {
        qrForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'number',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
        },
        formIsValid: false,
        loading: false,
        userid:null
    }
    componentWillMount(){
        this.setState({userid: this.props.match.params.userid})
    }

    qrHandler = ( event ) => {
        event.preventDefault();
        this.setState( { loading: true } );
        const formData = {};
        for (let formElementIdentifier in this.state.qrForm) {
            formData[formElementIdentifier] = this.state.qrForm[formElementIdentifier].value;
        }
        const qr = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            qrData: formData
        }
        console.log(this.props)
        const qrcode = {
                        username: this.state.userid,
                        credit: this.props.price
        }
        console.log("my >>> " + this.props.price);
        
        axios.post('http://localhost:3009/qrcode', qrcode)
                .then(response =>{
                    console.log(response);
                    this.setState( { loading: false } );
                    this.props.history.push( '/' );
                })
                .catch( error => {
                    this.setState( { loading: false } );
                } );

            
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedQrForm = {
            ...this.state.qrForm
        };
        const updatedFormElement = { 
            ...updatedQrForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedQrForm[inputIdentifier] = updatedFormElement;
        
        let formIsValid = true;
        for (let inputIdentifier in updatedQrForm) {
            formIsValid = updatedQrForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({qrForm: updatedQrForm, formIsValid: formIsValid});
    }

    render () {
        console.log(this.state)
        const formElementsArray = [];
        for (let key in this.state.qrForm) {
            formElementsArray.push({
                id: key,
                config: this.state.qrForm[key]
            });
        }
        let form = (
            <form onSubmit={this.qrHandler}>
                {formElementsArray.map(formElement => (
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                ))}
                <button className="btn btn-success" disabled={!this.state.formIsValid}>เติมเงิน</button>
            </form>
        );
        if ( this.state.loading ) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;