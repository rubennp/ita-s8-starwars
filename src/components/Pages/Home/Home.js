import styled from 'styled-components';

import BB8 from '../../../assets/bb8.jpg';

const Home = ({history}) => (
    <Hero class="container col-xxl-8 px-4 py-5">
        <div class="row flex-lg-row-reverse align-items-center g-5 py-5">
            <div class="col-10 col-sm-8 col-lg-6">
                <img src={BB8} class="d-block mx-lg-auto img-fluid" alt="Bootstrap Themes" width="700" height="500" loading="lazy" />
            </div>
            <div class="col-lg-6">
                <h1 class="display-5 fw-bold lh-1 mb-3">This is, <span>yes</span>, the web you were looking for!</h1>
                <p class="lead mb-5 fs-4">All you want to know about your favorite films. <span>May the force be with you!</span></p>
                <p class="lead fs-6">Where do you want to start?</p>
                <div class="d-grid gap-2 d-md-flex justify-content-md-center">
                    <button type="button" class="btn btn-primary btn-lg px-4 me-md-2" onClick={() => history.push('/starships')}>Starships</button>
                </div>
            </div>
        </div>
    </Hero>
);

export default Home;

const Hero = styled.div`
    text-transform: uppercase;
    background-color: white;
    margin-top: 2em;
    box-shadow: 0 0 20px white;

    img {
        box-shadow: 5px 5px 10px rgba(0, 0, 0, .5)
    }

   span {
       display: inline-block;
       border-bottom: 0.25em solid rgba(0, 102, 255, .25);
       filter: drop-shadow(2px 2px 2px rgba(0, 102, 255, .75));
       line-height: .55;
    }

    button {
        background-color: rgba(0, 0, 255, .5);
        filter: drop-shadow(2px 2px 2px rgba(0,0, 255, .75));
    }

    p:last-of-type { text-align: center; }
`;
