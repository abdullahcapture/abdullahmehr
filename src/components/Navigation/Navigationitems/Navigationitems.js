import React from "react";
import Navigationitem from "./Navigationitem/Navigationitem";
import Cart from "../../../assets/img/shopping-cart.svg";
import classes from "./Navigationitems.css";
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../../redux/user/user.selectors';
import { signOutStart } from '../../../redux/user/user.actions';

import {
  OptionLink
} from './header.styles';

const navigationItems = ({currentUser , signOutStart}) => {
  return (
    <ul className={classes.NavigationItems}>
      
      <Navigationitem link="/shop" >
        Shop
      </Navigationitem>
      <Navigationitem link="/about">About</Navigationitem>
      <Navigationitem link="/cart" cart="cart">
        <img src={Cart} alt="cart" className={classes.Cart}/>
      </Navigationitem>
      {currentUser ? (
        <OptionLink as='div' onClick={signOutStart}>
          SIGN OUT
        </OptionLink>
      ) : (
        <OptionLink to='/signin'>SIGN IN</OptionLink>
      )}
    </ul>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  signOutStart: () => dispatch(signOutStart())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(navigationItems);
