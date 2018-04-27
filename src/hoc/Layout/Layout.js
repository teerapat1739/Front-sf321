import React, { Component } from 'react';

class Layout extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-light bg-light">
                    <span className="navbar-brand mb-0 h1">Food System</span>
                </nav>
                {this.props.children}
            </div>
        );
    }
}


export default Layout;