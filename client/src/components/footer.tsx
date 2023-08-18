import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { ComunStyles } from "../styles/styleGlobal";
const Footer = () => {
  return (
    <Foote>
      <h2>LOGO</h2>
      <div>
        <div>
          <Links>Link 1</Links>
          <Links>Link 1</Links>
          <Links>Link 1</Links>
          <Links>Link 1</Links>
        </div>
        <span />
        <section>
          <label>Copyright</label>
          <div>
            <Oval></Oval>
            <Oval></Oval>
            <Oval></Oval>
            <Oval></Oval>
          </div>
        </section>
      </div>
    </Foote>
  );
};

export default Footer;
const Foote = styled.footer`
  width: 100%;
  height: 15rem;
  display: flex;
  flex-direction: row;
  ${ComunStyles}
  & > h2 {
    width: 0vw;
    height: 100%;
    color: #e4eaf1;
    background: #000;
  }
  & > div {
    width: 60%;
    height: 100%;
    display: flex;
    flex-direction: column;

    & > span {
      width: 100%;
      height: 0.1vh;
      background: #e4eaf1;
    }
    & > div {
      display: flex;
      align-items: center;
      justify-content: end;
      height: 50%;
      width: 100%;
      display: flex;
      flex-direction: row;
    }
    & > section {
      width: 100%;
      height: calc(50% - 0.2vh);
      display: flex;
      justify-content: space-between;
      flex-direction: row;
      color: #e4eaf1;
      & > div {
        display: flex;
        flex-direction: row;
        gap: 3rem;
        margin: 1rem 0.5rem;
      }
    }
  }
`;
const Links = styled(Link)`
  color: #e4eaf1;
  text-decoration: none;
  font-size: 1rem;
  line-height: 1.3rem;
  margin: auto 1.5rem;
`;
const Oval = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background: #e4eaf1;
`;
