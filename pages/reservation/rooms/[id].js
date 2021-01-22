import { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../../../components/CheckoutForm/index";
import { Container, Row, Col, Card } from "react-bootstrap";
import Carousel from "../../../components/Carousel/index";
import "react-dates/lib/css/_datepicker.css";

const contentful = require("contentful");

const client = contentful.createClient({
  space: "ts47honc1w8u",

  accessToken: "oSWUxeAc79SBQzieh8SMB4Q_lFOjU-pKEKlS7rWvq8g",
});

const stripePromise = loadStripe(
  "pk_test_51HyLHAIgk2MP1Xy8rUM9akRuTVbB77IE5DvMQpcbxbeAqjxenvZ74lyxbvepsNYVLvNDHQ46XoiZUKOycMQJTzeX00b9amrHhK"
);


export default function room({ room }) {
  console.log(room);
  const { fields } = room;
  const {
    name,
    price,
    images,
    description,
    capacity,
    size,
    pets,
    breakfast,
  } = fields;
  const CarouselImages = images.map((image) => image.fields.file.url);


  return (
    <Container className="mt-5 pt-5" style={{ margin:'8rem auto'}}>
      <Row className="mt-4  mb-5">
        <Col xs={12} md={6}>
          <h1>{name}</h1>
          <h2>{price} DH</h2>
          <p>{description}</p>
        </Col>
        <Col xs={12} md={6}>
          <Carousel images={CarouselImages} />
        </Col>
      </Row>
      <Row className="mt-4 mb-5">
        <Col xs={12} md={6}>
          <h3>Features</h3>
          <Card style={{ border:'1px solid #f26e11',backgroundColor:'rgba( 242, 110, 17, 0.1 )' }} body>
            <h5>room size: {size}</h5>
            <h5>
              perfect for {`${capacity} ${capacity == 1 ? `person` : `people`}`}{" "}
            </h5>
            <h5>pets are {pets ? "" : "not"} allowed</h5>
            <h5>breakfast is {breakfast ? "" : "not"} included</h5>
          </Card>
        </Col>
        <Col xs={12} md={6}>
          <h3>Checkout</h3>
          <Card style={{border:'1px solid #f26e11',padding:'4rem',backgroundColor:'rgba( 242, 110, 17, 0.1 )' }} body>
            <Elements stripe={stripePromise}>
              <CheckoutForm room={{name,price}}/>
            </Elements>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export async function getStaticProps({ params }) {
  const rooms = (await client.getEntries({ content_type: "room" })).items;
  const room = rooms.filter((room) => room.sys.id === params.id)[0];
  return { props: { room } };
}

export async function getStaticPaths() {
  const rooms = (await client.getEntries({ content_type: "room" })).items;
  const paths = rooms.map((room) => `/reservation/rooms/${room.sys.id}`);
  return {
    paths,
    fallback: true,
  };
}
