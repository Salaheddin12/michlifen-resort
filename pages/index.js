import Image from 'next/image'
import {Container,Row,Col,Button} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {
  return (
    <div >
      <main >
        <Container fluid="md sm" className="mt-5 pt-5">
          <Row>
            <Col className="mt-5">
              <h1>Michlifen Resort & Golf is located next to Ifrane National Park, 64.4 km south of Fes in Morocco.</h1>
              <Button className="mt-4" style={{backgroundColor:'#ee6f57',border:"none"}}>Discover</Button>
            </Col>
            <Col><Image src="/undraw_travelers.svg" width={1000} height={1000} layout="responsive"/></Col>
          </Row>
        </Container>
      </main>
    </div>
  )
}
