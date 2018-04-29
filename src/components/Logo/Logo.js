import React from 'react';

import burgerLogo from '../../assets/images/burger-logo.png';
import Fanta from '../../assets/images/Fanta.jpg'
import classes from './Logo.css';

const logo = (props) => {
    console.log(props.name);
    
  return(
    <div className={classes.Logo} >
        <img src={props.name} alt="MyBurger" height={props.height} width={props.width} />
    </div>

  )
}

export default logo;