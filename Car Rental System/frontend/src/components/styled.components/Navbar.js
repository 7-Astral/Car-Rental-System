import styled from "styled-components";

const Nav = styled.nav`
  height: 3rem;
  width: 100vw;
  position: fixed;
  top: 0;
  overflow: hidden;
  background: var(--white);
  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;
  align-items: center;
  border-bottom: 3px solid var(--primaryColor2);
  z-index: 10;

  .logo {
    position: absolute;
    top: 2px;
    left: 10px;
    height: 2.5rem;
  }

  .linksContainer {
    list-style: none;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    height: 100%;
    width: 500px;
    justify-content: center;
    align-items: center;
  }

  .link {
    position: relative;
    font-size: 1.3rem;
    height: 3rem;
    width: 100%;
    border: none;
    outline: none;
    background: transparent;
    cursor: pointer;
    color: var(--primaryColor2);
    font-weight: 800;
  }

  .link:before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 0;
    background-color: var(--primaryColor5);
    visibility: hidden;
    transition: var(--transition-1);
    z-index: -5;
  }

  .link:hover {
    color: var(--primaryColor1);
  }

  .link:hover::before {
    visibility: visible;
    height: 100%;
  }

  .bars {
    display: none;
    position: absolute;
    top: 10px;
    left: 10px;
    font-size: 25px;
    background: transparent;
    border: none;
    color: var(--primaryColor2);
    z-index: 10;
    cursor: pointer;
  }

  .logout-btn {
    position: absolute;
    top: 10px;
    right: 15px;
    z-index: 10;
    font-size: 30px;
    border: none;
    border-radius: 12px;
    font-weight: 800;
    color: var(--primaryColor2);
    background: transparent;
    cursor: pointer;
  }
  @media screen and (max-width: 768px) {
    overflow: visible;
    .bars {
      display: block;
      transition: transform 0.3s;
    }

    .logo {
      left: 50%;
      transform: translateX(-50%);
      z-index: 10;
    }

    .bars:hover {
      transform: rotate(90deg);
    }

    .linksContainer {
      height: 0;
      padding-top: 3rem;
      grid-template-columns: 1fr;
      grid-template-rows: repeat(4, 1fr);
      width: 100%;
      overflow: hidden;
      background: var(--white);
      transition: height 0.5s;
      border-bottom: 3px solid var(--primaryColor2);
      z-index: 5;
    }
    .showContainer {
      height: 15rem;
    }

    .link:before {
      content: "";
      position: absolute;
      left: 0;
      width: 0;
      height: 100%;
      visibility: hidden;
      background-color: var(--primaryColor5);
      transition: var(--transition-1);
    }
    .link:hover::before {
      width: 100%;
      visibility: visible;
    }
  }
`;
export default Nav;
