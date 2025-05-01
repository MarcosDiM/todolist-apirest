import { Container, Nav, Navbar } from "react-bootstrap";

export const Header = () => {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand>Administrado de Tareas</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Backlog</Nav.Link>
            <Nav.Link href="/sprints">Sprints</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};
