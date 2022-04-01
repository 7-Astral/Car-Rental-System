import styled from "styled-components";

const Wrapper = styled.section`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .img {
    height: 60%;
    width: 80%;
  }

  .text {
    font-size: 1.5rem;
    color: var(--primaryColor1);
  }
`;

export default Wrapper;
