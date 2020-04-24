import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import classes from "./App.css";
import Navbar from "./components/Navigation/Navbar/Navbar";
import SideDrawer from "./components/Navigation/SideDrawer/SideDrawer";
import BackDrop from "./components/Backdrop/Backdrop";
import Home from "./components/Home/Home";
import ProductList from "./components/ProductList/ProductList";
import Default from "./components/Default/Default";
import Details from "./components/Details/Details";
import About from "./components/About/About";
import Cart from "./components/Cart/Cart";
import Modal from "./components/Modal/Modal";
import SignInAndSignUpPage from '../src/pages/sign-in-and-sign-up.page';

import { selectCurrentUser } from './redux/user/user.selectors'
import { checkUserSession } from './redux/user/user.actions';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

class App extends Component {
  state = {
    sideDrawerOpen: false
  };
  drawerToggleClickHandler = () => {
    this.setState(prevState => {
      return { sideDrawerOpen: !prevState.sideDrawerOpen };
    });
  };

  backdropClickHandler = () => {
    this.setState({ sideDrawerOpen: false });
  };

  unsubscribeFromAuth = null;

  componentDidMount() {
    const { checkUserSession } = this.props;
    checkUserSession();
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div className={classes.App}>
        <div className={classes.Container}>
          <Navbar drawerClickHandler={this.drawerToggleClickHandler} />
          <SideDrawer
            show={this.state.sideDrawerOpen}
            click={this.backdropClickHandler}
          />
          {this.state.sideDrawerOpen ? (
            <BackDrop click={this.backdropClickHandler} />
          ) : null}
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/shop" component={ProductList} />
            <Route path="/details" component={Details} />
            <Route path="/About" component={About} />
            <Route path="/cart" component={Cart} />
            <Route
            exact
            path='/signin'
            render={() =>
              this.props.currentUser ? (
                <Redirect to='/' />
              ) : (
                <SignInAndSignUpPage />
              )
            }
            />
            <Route component={Default} />
          </Switch>
          <Modal />
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);