import styled from "styled-components";
import { Link } from "react-router-dom";

export const Header = styled.div`
  height: 80px;
  display: flex;
  background-color: transparent;
  box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.2),
    0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12);
  padding: 20px 40px;
`;

export const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Logo = styled.div`
  font-size: 30px;
  font-weight: 700;
  color: #000;
  text-transform: uppercase;
`;

export const HeaderNav = styled.div`
  display: flex;
`;

export const HeaderNavItemSpan = styled.div`
  height: 2px;
  background-color: #000;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  transition: 0.3s ease;
`;

export const HeaderNavItem = styled.div`
  font-size: 16px;
  font-weight: 300;
  padding: 8px;
  cursor: pointer;
  position: relative;
  margin-left: 25px;

  &:hover ${HeaderNavItemSpan} {
    width: 100%;
  }
`;

export const HeaderNavItemLink = styled.div`
  color: #000;
  text-decoration: none;
  font-size: 1.2em;
`;

export const NoStyleLink = styled(Link)`
  text-decoration: none;
`;
