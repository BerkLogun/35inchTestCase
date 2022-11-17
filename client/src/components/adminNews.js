import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import moment from 'moment';
import { LinkContainer } from 'react-router-bootstrap'

import {MdModeEdit, MdDelete} from 'react-icons/md';

import { deleteNews, updateNews } from '../axios/index.js';

const adminNews = ({news}) => {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={news.image} />
      <Card.Header>
        <h3>{news.title}</h3>
        </Card.Header>
      <Card.Body>
          <Card.Text>
            {news.content}
          </Card.Text>
        <Card.Text>Author: {news.author}</Card.Text>
        <Card.Subtitle className="mb-2 text-muted">Updated: {moment(news.updatedAt).fromNow()}</Card.Subtitle>
        <Button variant="primary">See Full</Button>
      </Card.Body>
        <Card.Footer style={{display: 'flex', justifyContent: 'space-between'}}>
            <LinkContainer to={`update/${news.id}`} style={{cursor: 'pointer'}}>
                {
                // Edit Button
                }
                <Button variant="light" className="btn-sm">
                    <MdModeEdit size="30" />
                </Button>
            </LinkContainer>


            {
            // Delete Button
            }
            
                <MdDelete size="30" color="red" style={{cursor: 'pointer'}} onClick={() => deleteNews(news.id)}/>
           

            

        </Card.Footer>


    </Card>
  )
}

export default adminNews