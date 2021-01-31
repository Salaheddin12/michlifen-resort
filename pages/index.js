import Image from 'next/image'
import {Container,Row,Col,Button} from "react-bootstrap";

export default function Home() {
  return (
    <div >
      <main >
        <Container fluid="sm" className="mt-5 mb-5 pt-5">
          <Row>
            <Col sm={12} md={6} className="mt-5">
              <h1>Michlifen Resort & Golf is located next to Ifrane National Park, 64.4 km south of Fes in Morocco.</h1>
              <Button className="mt-4 mb-4" style={{backgroundColor:'#f26e11',border:"none"}}>Discover</Button>
            </Col>
            <Col sm={12} md={6}><Image src="/undraw_travelers_2.svg" width={1000} height={700} layout="responsive"/></Col>
          </Row>
        </Container>  
      </main>
    </div>
  )
}
