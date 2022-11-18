import React, {useState} from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'

import { useDispatch, useSelector } from 'react-redux'
import { signup, signin } from '../actions/userActions.js'
import Message from '../components/Message'
import { useNavigate } from 'react-router-dom';

import { GoogleLogin } from 'react-google-login';
import { FcGoogle } from 'react-icons/fc'



const AuthScreen = ({history}) => {

    const initialFormData = {
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
        admin: false
    }

    const userState = useSelector((state) => state.users)
    const { error } = userState

    const [form, setForm] = useState(initialFormData)  // inputs are stored in this form variable
    const [login, setLogin] = useState(true)
    const [checked, setChecked] = useState(false);

    const googleSuccess = async (res) => {
        console.log(res)
    }

    const googleFailure = (error) => {
        console.log(error)
    }


    const dispatch = useDispatch()

    if(!checked){
        form.admin = false
    }else{
        form.admin = true
    }

    const navigate = useNavigate();
  return (
    <>
        <Container>
            <Row className="justify-content-center">
                <Col xs={12} md={6}>
                    {
                        login ? (
                        
                        <Form 
                            onSubmit={(e) => {
                                e.preventDefault()
                                
                                if(login){
                                    dispatch(signin(form, navigate))
                                }
                            }}
                        className="align-content-center mt-3">
                            <h2 className="text-center mb-3">Login</h2>
                            {error && <Message>{error}</Message>}

                            <Form.Group controlId="email" className="mb-3">
                                <Form.Control 
                                type="email" 
                                placeholder="Enter email" 
                                onChange={(e) => setForm({...form, email: e.target.value})}
                                />
                            </Form.Group>

                            <Form.Group controlId="password" className="mb-3">
                                <Form.Control 
                                type="password" 
                                placeholder="Password"
                                onChange={(e) => setForm({...form, password: e.target.value})}
                                />
                            </Form.Group>


                            <div className="d-grid gap-2 mt-3">
                                <Button variant="warning" type="submit" className="mt-3">
                                    Login
                                </Button>
                            </div>
                            {
                            // tried to add Google Login to the project but failed because got an error 

                            }

                            <div className="d-grid gap-2 mt-3">

                                <GoogleLogin
                                    clientId="99101970829-042e0r1iik2nd262tdvnlu0d8s7lh5lc.apps.googleusercontent.com"
                                    buttonText="Login"
                                    onSuccess={googleSuccess}
                                    onFailure={googleFailure}
                                    render={renderProps => (
                                        <Button variant="info" onClick={renderProps.onClick} disabled={renderProps.disabled}>
                                            <div className="text-center">
                                                Login with Google

                                                <FcGoogle size="20" className="ml-5" />
                                            </div>

                                        </Button>
                                      )}


                                    cookiePolicy={'single_host_origin'}
                                /> 
                                
                            </div>

                            <div className="text-center mt-3">
                                <Form.Text as="large-text">Don't have an account?{` `}
                                    <span onClick={(e) => setLogin(!login)} style={{fontWeight:'bold', cursor: 'pointer', color: 'white'}}>Register!</span>
                                </Form.Text>
                            </div>
                            
                            



                        
                        </Form>

                        ): (
                        
                        <Form 
                        onSubmit={(e) => {
                            e.preventDefault()
                            
                            if(!login){
                                dispatch(signup(form, navigate))
                            }
                        }}
                        
                        className="align-content-center mt-3">
                            <h2 className="text-center mb-3">Register</h2>
                            {error && <Message>{error}</Message>}

                            <Form.Group controlId="username" className="mb-3">
                                <Form.Control 
                                type="text" 
                                placeholder="Enter username" 
                                onChange={(e) => setForm({...form, username: e.target.value})}
                                />
                            </Form.Group>

                            <Form.Group controlId="email" className="mb-3">
                                <Form.Control 
                                 type="email"
                                 placeholder="Enter email" 
                                 onChange={(e) => setForm({...form, email: e.target.value})}
                                 />
                            </Form.Group>

                            <Form.Group controlId="password" className="mb-3">
                                <Form.Control 
                                type="password" 
                                placeholder="Password" 
                                onChange={(e) => setForm({...form, password: e.target.value})}
                                />
                            </Form.Group>

                            <Form.Group controlId="confirmPassword" className="mb-3">
                                <Form.Control 
                                type="password" 
                                placeholder="Confirm Password" 
                                onChange={(e) => setForm({...form, confirmPassword: e.target.value})}
                                />
                            </Form.Group>

                            <Form.Group controlId="isAdmin" className="mb-3">
                                <Form.Check 
                                type="checkbox" 
                                label="Are you an admin?" 
                                onChange={(e) => setForm({...form, isAdmin: setChecked(!checked)})}
                                />
                            </Form.Group>


                            <div className="d-grid gap-2">
                                <Button variant="primary" type="submit" className="mt-3">
                                    Register
                                </Button>
                            </div>

                            <div className="text-center mt-3">
                                <Form.Text as="large-text">Already have an account?{` `}
                                    <span onClick={(e) => setLogin(!login)} style={{fontWeight:'bold', cursor: 'pointer', color: 'white'}}>Login!</span>
                                </Form.Text>
                            </div>



                        </Form>
                        
                        
                        
                        
                        
                        )
                    }
                </Col>
            </Row>
        </Container>
                


    </>
  )
}

export default AuthScreen