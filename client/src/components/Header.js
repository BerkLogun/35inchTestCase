import React, { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import {AiOutlineLogin} from 'react-icons/ai'
import {RiLogoutCircleLine} from 'react-icons/ri'

import { useNavigate } from 'react-router-dom';

import {getRefreshToken } from '../axios/index.js'

import { logOut } from '../actions/userActions.js'

import decode from 'jwt-decode'



import {LinkContainer} from 'react-router-bootstrap'

const Header = () => {
  const dispatch = useDispatch();
  const location = useLocation()
  const nav = useNavigate();
  const [user, setUser] = useState()
  const [refreshToken, setRefreshToken] = useState('')
  //const [admin, setAdmin] = useState()

  const exit = async (id) => {
    await dispatch(logOut(id))
    setUser(null)
    //setAdmin(null)
    nav('/')
  }

  const getToken = async (id) => {
    const {data} = await getRefreshToken(id)
    setRefreshToken(data.refreshToken)
  }

  //const admi2 = localStorage.getItem('user')

  useEffect(() => {
    if (localStorage.getItem('user') && !user) {
      setUser(JSON.parse(localStorage.getItem('user')))
    }
    const accessToken = user?.accessToken   // if accessToken exists, then decode it
    if (accessToken) {
      const decodedToken = decode(accessToken)
      if (decodedToken.exp * 1000 < new Date().getTime()) { // if token has expired, then log out
        exit(user.user.id)
      }
    }

    if (user) {
      getRefreshToken(user.user.id)
      console.log(refreshToken)
    }
  }, [location, user])

  /*
  useEffect(() => {
    if (localStorage.getItem('user') && !admin) {
      setAdmin(admi2.admin)
      console.log(admin)
    }
  }, [location,admin])
  */
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
                {
                  user ? (
                    <>
                    <LinkContainer to="/create">
                    <Button variant="primary">Create News</Button>
                    </LinkContainer>


                    <Nav.Link>
                      <Button variant="secondary"
                      onClick={() => exit(user.user.id)}
                      >
                      Logout
                      <RiLogoutCircleLine size="20"/>
                      </Button>

                    </Nav.Link>
                    
                    
                    </> 
                  ): (

                    <LinkContainer to="/auth">
                    <Button variant="secondary">
                      Login
                      <AiOutlineLogin size="20"/>
                      </Button>
                    </LinkContainer>


                  )
                    
                }
                

                
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
    </header>
  )
}

export default Header