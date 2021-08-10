import { useEffect, useState } from 'react';
import { SignModal, SWButton } from '../SignModal.styled';
import { Modal, Form, InputGroup } from 'react-bootstrap';

import AsteriskIcon from '../img/asterisk.svg';
import AtIcon from '../img/at.svg';
import UsernameIcon from '../img/person-circle.svg';
import RepeatPasswordIcon from '../img/arrow-repeat.svg';

const SignUp = props => {
  const [name, setName] = useState("");
  const [validName, setValidName] = useState(false);
  const [surname, setSurname] = useState("");
  const [validSurname, setValidSurname] = useState(false);
  const [username, setUsername] = useState("");
  const [validUsername, setValidUsername] = useState(false);
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [validRepeatedPassword, setValidRepeatedPassword] = useState(false);
  
  const [formValidated, setFormValidated] = useState(false);
  const [errors, setErrors] = useState({
    name: 'Required',
    surname: 'Required',
    username: 'Required',
    email: 'Required',
    password: 'Required',
    repeatedPassword: 'Required',
  });

  const initState = () => {
    setName("");
    setSurname("");
    setUsername("");
    setEmail("");
    setPassword("");
    setRepeatedPassword("");
    setValidName(false);
    setValidSurname(false);
    setValidUsername(false);
    setValidEmail(false);
    setValidPassword(false);
    setValidRepeatedPassword(false);
  };

  useEffect(() => {
    initState();
  }, []);

  useEffect(() => {
    validateName();
    validateSurname();
    validateUsername();
    validateEmail();
    validatePassword();
    validateRepeatedPassword();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, surname, username, email, password, repeatedPassword]);

  const handleSubmit = e => {
    if(!(validEmail && validPassword)) {
      console.log("Ups... there was errors on the signing in process:");
      console.log(`-------------------------------------------------
      name says: ${errors.name}
      surname says: ${errors.surname}
      username says: ${errors.username}
      email says: ${errors.email}
      password says: ${errors.password}
      repeated password says: ${errors.repeatedPassword}`);
      e.preventDefault();
      e.stopPropagation();
    } else {
      const newUser = () => {
        props.setusers(
        [...props.users,
          {
            name: name,
            surname: surname,
            username: username,
            email: email,
            password: password,
          }
        ]);
      };

      newUser();
      setFormValidated(true);
    }
  };

  const validateName = () => {
    setValidName(false);

    if (name === "") {
      setErrors(prev => { return { ...prev, name: 'Required' }; });
    } else {
      setErrors(prev => { return { ...prev, name: '' }; });
      setValidName(true);
    }
  };

  const validateSurname = () => {
    setValidSurname(false);

    if (surname === "")
      setErrors(prev => { return { ...prev, surname: 'Required' }; });
    else {
      setErrors(prev => { return { ...prev, surname: '' }; });
      setValidSurname(true);
    }
  };

  const validateUsername = () => {
    setValidUsername(false);

    if (username === "")
      setErrors(prev => { return { ...prev, username: 'Required' }; });
    else if (username.length < 3)
      setErrors(prev => { return { ...prev, username: 'Must have at least 3 characters.'}; });
    else if (props.users.find(user => user.username === username))
      setErrors(prev => { return { ...prev, username: 'Username must be unique. This one already exists, try with other.'}; }); 
    else {
      setErrors(prev => { return { ...prev, username: '' }; });
      setValidUsername(true);
    }
  };

  const validateEmail = () => {
    setValidEmail(false);

    if (email === "")
      setErrors(prev => { return { ...prev, email: 'Required' }; });
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email))
      setErrors(prev => { return { ...prev, email: "Invalid email" }; });
    else if (props.users.find(user => user.email === email)) 
      setErrors(prev => { return { ...prev, email: "This email alredy exists. Are you trying to signing in?" }; });
    else {
      setErrors(prev => { return { ...prev, email: '' }; });
      setValidEmail(true);
    }
  };

  const validatePassword = () => {
    setValidPassword(false);
      
    if (password === "")
      setErrors(prev => { return { ...prev, password: 'Required' }; });
    else if (!/^(?=\w+\d)(?=\w*[A-Z])\S{8,}$/.test(password))
      setErrors(prev => { return { ...prev, password: "Must contain at least 8 characters, 1 uppercase and 1 number." }; });
    else {
      setErrors(prev => { return { ...prev, password: '' }; });
      setValidPassword(true);
    }
  };

  const validateRepeatedPassword = () => {
    setValidRepeatedPassword(false);

    if (validPassword) {
      if (repeatedPassword === "")
        setErrors(prev => { return { ...prev, repeatedPassword: 'Required' }; });
      else if (repeatedPassword !== password)
        setErrors(prev => { return { ...prev, repeatedPassword: "Your passwords not match" }; });
      else {
          setErrors(prev => { return { ...prev, repeatedPassword: '' }; });
          setValidRepeatedPassword(true);
      }
    } else 
      setErrors(prev => { return { ...prev, repeatedPassword: "First write valid password!" }; });
  };

  const handleReset = e => {
    initState();

    const form = e.currentTarget;
    const inputs = form.querySelectorAll('input');
    inputs.forEach(i => { 
      if (i.classList.contains('is-invalid')) i.classList.remove('is-invalid');
      if (i.classList.contains('is-valid')) i.classList.remove('is-valid');
    });

    setFormValidated(false);
  };

  return (
    <SignModal show={props.show} onHide={props.onHide} size="md" aria-labelledby="contained-modal-title-vcenter" backdrop="static" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <strong>Sign in</strong>
        </Modal.Title>
      </Modal.Header>
        <Modal.Body>
            <Form noValidate validated={formValidated} onSubmit={handleSubmit} onReset={handleReset} >
              <Form.Group className="mb-3" controlId="formSignUpName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter your name" value={name} onChange={e => setName(e.target.value)} isValid={validName} isInvalid={!validName}/>
                <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formSignUpSurname">
                <Form.Label>Surname</Form.Label>
                <Form.Control type="text" placeholder="Enter your surname" value={surname} onChange={e => setSurname(e.target.value)} isValid={validSurname} isInvalid={!validSurname} />
                <Form.Control.Feedback type="invalid">{errors.surname}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formSignUpUsername">
                <Form.Label>Username</Form.Label>
                <InputGroup hasValidation>
                  <InputGroup.Text id="inputGroupPrependUsername"><img src={UsernameIcon} alt="person icon" /></InputGroup.Text>
                  <Form.Control type="text" placeholder="Enter unique username" value={username} onChange={e => setUsername(e.target.value)} isValid={validUsername} isInvalid={!validUsername}/>
                  <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formSignUpEmail">
                <Form.Label>Email address</Form.Label>
                <InputGroup hasValidation>
                  <InputGroup.Text id="inputGroupPrependEmail"><img src={AtIcon} alt="at icon" /></InputGroup.Text>
                  <Form.Control type="email" placeholder="Enter valid email" value={email} onChange={e => setEmail(e.target.value)} isValid={validEmail} isInvalid={!validEmail}/>
                  <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formSignUpPassword">
                <Form.Label>Password</Form.Label>
                <InputGroup hasValidation>
                  <InputGroup.Text id="inputGroupPrependPassword"><img src={AsteriskIcon} alt="asterisk icon" /></InputGroup.Text>
                  <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} isValid={validPassword} isInvalid={!validPassword} />
                  <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formSignUpRepeatedPassword">
                <Form.Label>Repeat password</Form.Label>
                <InputGroup hasValidation>
                  <InputGroup.Text id="inputGroupPrependRepeatedPassword"><img src={RepeatPasswordIcon} alt="repeat icon" /></InputGroup.Text>
                  <Form.Control type="password" placeholder="Repeat password" value={repeatedPassword} onChange={e => setRepeatedPassword(e.target.value)} isValid={validRepeatedPassword} isInvalid={!validRepeatedPassword} />
                  <Form.Control.Feedback type="invalid">{errors.repeatedPassword}</Form.Control.Feedback>
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

export default SignUp;