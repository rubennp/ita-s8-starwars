import styled from 'styled-components';
import { Modal } from 'react-bootstrap';

export const SignModal = styled(Modal)`
  backdrop-filter: grayscale(.75) blur(5px);
  background-color: rgba(255, 255, 255, .25);

  .modal-content {
    color: white;
    background-color: rgba(0, 0, 0, .8);
    box-shadow: 0 0 5px white;
  }

  .btn-close { filter: invert(100); }

  strong {
    color: #ECD900;
    text-transform: uppercase;
  }
`;