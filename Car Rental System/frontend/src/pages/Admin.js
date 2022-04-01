import React from "react";
import {
  Container,
  StyledH3,
  LinksContainer,
  StyledLink,
} from "../components/styled.components/Admin";

const operation = {
  add: false,
  edit: false,
  delete: false,
};

function Admin() {
  const removeUser = () => {
    localStorage.removeItem("admin");
  };

  return (
    <Container>
      <StyledH3>Admin Portal</StyledH3>
      <StyledH3>Hello Admin</StyledH3>
      <LinksContainer>
        <StyledLink to="/admin/addcar">Add Car</StyledLink>
        <StyledLink to="/admin/editcar">Edit Car</StyledLink>
        <StyledLink to="/admin/deletecar">Delete Car</StyledLink>
        <StyledLink to="/admin/list">List of Cars</StyledLink>
        <StyledLink to="/admin/listrent">List of Rents</StyledLink>
        <StyledLink to="/" onClick={removeUser}>
          Log out
        </StyledLink>
      </LinksContainer>
    </Container>
  );
}

export default Admin;
