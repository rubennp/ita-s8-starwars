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
import SignOut from '../../assets/box-arrow-right.svg';

const App = () => {
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [users, setUsers] = useState([]);
  const [authUser, setAuthUser] = useState(null);

  const starshipsData = useGetSwapiData('starships');
  const [starships, setStarships] = useState(null);

  useEffect(function init() {
    const usersOnLocalStorage = localStorage.getItem('starwars-react-users');
    const authUserOnSessionStorage = sessionStorage.getItem('starwars-react-authuser');

    if (usersOnLocalStorage) setUsers(JSON.parse(usersOnLocalStorage));
    else localStorage.setItem('starwars-react-users', JSON.stringify([{
      name: 'John',
      surname: 'Smith',
      username: 'jsmith',
      email: 'jsmith@mail.com',
      password: '1234567A',
    }]));

    if (authUserOnSessionStorage) setAuthUser(JSON.parse(authUserOnSessionStorage));
  }, []);

  useEffect(function saveNewUsersOnLocalStorage() {
    localStorage.setItem('starwars-react-users', JSON.stringify(users));
  }, [users]);

  useEffect(function saveOrRemoveAuthUserFromSessionStorage() {
    if (authUser)
      sessionStorage.setItem('starwars-react-authuser', JSON.stringify(authUser));
    else
      sessionStorage.removeItem('starwars-react-authuser');
  }, [authUser]);

  useEffect(function changeOnStarships() {
    setStarships(starshipsData.state.results);
  }, [starshipsData.state.results]);

  return (
    <AppContainer className="appContainer">
      <SignIn show={showSignIn} onHide={() => setShowSignIn(false)} users={users} setauth={setAuthUser}/>
      <SignUp show={showSignUp} onHide={() => setShowSignUp(false)} users={users} setusers={setUsers}/>
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
                  <Nav.Item as="li">
                    {!authUser && <button onClick={() => setShowSignIn(true) }>Sign In</button>}
                    {authUser && `Welcome back, ${authUser.name}!`}
                  </Nav.Item>
                  <Nav.Item as="li">
                    {!authUser && <button onClick={() => setShowSignUp(true) }>Sign Up</button>}
                    {authUser && <button onClick={() => setAuthUser(null) }><img src={SignOut} alt="sign out icon" /></button>}
                  </Nav.Item>
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
