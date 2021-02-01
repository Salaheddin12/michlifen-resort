import { Card , Button } from 'react-bootstrap'
import React from 'react';
export default function index ({data}){
  const {sys,fields} = data;
  const {name,price,images} = fields;
    return (
        <Card style={{ width: '18rem',margin:'0 0 2rem 2rem',border:'1px solid #f26e11',backgroundColor:'rgba( 242, 110, 17, 0.1 )' }}>
        <Card.Img variant="top" src={images[0].fields.file.url} />
        <Card.Body>
          <Card.Title style={{fontWeight:'bold'}}>{name}</Card.Title>
          <Card.Text>
           {price} DH / Night
          </Card.Text>
          <Button style={{backgroundColor:'#f26e11',border:"none",fontSize:"18px"}} onClick={()=>window.location.replace(`/reservation/${sys.id}`)}>Reserve</Button>
        </Card.Body>
      </Card>
    );
};

