import { useEffect, useState } from 'react';
import { SignModal, SWButton } from '../SignModal.styled';
import { Modal, Form, InputGroup } from 'react-bootstrap';

import AsteriskIcon from '../../assets/asterisk.svg';
import AtIcon from '../../assets/at.svg';

const SignIn = props => {
  const [validEmail, setValidEmail] = useState(false);
  const [email, setEmail] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [validated, setValidated] = useState(false);
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState({
    email: 'Required',
    password: 'Required',
  });

  useEffect(() => {
    setUser(null);
    setEmail("");
    setPassword("");
    setValidEmail(false);
    setValidPassword(false);
  }, []);

  useEffect(() => {
    validateEmail();
    validatePassword();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, password]);

  const handleSubmit = e => {
    if(!(validEmail && validPassword)) {
      e.preventDefault();
      e.stopPropagation();
    } 
    setValidated(true);
  };

  const validateEmail = () => {
    setValidEmail(false);

      if (email === "") {
        setUser(null);
        setErrors(prev => { return { ...prev, email: 'Required' }; });
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
        setErrors(prev => { return { ...prev, email: "Invalid email" }; });
      } else if (props.users.find(user => user.email === email) === undefined) {
        setErrors(prev => { return { ...prev, email: "User doesn't exist!" }; });
      } else {
        setUser(props.users.find(user => user.email === email));
        setErrors(prev => { return { ...prev, email: '' }; });
        setValidEmail(true);
      }
  };

  const validatePassword = () => {
    setValidPassword(false);
      
      if (password === "" && user) {
        setErrors(prev => { return { ...prev, password: 'Required' }; });
      } else if (user && user.password !== password) {
        setErrors(prev => { return { ...prev, password: "Your password not match" }; });
      } else if (!user) {
        setErrors(prev => { return { ...prev, password: "First write valid email!" }; });
      } else {
        setErrors(prev => { return { ...prev, password: '' }; });
        setValidPassword(true);
      }
  };

  const handleReset = e => {
    setUser(null);
    setEmail("");
    setPassword("");
    setValidEmail(false);
    setValidPassword(false);

    const form = e.currentTarget;
    const inputs = form.querySelectorAll('input');
    inputs.forEach(i => { 
      if (i.classList.contains('is-invalid')) i.classList.remove('is-invalid');
      if (i.classList.contains('is-valid')) i.classList.remove('is-valid');
    });

    setValidated(false);
  };

  return (
    <SignModal {...props} size="md" aria-labelledby="contained-modal-title-vcenter" backdrop="static" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <strong>Sign in</strong>
        </Modal.Title>
      </Modal.Header>
        <Modal.Body>
            <Form noValidate validated={validated} onSubmit={handleSubmit} onReset={handleReset} >
              <Form.Group className="mb-3" controlId="formSignInEmail">
                <Form.Label>Email address</Form.Label>
                <InputGroup hasValidation>
                  <InputGroup.Text id="inputGroupPrepend"><img src={AtIcon} alt="at icon" /></InputGroup.Text>
                  <Form.Control type="email" placeholder="Enter valid email" value={email} onChange={e => setEmail(e.target.value)} isValid={validEmail} isInvalid={!validEmail}/>
                  <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formSignInPassword">
              <Form.Label>Password</Form.Label>
                <InputGroup hasValidation>
                  <InputGroup.Text id="inputGroupPrepend"><img src={AsteriskIcon} alt="asterisk icon" /></InputGroup.Text>
                  <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} isValid={validPassword} isInvalid={!validPassword} />
                  <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <Form.Group className="mt-5 d-flex justify-content-end">
                <SWButton variant="primary" type="submit">Sign In</SWButton>
                <SWButton variant="primary" type="reset">Reset</SWButton>
              </Form.Group>
            </Form>
        </Modal.Body>
    </SignModal>  
  );
};

export default SignIn;