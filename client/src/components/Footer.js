import React from 'react'
import { Col, Row } from 'react-bootstrap'

const Footer = () => {
  return (
    <footer className="fixed-bottom">
        <Row className="text-center py-3">
            <Col>
                <p>BreakingNews! &copy; 2022</p>
            </Col>

            <Col>
                <p>Created by: Berk Logun&trade;</p>
            </Col>
        </Row>
    </footer>
        
  )
}

export default Footer