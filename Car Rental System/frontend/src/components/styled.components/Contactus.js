import styled from "styled-components";

export const Wrapper = styled.div`
  height: 50vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: space-around;
  align-items: center;
  margin-top: 5rem;

  .card {
    height: 40%;
    width: 60%;
    background: var(--white);
    border: 2px solid #999;
    box-shadow: var(--shadow-1);
  }
  .header {
    height: 50%;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
    color: var(--primaryColor1);
    font-weight: 600;
    background: var(--primaryColor5);
    border-bottom: 2px solid var(--primaryColor1);
  }
  .info {
    height: 50%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .info a {
    text-decoration: none;
  }

  @media screen and (max-width: 768px) {
    .card {
      width: 90%;
    }
  }
`;
