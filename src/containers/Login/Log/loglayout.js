import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText,NavLink,Card, CardTitle, CardText,Badge} from 'reactstrap';
import { NavLink as RRNavLink } from 'react-router-dom';
import "./log.css"



class Login extends Component {
    constructor(props) {
        super(props);

        
        
    }
   
    render() {
        return (
            
            <div class="Login">
            <Form>
                <h1 class="text-center"><Badge color="secondary">Authorization</Badge></h1>    
        <FormGroup>
            <br /><br />
          <Label for="username">Username</Label>
          <Input type="text" name="username" id="username" placeholder="please enter your username" />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input type="password" name="password" id="password" placeholder="please enter your password" />
        </FormGroup><br /><br /> 
        <center>
        <Button outline color="warning" size="sm"><NavLink to="/"  activeClassName="active" tag={RRNavLink}>Log in</NavLink></Button>
        </center>
        </Form>
        </div>
        );
    }
}


export default Login;