import { useHistory } from 'react-router';

import { Col, Row } from 'react-bootstrap';
import { StyledContainer, Hero, Strong } from '../Pages.styled';

import BB8 from './img/bb8.jpg';

const Home = () => {
    const history = useHistory();

    return (
        <StyledContainer>
            <Hero xxl={8} className="px-4 py-5">
                <Row className="flex-lg-row-reverse align-items-center g-5 py-5">
                    <Col xs={10} sm={8} lg={6}>
                        <img src={BB8} className="d-block mx-lg-auto img-fluid rounded" alt="Bootstrap Themes" width="700" height="500" loading="lazy" />
                    </Col>
                    <Col lg={6}>
                        <h1 className="display-5 fw-bold lh-1 mb-5">This is, <Strong>yes</Strong>, the web you were looking for!</h1>
                        <p className="lead mb-5 fs-4">All you ever wanted to know about your favorite universe! <Strong>May the force be with you!</Strong></p>
                        <p className="lead fs-6 mb-1">Where do you want to start?</p>
                        <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                            <button type="button" className="btn btn-primary btn-lg px-4 me-md-2" onClick={() => history.push('/starships')}>Starships</button>
                            <button type="button" className="btn btn-primary btn-lg px-4 me-md-2" onClick={() => history.push('/people')}>Characters</button>
                        </div>
                    </Col>
                </Row>
            </Hero>
        </StyledContainer>
    );
};

export default Home;