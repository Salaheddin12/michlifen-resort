import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardColumns,
  Table,
} from "react-bootstrap";
import data from '../data/index'
import Carousel from "../components/Carousel/index";
import styles from "../styles/About.module.css";

export default function rooms() {
  const images = ['img1.webp','img2.webp','img3.webp']
  const {facilities,nearby,restaurants,title,other} = data.about;
  
  return (
    <Container fluid="md sm" className="mt-5 pt-5">
      <Row>
        <Col className="mt-5">
          <h1>{title}</h1>
          <Button
            className="mt-4"
            style={{backgroundColor:'#f26e11',border:"none",fontSize:"25px"}}
          >
            Visit Us
          </Button>
        </Col>
        <Col>
          <Carousel images={images}/>
        </Col>
      </Row>
      <Row className={styles.row}>
        <h2 className={styles.title}>{facilities.title }</h2>
        <CardColumns>
        {facilities.items.map(item=>(<Card style={{ width: '18rem',margin:'0 0 2rem 2rem',border:'1px solid #f26e11',backgroundColor:'rgba( 242, 110, 17, 0.1 )' }}>
          <Card.Img variant="top" src={item.image} />
          <Card.Body>
            <Card.Title>{item.title}</Card.Title>
          </Card.Body>
        </Card>)
        )}
            {/* <Card body>
              <h3>
                Michlifen Resort & Golf offers 70 air-conditioned rooms and suites
                with free Wi-Fi. Each guestroom has a balcony overlooking the pool
                or surrounding forest area.
            </h3>
            </Card>
            <Card body>
              <h3>
                Michlifen Resort & Golf is an hour’s drive from Fes Airport and
                offers free private parking
            </h3>
            </Card>
            <Card body>
              <h3>
                Couples in particular like the location – they rated it 9.6 for a
                two-person trip.
            </h3>
            </Card>
            <Card body>
              <h3>We speak your language!</h3>
            </Card> */}
          </CardColumns>
      </Row>
        <h2 className={styles.title}>Our Surroundings </h2>
        <Row className={styles.row}>
          <Col>
            <h4>{nearby.title} </h4>
            <Table bordered>
              <tbody>
              {nearby.locations.map(location=>(<tr>
                  <td>{location.title}</td>
                  <td>{location.distance} km</td>
                </tr>)
              )}
              </tbody>
            </Table>
          </Col>
          <Col>
          {other.map(item=><>
          <h4>{item.title}</h4>
          <Table bordered>
              <tbody>
                  {item.locations.map(value=>
                <tr>
                  <td>{value.title}</td>
                  <td>{value.distance} km</td>
                </tr>
                  )}
              </tbody>
            </Table>
            </>
          )}

          </Col>
        </Row>
        <h2 className={styles.title}>{restaurants.title} </h2>
        <Row className={styles.row}>
          <CardColumns>
          {restaurants.items.map(value=>(<Card style={{ width: '18rem',margin:'0 0 2rem 2rem',border:'1px solid #f26e11',backgroundColor:'rgba( 242, 110, 17, 0.1 )' }} body>
              <h3>{value.name} </h3>
              <h5>Food: {value.food}</h5>
              <h5>Menu: {value.menu}</h5>
              <h5>Menu: {value.openFor||''}</h5>
            </Card>)
            )}
          </CardColumns>
        </Row>
    </Container>
  );
}
