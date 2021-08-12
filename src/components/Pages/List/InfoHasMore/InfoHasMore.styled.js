import styled from 'styled-components';
import { ToastContainer, Toast } from 'react-bootstrap';

export const InfoContainer = styled(ToastContainer)`
    bottom: 0 !important;
    right: 0 !important;
    position: fixed !important;
`;

export const Info = styled(Toast)`
    opacity: .75;

    .toast-header { 
        justify-content: space-between;

        img {
            background-color: #0ECAF0;
            padding: .5em;
            border-radius: 50%;
        }

        p { 
            margin: 0; 
            font-size: 1.2em;
            color: black;
        }
    }

    .toast-body p:last-of-type { margin-bottom: 0; }

    &:hover { opacity: 1; }
`;