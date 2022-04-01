import styled from "styled-components";

export const Modal = styled.div`
  height: 200px;
  width: 500px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: var(--white);
  z-index: 5;
  border-radius: 5px;
  box-shadow: var(--shadow-1);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  .header {
    width: 90%;
    border-bottom: 1px solid var(--primaryColor4);
  }
  .header h4 {
    text-align: center;
    font-size: 2rem;
    color: var(--primaryColor1);
  }
  .content {
    align-content: center;
    width: 90%;
  }
  .content p {
    text-align: center;
    color: var(--primaryColor2);
  }
  .confirmation-btns {
    width: 90%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding-top: 5px;
    border-top: 1px solid var(--primaryColor4);
  }

  @media screen and (max-width: 992px) {
    width: 350px;
  }
`;

export const Button = styled.button`
  margin-top: 1rem;
  height: 2.5rem;
  width: 6rem;
  font-size: 1rem;
  border: 2px solid var(--primaryColor1);
  outline: none;
  border-radius: 0.5rem;
  font-weight: bold;
  background: var(--primaryColor1);
  color: var(--white);
  cursor: pointer;

  &:hover {
    color: var(--primaryColor1);
    background: var(--white);
  }
`;
