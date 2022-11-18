import React, { useState } from 'react'
import { Form, Button } from  'react-bootstrap'
import ReactFileBase64 from 'react-file-base64'

import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import { createNews } from '../actions/newsActions.js';

//import * as api from '../axios/index.js'

const SubmitNews = () => {

    const [newsData, setNewsData] = useState({
        title: '',
        content: '',
        author: '',
        image: '',
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();




  return (
    <>
        <Form onSubmit={(e) => {
            e.preventDefault();
            //api.createNews(newsData);
            dispatch(createNews(newsData));
            navigate('/dashboard');

        }}>
            <Form.Group className="text-center py-3">
                <h1>Submit News</h1>
            </Form.Group>

            <Form.Group className="py-3">
                <Form.Label>News Title</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="Enter News Title" 
                    onChange={(e) => setNewsData({...newsData, title: e.target.value})}/>
            </Form.Group>

            <Form.Group className="py-3">
                <Form.Label>Author</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="Author" 
                    onChange={(e) => setNewsData({...newsData, author: e.target.value})} />
            </Form.Group>

            <Form.Group className="py-3">
                <Form.Label>News Content</Form.Label>
                <Form.Control 
                    name="content"
                    type="text"
                    as="textarea"
                    rows={3}  
                    onChange={(e) => setNewsData({...newsData, content: e.target.value})}/>
            </Form.Group>

            <Form.Group className="py-3">
                <Form.Label>News Image </Form.Label> 
                
                <p></p>
                <ReactFileBase64 type="file" multiple={false} onDone={({base64}) =>{setNewsData({...newsData, image: base64})}}/>
                
            </Form.Group>

            <Form.Group className="py-5">
                <Button type="submit">Submit</Button>
            </Form.Group>
        </Form>
    </>
  )
}

export default SubmitNews