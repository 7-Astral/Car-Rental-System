import styled from "styled-components";
import { Link } from "react-router-dom";
import svg from "../../images/blob-scene-haikei.png";

export const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: url(${svg});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;

export const StyledH3 = styled.h3`
  font-size: 3rem;
  color: var(--primaryColor1);
`;

export const LinksContainer = styled.div`
  display: flex;
  flex-direction: row;
  border-radius: 2px solid red;
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

export const StyledLink = styled(Link)`
  font-size: 1.5rem;
  text-decoration: none;
  text-align: center;
  font-weight: 800;
  padding: 10px;
  margin: 10px;
  background: var(--primaryColor2);
  border-radius: 10px;
  color: var(--white);
  transition: transform 0.3s;
  box-shadow: var(--shadow-1);

  &:hover {
    transform: translateY(-5px);
    background: var(--primaryColor1);
    box-shadow: var(--shadow-2);
  }

  &:active {
    transform: translateY(-5px);
  }
`;
