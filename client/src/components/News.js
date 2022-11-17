import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import moment from 'moment';

const News = ({news}) => {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={news.image} />
      <Card.Body>
        <Card.Title>{news.title}</Card.Title>
          <Card.Text>
            {news.content}
          </Card.Text>
        <Card.Text>Author: {news.author}</Card.Text>
        <Card.Subtitle className="mb-2 text-muted">Updated: {moment(news.updatedAt).fromNow()}</Card.Subtitle>
        <Button variant="primary">See Full</Button>
      </Card.Body>
    </Card>
  )
}

export default News