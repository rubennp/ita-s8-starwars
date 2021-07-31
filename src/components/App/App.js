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

// Images
import StarWarsLogo from '../../assets/logo.svg';

const App = () => {
  const starshipsData = useGetSwapiData('starships');
  const [starships, setStarships] = useState(null);

  useEffect(() => {
    setStarships(starshipsData.state.results);
  }, [starshipsData.state.results]);

  return (
    <AppContainer className="appContainer">
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
                <Nav.Item as="li"><Nav.Link href="/signin">Sign In</Nav.Link></Nav.Item>
                <Nav.Item as="li"><Nav.Link href="/signup">Sign Up</Nav.Link></Nav.Item>
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
            <Route path="/starships/:idx">
              {starshipsData.isLoading &&
                  <Container>
                    <Row className="spinner">
                      <Spinner animation="grow" variant="light">
                        <span className="visually-hidden">Loading...</span>
                      </Spinner>
                    </Row>
                  </Container>}
              {starships && <StarShipInfo starships={starships} />}
            </Route>
            <Route path="/starships" render={props => {
                if (starships) {
                  if (starshipsData.isLoading) {
                    return (
                      <>
                        <StarShips {...props} starships={starships} data={{isLoading: starshipsData.isLoading, hasMore: starshipsData.hasMore, setPage: starshipsData.setPageNumber}} />
                        <Spinner animation="border" variant="light">
                          <span className="visually-hidden">Loading...</span>
                        </Spinner>
                      </>
                    );
                  } else {
                    return <StarShips {...props} starships={starships} data={{isLoading: starshipsData.isLoading, hasMore: starshipsData.hasMore, setPage: starshipsData.setPageNumber}} />;
                  }
                }
              }
            }/>
            <Route path="/signin"><SignIn /></Route>
            <Route path="/signup"><SignUp /></Route>
            <Route exact path="/"><Home /></Route>
            <Route component={Error404} />
          </Switch>
        </Row>
      </Container>
    </AppContainer>
  );
}

const SignIn = () => <h2>Sign In</h2>
const SignUp = () => <h2>Sign Up</h2>
const Error404 = () => <h2>Ups...</h2>

export default App;
