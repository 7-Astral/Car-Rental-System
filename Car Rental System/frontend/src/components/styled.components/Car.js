import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 4rem;
  margin-bottom: 2rem;
  row-gap: 2rem;
  /* height: calc(100vh - 3rem); */

  .container {
    height: auto;
    width: 90%;
    display: grid;
    grid-template-columns: 1.5fr 1fr;
    justify-content: center;
    align-items: center;
    background: var(--white);
    box-shadow: var(--shadow-1);
    padding: 1rem;
  }
  img {
    height: 200px;
    width: 300px;
  }
  section {
    height: 100%;
    padding: 1rem;
  }
  .header {
    font-size: 1.5rem;
    color: var(--primaryColor1);
  }

  .info {
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-content: center;
    align-items: center;
    column-gap: 1rem;
  }
  ul {
    list-style: none;
  }
  .image {
    text-align: center;
  }

  ul li {
    margin-top: 0.5rem;
  }
  ul li p,
  .inputs div label {
    color: var(--primaryColor2);
  }
  ul li span {
    color: var(--primaryColor1);
  }

  .booking {
    display: flex;
    flex-direction: column;
    border-left: 1px solid #999;
  }
  .date-time {
    width: 70%;
    height: 50px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  .date,
  .symbol {
    display: inline;
    font-size: 1.1rem;
    color: var(--primaryColor2);
  }
  .symbol {
    font-size: 1.5rem;
    margin: auto 1rem;
  }
  .calculation {
    color: #999;
    margin-top: 0.5rem;
  }
  .total {
    color: var(--primaryColor1);
    font-size: 1.1rem;
    margin-top: 0.5rem;
  }

  .rate-reviews {
    width: 90%;
    height: 3.5rem;
    overflow-y: hidden;
    box-shadow: var(--shadow-1);
    background: var(--white);
    transition: height 0.5s ease;
  }
  .show-rate-reviews {
    height: 25rem;
  }
  .add-review {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  .rate-reviews h4 {
    cursor: pointer;
    text-align: center;
  }
  .rating,
  .review {
    margin-top: 2rem;
    margin-bottom: 0.5rem;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
  }
  .rating select,
  .review textarea {
    color: var(--primaryColor1);
    font-size: 1rem;
    padding-left: 1rem;
    padding-right: 1rem;
  }
  .btn {
    align-self: center;
  }

  .reviews-container {
    width: 90%;
    background: var(--white);
    box-shadow: var(--shadow-1);
    padding: 1rem;

    h4 {
      margin-bottom: 1rem;
      text-align: center;
      border-bottom: 2px solid #999;
    }
    p {
      text-align: center;
      color: var(--primaryColor1);
      font-weight: 600;
    }
  }
  .review-cards {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    row-gap: 1rem;
    column-gap: 1rem;

    h4 {
      color: var(--primaryColor1);
      border-bottom: 1px solid #999;
    }
    p {
      color: var(--primaryColor2);
      margin-bottom: 0.3rem;
      font-weight: 100;
    }
  }
  .review-card {
    width: 320px;
    border-bottom: 2px solid #999;
    text-align: center;
  }

  .no-review {
    width: 100%;
    color: var(--primaryColor2);
    text-align: center;
  }

  @media screen and (max-width: 992px) {
    margin-top: 4rem;
    margin-bottom: 3rem;

    .container {
      grid-template-columns: 1fr;
      grid-template-rows: 1.5fr 1fr;
    }
    .details {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .booking {
      justify-content: center;
      align-items: center;
    }
    .date-time {
      justify-content: center;
    }
    .booking {
      border-left: none;
      border-top: 1px solid #999;
    }
  }
  @media screen and (max-width: 768px) {
    margin-top: 4rem;
    margin-bottom: 3rem;

    .info {
      grid-template-columns: 1fr;
      grid-template-rows: 2fr 1fr;
    }
    .show-rate-reviews {
      height: 25rem;
    }
  }
`;
