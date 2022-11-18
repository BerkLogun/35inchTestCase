import React, { useState, useEffect } from 'react'
import { Spinner, Row, Col } from 'react-bootstrap'

import { useDispatch, useSelector } from 'react-redux'
import { fetchOneNews } from '../actions/newsActions.js'

import News from '../components/SingleNews.js'

const SingleNewsScreen = () => {
    const dispatch = useDispatch();
    const news = useSelector((state) => state.news);

    useEffect(() => {
      if(!news[0]){
        dispatch(fetchOneNews());
      }
    }, [dispatch])
    




  return (

    
    <>
      <h1>{news.title}</h1>
      {!news.length ? <Spinner animation="border" role="status" /> : 
        <Row>
         
            <Col >
            <News news={news} />
            </Col>
         
        </Row>
      }
    </>
  )
}


export default SingleNewsScreen