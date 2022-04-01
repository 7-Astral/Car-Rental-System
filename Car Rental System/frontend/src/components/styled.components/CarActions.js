import styled from "styled-components";
import svg from "../../images/stacked-peaks-haikei.png";

export const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  padding-top: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background: url(${svg});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  @media screen and (max-width: 768px) {
    height: auto;
    padding-top: 2rem;
    padding-bottom: 2rem;
  }
`;

export const Form = styled.form`
  border-top: 10px solid var(--primaryColor1);
  background: var(--white);
  padding: 50px;
  border-radius: 12px;
  box-shadow: var(--shadow-1);
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: auto;
  column-gap: 25px;
  justify-content: center;
  align-items: center;
  transition: var(--transition-1);

  &:hover {
    box-shadow: var(--shadow-2);
  }

  .message {
    grid-column: 1/-1;
    grid-row: 1/2;
  }

  .image-btn {
    grid-column: 1/-1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .no-column {
    grid-column: 1/-1;
  }

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 25px;
  }
`;

export const Button = styled.button`
  height: 30px;
  width: 100px;
  font-size: 15px;
  font-weight: 800;
  outline: none;
  border: none;
  border-radius: 5px;
  background: var(--primaryColor1);
  color: var(--white);
  cursor: pointer;

  &:hover {
    /* color: var(--primaryColor1); */
    background: var(--primaryColor2);
    /* border: 2px solid var(--primaryColor1); */
  }
`;

export const Img = styled.img`
  height: 150px;
  width: 200px;
  margin-bottom: 10px;
  box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.75);
`;
