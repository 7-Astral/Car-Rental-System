import styled from "styled-components";
import img from "../../images/rent.png";

const Wrapper = styled.div`
  margin-top: 3rem;

  .img-container {
    height: calc(100vh - 3rem);
    width: 100%;
    position: relative;
    background: linear-gradient(
        90deg,
        rgba(0, 0, 0, 0.3) 19%,
        rgba(0, 0, 0, 0.3) 19%
      ),
      url(${img});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    background-attachment: fixed;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .booking-date {
    /* width: 700px; */
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    row-gap: 0.5rem;
    justify-content: center;
    align-items: center;
    background: var(--white);
    border-radius: 5px;
    box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.75);
    animation: showup 1s 1;
  }
  @keyframes showup {
    0% {
      transform: scale(0);
      opacity: 0;
    }
    75% {
      transform: scale(1.1);
      opacity: 0.75;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }

  .booking-date h2 {
    font-size: 3rem;
    text-transform: capitalize;
    color: var(--primaryColor1);
    border-bottom: 1px solid var(--primaryColor1);
    margin: 1rem;
  }

  .dates {
    display: grid;
    grid-template-columns: 1fr 1fr 0.5fr 0.5fr;
    column-gap: 0.3rem;
    justify-items: self-start;
  }

  .label {
    color: var(--primaryColor1);
    font-weight: bold;
    font-size: 1rem;
  }

  .btn {
    padding: 0.5rem;
    color: var(--white);
    font-size: 1rem;
    font-weight: bold;
    text-transform: capitalize;
    border: 2px solid var(--primaryColor2);
    border-radius: 12px;
    background: var(--primaryColor2);
    cursor: pointer;
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
  .btn:hover {
    color: var(--primaryColor2);
    background: var(--white);
  }

  .cards-section {
    height: auto;
    max-width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 2rem;
  }
  .cards-section h2 {
    font-size: 2rem;
    margin-top: 5rem;
    margin-bottom: 2rem;
    text-transform: capitalize;
    color: var(--primaryColor1);
  }

  .cards {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    column-gap: 1rem;
    row-gap: 1.5rem;
    justify-content: space-around;
    align-items: center;
  }

  .card {
    height: 300px;
    width: 300px;
    border: 2px solid var(--primaryColor1);
    border-radius: 5px;
    padding: 5px;
    background: var(--white);
    display: grid;
    grid-template-rows: 40% 20% 40%;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.75);
    transition: all 0.5s ease;
  }
  .card:hover {
    transform: scale(1.1);
    box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.75);
  }

  .icon {
    height: 100%;
    width: 100%;
    font-size: 5rem;
    color: var(--primaryColor2);
  }

  .card h2 {
    font-size: 1.5rem;
    text-align: center;
  }

  .card p {
    width: 100%;
    font-size: 1rem;
    color: var(--primaryColor1);
  }

  .info-section {
    height: auto;
    width: 100%;
    margin-bottom: 2rem;
  }
  .info-section h2 {
    text-transform: capitalize;
    text-align: center;
    margin-top: 5rem;
    margin-bottom: 2rem;
    font-size: 2rem;
    color: var(--primaryColor1);
  }

  .table-section {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .table {
    border: 2px solid var(--primaryColor1);
    background: var(--white);
  }
  .table-section .table th {
    background: var(--primaryColor4);
    color: var(--white);
    text-transform: capitalize;
  }
  .table-section .table th,
  tr,
  td {
    text-align: center;
    border: 1px solid var(--primaryColor1);
    padding: 1rem;
  }

  .footer {
    height: 20vh;
    width: 100%;
    margin-top: 5rem;
    background: var(--primaryColor4);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .info {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-content: center;
    align-items: center;
  }

  .info .contact {
    width: 100%;
    text-align: center;
    color: var(--white);
  }

  .info .follow {
    width: 100%;
    text-align: center;
    color: var(--white);
  }

  ul {
    list-style: none;
  }

  li {
    margin: 0.2rem;
    cursor: pointer;
  }
  li:hover {
    color: var(--primaryColor1);
  }

  /* .follow {
    display: flex;
    flex-direction: column;
    align-items: center;
  } */

  .follow ul {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  .social {
    font-size: 2rem;
    margin-top: 0.5rem;
    margin-left: 0.5rem;
    margin-right: 0.5rem;
    color: var(--white);
  }
  .social:hover {
    color: var(--primaryColor1);
  }

  @media screen and (max-width: 768px) {
    .booking-date {
      width: 350px;
    }
    .dates {
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr 1fr;
    }
  }
`;

export default Wrapper;
