import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import moment from 'moment';
import { LinkContainer } from 'react-router-bootstrap'

import { MdModeEdit, MdDelete } from 'react-icons/md';
import { useDispatch } from 'react-redux';

//import { deleteNews, updateNews } from '../axios/index.js';
import {deleteNews} from '../actions/newsActions.js';


const adminNews = ({news}) => {

    // weird solution for an error that i dont get what causes ://  it just works fine on other components without this line
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const dispatch = useDispatch();

    



  
  return (
    <div className="mb-5">
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
            
                <MdDelete 
                size="30" 
                color="red" 
                style={{cursor: 'pointer'}} 
                onClick={() => {dispatch(deleteNews(news.id))}}/>
           

            

        </Card.Footer>


    </Card>

    </div>
    
  )
}

export default adminNews