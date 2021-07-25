import { Container, Nav, Navbar, Row } from 'react-bootstrap';
import { Route, Switch, NavLink } from 'react-router-dom';

// Styled Components
import { Logo } from './App.styled';

// Pages
import Home from '../Pages/Home';
import StarShips from '../Pages/StarShips';

// Images
import StarWarsLogo from '../../assets/logo.svg';

const App = () => {
  return (
    <>
      <Container fluid>
        <Row>
          <Navbar bg="dark" variant="dark">
            <Container>
              <Navbar.Brand href="/">
                <Logo alt="Logo" src={StarWarsLogo} width="240" />
              </Navbar.Brand>
              <Nav as="ul">
                <Nav.Item as="li"><Nav.Link href="/signin">Sign In</Nav.Link></Nav.Item>
                <Nav.Item as="li"><Nav.Link href="/signup">Sign Up</Nav.Link></Nav.Item>
              </Nav>
            </Container>
          </Navbar>
        </Row>
        <Row>
          <Navbar bg="dark" variant="dark">
            <Container>
              <Nav className="me-auto" as="ul">
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
            <Route exact path="/" component={Home} />
            <Route path="/starships" component={StarShips} />
            <Route path="/signin" component={SignIn} />
            <Route path="/signup" component={SignUp} />
            <Route component={Error404} />
          </Switch>
        </Row>
      </Container>
    </>
  );
}

const SignIn = () => <h2>Sign In</h2>
const SignUp = () => <h2>Sign Up</h2>
const Error404 = () => <h2>Ups...</h2>

export default App;
