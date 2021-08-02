import { Container, Nav, Navbar, Row, Spinner } from 'react-bootstrap';
import { Route, Switch, NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';

// hooks
import { useGetSwapiData } from '../../hooks/useGetSwapiData';


// Styled Components
import { AppContainer, Logo } from './App.styled';

// Pages
import Home from '../Pages/Home';
import StarShips from '../Pages/StarShips';
import StarShipInfo from '../Pages/StarShips/Info';
import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';

// Images
import StarWarsLogo from '../../assets/logo.svg';

const App = () => {
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  const starshipsData = useGetSwapiData('starships');
  const [starships, setStarships] = useState(null);

  useEffect(() => {
    setStarships(starshipsData.state.results);
  }, [starshipsData.state.results]);

  return (
    <AppContainer className="appContainer">
      <SignIn show={showSignIn} onHide={() => setShowSignIn(false)} />
      <SignUp show={showSignUp} onHide={() => setShowSignUp(false)} />
      <Container fluid className="headerContainer sticky-top">
        <Row className="headerUpperRow">
          <Navbar bg="dark" variant="dark">
            <Container className="logoContainer">
              <Navbar.Brand href="/">
                <Logo alt="Logo" src={StarWarsLogo} width="240" />
              </Navbar.Brand>
            </Container>
            <Container className="loginContainer">
              <Nav as="ul">
                <Nav.Item as="li"><button onClick={() => setShowSignIn(true) }>Sign In</button></Nav.Item>
                <Nav.Item as="li"><button onClick={() => setShowSignUp(true) }>Sign Up</button></Nav.Item>
              </Nav>
            </Container>
          </Navbar>
        </Row>
        <Row className="headerMainNav">
          <Navbar bg="dark" variant="dark" className="nav-principal">
            <Container className="menuContainer">
              <Nav as="ul">
                <Nav.Item as="li"><NavLink exact to ="/" className="nav-link">Home</NavLink></Nav.Item>
                <Nav.Item as="li"><NavLink to="/starships" className="nav-link">StarShips</NavLink></Nav.Item>
              </Nav>
            </Container>
          </Navbar>
        </Row>
      </Container>
      <Container>
        <Row>
          <Switch>
            <Route path="/starships/:idx" render={props => {
              return (
                <>
                  { starshipsData.isLoading && 
                    <Spinner animation="grow" variant="light">
                      <span className="visually-hidden">Loading...</span>
                    </Spinner> }
                  { starships && <StarShipInfo {...props } starships={starships} total={starshipsData.state.count}/> }
                </>
              );
            }}>
            </Route>
            <Route path="/starships" render={props => {
              return (
                <>
                  { starships && <StarShips {...props} starships={starships} data={{isLoading: starshipsData.isLoading, hasMore: starshipsData.hasMore, setPage: starshipsData.setPageNumber}} /> }
                  { starshipsData.isLoading && <Spinner animation="border" variant="light"> 
                    <span className="visually-hidden">Loading...</span>
                  </Spinner> }
                </>
              );
            }}/>
            <Route exact path="/" component={props => <Home {...props} />} />
            <Route component={Error404} />
          </Switch>
        </Row>
      </Container>
    </AppContainer>
  );
}

const Error404 = () => <h2>Ups...</h2>

export default App;
