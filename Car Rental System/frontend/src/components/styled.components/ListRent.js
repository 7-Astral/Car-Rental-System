import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 1rem;
  margin-top: 2rem;
  margin-bottom: 2rem;

  .header {
    color: var(--primaryColor1);
  }

  .card {
    width: 80%;
    background: var(--white);
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    column-gap: 1rem;
    row-gap: 1rem;
    padding: 1rem;
    border-radius: 50px 10px 50px 10px;
    box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.75);
  }

  .car-details,
  .renter-details,
  .rent-details {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .rent-details {
    text-align: center;
  }

  .image {
    height: 100%;
    width: 100%;
  }

  .image img {
    height: 100%;
    width: 100%;
  }

  .icon {
    font-size: 25px;
    align-self: center;
    color: var(--primaryColor1);
  }

  p {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    color: var(--primaryColor2);
  }
  span {
    color: var(--primaryColor1);
  }

  @media screen and (max-width: 992px) {
    .card {
      width: 95%;
    }
  }

  @media screen and (max-width: 768px) {
    .header {
      font-size: 1.2rem;
    }
    .card {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: repeat() (2, 1fr);
      /* text-align: center; */
    }
  }
`;
