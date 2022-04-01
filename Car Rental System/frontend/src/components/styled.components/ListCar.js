import styled from "styled-components";

export const H2 = styled.h2`
  font-size: 3rem;
  text-align: center;
  text-transform: capitalize;
  font-weight: 900;
  color: var(--primaryColor1);
  padding: 3rem;
`;

export const H3 = styled.h3`
  text-align: center;
  color: var(--primaryColor1);
  font-size: 1.5rem;
`;

export const Div = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  row-gap: 20px;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;

  @media screen and (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.75);
  overflow: hidden;

  .image {
  }

  .details {
    text-align: center;
    width: 100%;
    background: var(--primaryColor5);
  }
`;

export const P = styled.p`
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--primaryColor1);
  margin: 0.2rem;
  margin-left: 1rem;
  text-align: left;
`;

export const Img = styled.img`
  height: 200px;
  width: 300px;
`;
