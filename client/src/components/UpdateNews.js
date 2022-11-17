import React, { useEffect, useState } from 'react'
import { Form, Button } from  'react-bootstrap'
import ReactFileBase64 from 'react-file-base64'

import { useNavigate } from 'react-router-dom';

import { updateNews, fetchSingleNews } from '../axios/index.js'

const UpdateNews = ({id}) => {

    const [newsData, setNewsData] = useState({
        title: '',
        content: '',
        author: '',
        image: '',
    });



    // to fill the form with the data of the news
    useEffect(() => {
        const getNews = async () => {
            const { data } = await fetchSingleNews(id);
            setNewsData(data);
        }
        getNews();
    }, [id]);


    const navigate = useNavigate();


  return (
    <>
        <Form onSubmit={(e) => {
            e.preventDefault();
            updateNews(id,newsData);
            navigate('/');

        }}>
            <Form.Group className="text-center py-3">
                <h1>Update News</h1>
            </Form.Group>

            <Form.Group className="py-3">
                <Form.Label>News Title</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="Enter News Title" 
                    value={newsData.title}
                    onChange={(e) => setNewsData({...newsData, title: e.target.value})}/>
            </Form.Group>

            <Form.Group className="py-3">
                <Form.Label>Author</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="Author" 
                    value={newsData.author}
                    onChange={(e) => setNewsData({...newsData, author: e.target.value})} />
            </Form.Group>

            <Form.Group className="py-3">
                <Form.Label>News Content</Form.Label>
                <Form.Control 
                    name="content"
                    type="text"
                    as="textarea"
                    rows={3}  
                    value={newsData.content}
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

export default UpdateNews