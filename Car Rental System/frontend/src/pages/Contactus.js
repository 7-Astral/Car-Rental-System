import React from "react";
import { Wrapper } from "../components/styled.components/Contactus";

function Contactus() {
  return (
    <Wrapper>
      <div className="card">
        <section className="header">Send us an Email</section>
        <section className="info">
          <p>If you are facing any issue/ or for feedback, write to us at</p>
          <a href="mailto:info@carRental.com">info@carRental.com</a>
        </section>
      </div>
      <div className="card">
        <section className="header">
          Pick-up your phone and call us 24*7
        </section>
        <section className="info">
          <a href="tel:90 1234 5678">90 1234 5678</a>
          <p>(standard STD/local charges apply)</p>
        </section>
      </div>
    </Wrapper>
  );
}

export default Contactus;
