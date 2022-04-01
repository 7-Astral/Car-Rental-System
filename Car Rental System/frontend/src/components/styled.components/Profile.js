import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;

  @media screen and (max-width: 992px) {
    top: 50%;
  }
`;

export const Wrapper = styled.div`
  width: 90vw;
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  column-gap: 1rem;
  /* background: var(--white); */
  margin-top: 3.5rem;
  /* box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.75); */

  @media screen and (max-width: 992px) {
    grid-template-columns: 1fr;
    row-gap: 1rem;
  }
`;

export const ImgSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: var(--white);
  box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.75);

  label {
    cursor: pointer;
  }
  input[type="file"] {
    display: none;
  }
`;

export const FormSection = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: var(--white);
  box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.75);

  .inputs {
    display: flex;
    flex-direction: column;
    margin-top: 1.2rem;
    width: 20rem;
  }

  .inputs input {
    padding: 5px;
    color: var(--primaryColor1);
  }

  @media screen and (max-width: 768px) {
    .inputs {
      width: 15rem;
    }
  }
`;

export const Image = styled.label`
  height: 200px;
  width: 200px;
  margin-top: 1rem;
  margin-bottom: 1rem;
  border-radius: 50%;
  border: 2px solid #999;
  box-shadow: var(--shadow-1);
  overflow: hidden;

  img {
    height: 100%;
    width: 100%;
  }
`;

export const H = styled.h2`
  text-transform: capitalize;
  color: var(--primaryColor1);
  margin-top: 1rem;
`;

export const Input = styled.input`
  outline: none;
  border: none;
  border-bottom: 2px solid var(--primaryColor1);
  background: rgba(59, 54, 54, 0.1);
  font-size: 1.5rem;
`;

export const Label = styled.label`
  text-align: left;
  font-weight: 600;
  color: var(--primaryColor1);
  text-transform: capitalize;
`;

export const Button = styled.button`
  height: 2rem;
  width: 5rem;
  outline: none;
  border: none;
  background: var(--primaryColor2);
  color: var(--white);
  font-weight: 600;
  border-radius: 5px;
  margin-top: 1rem;
  margin-bottom: 2rem;
  cursor: pointer;

  &:hover {
    color: var(--primaryColor2);
    background: var(--primaryColor6);
    border: 2px solid var(--primaryColor2);
  }
`;
