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

//import {refreshAccessToken } from '../axios/index.js'

import { logOut, getAccessToken } from '../actions/userActions.js'

import decode from 'jwt-decode'



import {LinkContainer} from 'react-router-bootstrap'

const Header = () => {
  const dispatch = useDispatch();
  const location = useLocation()
  const nav = useNavigate();
  const [user, setUser] = useState()
  //const [refreshToken, setRefreshToken] = useState('')
  //const [admin, setAdmin] = useState()

  const exit = async (id) => {
    await dispatch(logOut(id))
    setUser(null)
    //setAdmin(null)
    nav('/')
  }

  const renewAccessToken = async (id) => {
    await dispatch(getAccessToken(id))
    setUser(JSON.parse(localStorage.getItem('user')))


  }


  useEffect(() => {  // this use effect called every time the page is refreshed or the user navigates to a new page and checks if the user is logged in
    if (localStorage.getItem('user') && !user) {
      setUser(JSON.parse(localStorage.getItem('user')))
    }

    const accessToken = user?.accessToken   // if accessToken exists, then decode it

    if (accessToken) {
      const decodedToken = decode(accessToken)
      if (decodedToken.exp * 1000 < new Date().getTime()) { // if token has expired, then log out
        
        console.log(decodedToken.exp)
        renewAccessToken(user.user.id)


      }
    }

  }, [location, user])

  
  return (
    <header>
        <Navbar bg="" expand="lg" collapseOnSelect>
          <Container>
            <LinkContainer to="/">
                <Navbar.Brand href="#home" style="color:white ">
                    <h5>
                    BreakingNews!
                    </h5></Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
              <Nav>
                {
                  user ? (
                    <>
                    <LinkContainer to="/create">
                      <div className="mt-2">
                        <Button variant="info" className="">Create News</Button>
                      </div>
                    </LinkContainer>


                    <Nav.Link>
                      <div>
                        <Button variant="secondary" className=""
                        onClick={() => exit(user?.user.id)}
                        >Logout
                        <RiLogoutCircleLine size="20"/>
                        </Button>
                      </div>
                      

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