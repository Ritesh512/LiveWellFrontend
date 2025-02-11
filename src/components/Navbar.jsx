import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 5%;
  background: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  color: #4B9CE2;
  text-decoration: none;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: #333;
  &:hover {
    color: #4B9CE2;
  }
`;

const AuthButtons = styled.div`
  display: flex;
  gap: 1rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 20px;
  border: none;
  cursor: pointer;
  
  &.login {
    background: transparent;
    color: #333;
  }
  
  &.signup {
    background: #4B9CE2;
    color: white;
  }
`;

const Navbar = () => {
  return (
    <Nav>
      <Logo to="/">LiveWell</Logo>
      <NavLinks>
        <NavLink to="/property">Property</NavLink>
        <NavLink to="/pricing">Pricing</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </NavLinks>
      <AuthButtons>
        <Button className="login">Sign In</Button>
        <Button className="signup">Login</Button>
      </AuthButtons>
    </Nav>
  );
};

export default Navbar;