import React from "react";
import { observer } from "mobx-react";

import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import UserModel from "../models/UserModel";
import {
  Header,
  HeaderContainer,
  Logo,
  HeaderNav,
  HeaderNavItem,
  HeaderNavItemLink,
  HeaderNavItemSpan,
  NoStyleLink
} from "../styles/NavBar";

class NavBar extends React.Component {
  state = { loginVisible: false, signupVisible: false };

  showLoginModal = () => {
    this.setState({ loginVisible: true });
  };

  showSignupModal = () => {
    this.setState({ signupVisible: true });
  };

  closeLoginModal = () => {
    this.setState({ loginVisible: false });
  };

  closeSignupModal = () => {
    this.setState({ signupVisible: false });
  };

  render() {
    return (
      <Header>
        <HeaderContainer>
          <NoStyleLink to="/">
            <Logo>PicShare</Logo>
          </NoStyleLink>
          <HeaderNav>
            <HeaderNavItem>
              <NoStyleLink to="/">
                <HeaderNavItemLink>Home</HeaderNavItemLink>
                <HeaderNavItemSpan />
              </NoStyleLink>
            </HeaderNavItem>
            {UserModel.currentUser ? (
              <HeaderNavItem>
                <HeaderNavItemLink onClick={UserModel.logout}>
                  Logout
                </HeaderNavItemLink>
                <HeaderNavItemSpan />
              </HeaderNavItem>
            ) : (
              <React.Fragment>
                <HeaderNavItem>
                  <HeaderNavItemLink onClick={this.showLoginModal}>
                    Login
                  </HeaderNavItemLink>
                  <HeaderNavItemSpan />
                  <LoginForm
                    visible={this.state.loginVisible}
                    closeModal={this.closeLoginModal}
                  />
                </HeaderNavItem>
                <HeaderNavItem>
                  <HeaderNavItemLink onClick={this.showSignupModal}>
                    Signup
                  </HeaderNavItemLink>
                  <HeaderNavItemSpan />
                  <SignupForm
                    visible={this.state.signupVisible}
                    closeModal={this.closeSignupModal}
                  />
                </HeaderNavItem>
              </React.Fragment>
            )}
          </HeaderNav>
        </HeaderContainer>
      </Header>
    );
  }
}

export default observer(NavBar);
