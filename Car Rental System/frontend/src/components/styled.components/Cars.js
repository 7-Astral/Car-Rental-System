import styled from "styled-components";

export const Wrapper = styled.div`
  display: grid;
  width: 100%;
  margin-top: 2rem;
  grid-template-columns: 1fr 1.5fr;
  justify-content: center;
  opacity: 1;

  .filters {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: start;
    margin-top: 2rem;
    margin-right: 2rem;
  }

  @media screen and (max-width: 992px) {
    grid-template-column: 1fr;
    align-items: center;

    .filters {
      display: none;
    }
  }
`;

export const Filter = styled.section`
  position: fixed;
  height: 90vh;
  width: 20vw;
  background: white;
  box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.75);

  h2 {
    text-transform: capitalize;
    color: var(--primaryColor1);
  }

  .search {
    height: 10%;
    border-bottom: 1px solid #999;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .search input[type="search"] {
    height: 1.5rem;
    width: 90%;
    font-size: 1rem;
    padding: 2px;
    outline: none;
    border: 2px solid var(--primaryColor2);
  }

  .rent {
    border-bottom: 1px solid #999;
    height: 40%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .rent p {
  }
  input[type="range"] {
    width: 80%;
    cursor: pointer;
  }

  .radios {
    border-bottom: 1px solid #999;
    height: 40%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }
  .radio-input {
    margin: 0.5rem;
    margin-left: 2rem;
  }
  .radio-input label {
    text-transform: capitalize;
    color: var(--primaryColor2);
    cursor: pointer;
  }
  input[type="radio"] {
    margin-right: 5px;
    color: var(--primaryColor1);
    cursor: pointer;
  }

  .btns {
    height: 10%;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  }
  .btns button {
    outline: none;
    height: 50%;
    width: 30%;
    font-size: 1rem;
    font-weight: 600;
    color: var(--white);
    background: var(--primaryColor1);
    border: 2px solid var(--primaryColor1);
    cursor: pointer;
  }
  .btns button:hover {
    color: var(--primaryColor1);
    background: var(--white);
  }
`;

export const CarList = styled.div`
  width: 50vw;

  @media screen and (max-width: 992px) {
    width: 100vw;
  }
`;

export const Car = styled.section`
  display: grid;
  grid-template-columns: 70% 30%;
  background: var(--white);
  box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.75);
  margin: 2rem;

  .info {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 2rem;
    text-transform: capitalize;
  }

  .microInfo {
    margin-top: 0.4rem;
    margin-bottom: 0.4rem;
  }
`;

export const H = styled.h2`
  margin-top: 0.4rem;
  color: var(--primaryColor1);
`;

export const Img = styled.img`
  height: 100%;
  width: 100%;
`;

export const P = styled.p`
  color: var(--primaryColor2);
`;

export const Button = styled.button`
  height: 2rem;
  width: 10rem;
  margin-bottom: 0.4rem;
  outline: none;
  border: none;
  border: 2px solid var(--primaryColor1);
  color: var(--white);
  background: var(--primaryColor1);
  text-transform: capitalize;
  font-weight: 600;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    color: var(--primaryColor1);
    background: var(--white);
  }

  @media screen and (max-width: 992px) {
    height: 1.5rem;
    width: 7rem;
  }
`;
