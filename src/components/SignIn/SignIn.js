import { useEffect, useState } from 'react';
import { SignModal } from '../SignModal.styled';
import { Modal, Button, Form } from 'react-bootstrap';

const SignIn = props => {
  const [validEmail, setValidEmail] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [validated, setValidated] = useState(false);
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState({
    email: 'Required',
    password: 'Required',
  });

  const validatedLook = (validated, el) => {
    if (validated) {
      if (el.classList.contains('is-invalid')) el.classList.remove('is-invalid');
          el.classList.add('is-valid');
    } else {
      if (el.classList.contains('is-valid')) el.classList.remove('is-valid');
          el.classList.add('is-invalid');
    }
  };

  const handleSubmit = e => {
    if(!(validEmail && validPassword)) {
      e.preventDefault();
      e.stopPropagation();
    } 
    setValidated(true);
  };

  const handleChange = e => {
    const el = e.currentTarget;
    
    if (el.type === "email") {
      setValidEmail(false);

      if (!el.value) {
        setErrors(prev => { return { ...prev, email: 'Required' }; });
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(el.value)) {
        setErrors(prev => { return { ...prev, email: "Invalid email" }; });
      } else if (props.users.find(user => user.email === el.value) === undefined) {
        setErrors(prev => { return { ...prev, email: "User doesn't exist!" }; });
      } else {
        setUser(props.users.find(user => user.email === el.value));
        setErrors(prev => { return { ...prev, email: '' }; });
        setValidEmail(true);
      }

      validatedLook(validEmail, el);
    } else if (el.type === "password") {
      setValidPassword(false);
      
      if (!el.value) {
        setErrors(prev => { return { ...prev, password: 'Required' }; });
      } else if (user && user.password !== el.value) {
        setErrors(prev => { return { ...prev, password: "Your password not match" }; });
      } else if (!user) {
        setErrors(prev => { return { ...prev, password: "First write valid email!" }; });
      } else {
        setErrors(prev => { return { ...prev, password: '' }; });
        setValidPassword(true);
      }

      validatedLook(validPassword, el);
    }
  };

  const handleReset = e => {
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
                <Form.Control type="email" placeholder="Enter valid email" defaultValue="" onKeyUp={handleChange} />
                <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formSignInPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" defaultValue="" onKeyUp={handleChange} />
                <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
              </Form.Group>
              <Button variant="primary" type="submit">Sign In</Button>
              <Button variant="primary" type="reset">Reset</Button>
            </Form>
        </Modal.Body>
    </SignModal>  
  );
};

export default SignIn;