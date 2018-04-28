import React, { Component } from 'react';

class Layout extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-light bg-light">
                    <span className="navbar-brand mb-0 h1">Food System</span>
                </nav>
                <div className="row">
                    <div className="container">
                         {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}


export default Layout;