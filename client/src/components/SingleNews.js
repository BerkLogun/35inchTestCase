import React from 'react'
import Card from 'react-bootstrap/Card';
import moment from 'moment';



const SingleNews = ({news}) => {
  return (
    <Card style={{ justifyContent: 'center' }}>
      <Card.Img variant="top" src={news.image} />
      <Card.Body>
        <Card.Title>{news.title}</Card.Title>
          <Card.Text>
            {news.content}
          </Card.Text>
        <Card.Text>Author: {news.author}</Card.Text>
        <Card.Subtitle className="mb-2 text-muted">Updated: {moment(news.updatedAt).fromNow()}</Card.Subtitle>
      </Card.Body>
    </Card>
  )
}

export default SingleNews