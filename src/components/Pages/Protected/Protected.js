import { Row, Col } from 'react-bootstrap';

// Styled Components
import { StyledContainer, Hero, Strong } from '../Pages.styled';

import Droids from '../../../assets/droids.jpeg';

const Protected = ({ signin, signup }) => (
  <StyledContainer>
    <Hero xxl={8} className="px-4 py-5">
        <Row className="flex-lg-row-reverse align-items-center g-5 py-5">
            <Col xs={10} sm={8} lg={6}>
                <img src={Droids} className="d-block mx-lg-auto img-fluid rounded" alt="Bootstrap Themes" width="700" height="500" loading="lazy" />
            </Col>
            <Col lg={6}>
                <h1 className="display-5 fw-bold lh-1 mb-5 text-center">Ups, this page is <Strong className="my-3">only for signed in</Strong> users!</h1>
                <p className="lead fs-6 mb-1">Please, sign in or sign up to see it:</p>
                <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                    <button type="button" className="btn btn-primary btn-lg px-4 me-md-2" onClick={() => { signin(true) }}>Sign In</button>
                    <button type="button" className="btn btn-primary btn-lg px-4 me-md-2" onClick={() => { signup(true) }}>Sign Up</button>
                </div>
            </Col>
        </Row>
    </Hero>
  </StyledContainer>
);

export default Protected;