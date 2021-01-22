import {Carousel} from 'react-bootstrap';

export default function index ({images}) {
    return (
        <Carousel>
        {images.map(image=><Carousel.Item>
          <img
            className="d-block w-100"
            src={image}
            alt="First slide"
          />
        </Carousel.Item>)}
      </Carousel>
    );
};
