import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';



import {LinkContainer} from 'react-router-bootstrap'

const Header = () => {
  return (
    <header>
        <Navbar bg="light" expand="lg" collapseOnSelect>
          <Container>
            <LinkContainer to="/">
                <Navbar.Brand href="#home">BreakingNews!</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
              <Nav>
                <LinkContainer to="/create">
                    <Button variant="primary">Create News</Button>
                </LinkContainer>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
    </header>
  )
}

export default Header