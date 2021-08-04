import styled from 'styled-components';
import { Modal, Button } from 'react-bootstrap';

export const SignModal = styled(Modal)`
  backdrop-filter: grayscale(.8) blur(5px);
  background-color: rgba(255, 255, 255, .25);

  .modal-content {
    color: white;
    background-color: rgba(0, 0, 0, .8);
    box-shadow: 0 0 5px white;
  }

  .btn-close { 
    filter: invert(100); 
    
    &:hover {
      filter: invert(100) drop-shadow(0 0 5px white);
    }
  }

  strong {
    color: #ECD900;
    text-transform: uppercase;
  }
`;

export const SWButton = styled(Button)`
  background-color: #ECD900;
  color: black;
  font-weight: bold;
  border: none;
  text-transform: uppercase;
  box-shadow: 0 0 10px rgba(236, 217, 0, .9);

  &:not(first-of-type) { margin-left: 1em; }

  &:hover, &:focus { 
    background-color: rgba(236, 217, 0, .5);
    box-shadow: none;
  }
`;