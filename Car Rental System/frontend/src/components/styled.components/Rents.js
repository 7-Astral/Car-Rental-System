import styled from "styled-components";

export const Wrapper = styled.div`
  margin-top: 4rem;
  margin-bottom: 2rem;

  .container {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 2rem;
  }

  .container h2 {
    color: var(--primaryColor1);
  }

  .card {
    width: 80%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 75% 25%;
    column-gap: 1rem;
    background: var(--white);
    border-radius: 5px;
    padding: 5px;
    border-radius: 50px 10px 50px 10px;
    box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.75);
    overflow: hidden;
  }

  .car-details,
  .rent-details {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .car-details h2 {
    margin-bottom: 1rem;
    color: var(--primaryColor1);
  }
  .car-details p {
    margin-top: 0.5rem;
    color: var(--primaryColor2);
  }
  .car-details p span {
    color: var(--primaryColor1);
  }

  .rent-details {
    color: var(--primaryColor1);
    font-weight: bold;
    align-items: center;
  }

  .icon {
    color: var(--primaryColor1);
    font-size: 30px;
    height: 50px;
  }

  .image {
    height: 200px;
    width: 250px;
  }

  .btn-section {
    grid-column: 1/-1;
    grid-row: 2/3;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .btn {
    height: 2rem;
    width: 5rem;
    margin: 1rem auto;
    text-align: center;
    text-transform: capitalize;
    color: var(--white);
    font-size: 1.5rem;
    outline: none;
    background: var(--red);
    border: 2px solid var(--red);
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      color: var(--red);
      background: inherit;
    }
  }

  @media screen and (max-width: 992px) {
    .card {
      width: 95%;
    }
  }

  @media screen and (max-width: 768px) {
    .card {
      grid-template-columns: 1fr;
      grid-template-rows: auto;
      row-gap: 1rem;
      text-align: center;
      border-radius: 50px;
    }

    .image {
      width: 100%;
    }
    .btn-section {
      grid-row: 4/5;
    }
  }
`;
