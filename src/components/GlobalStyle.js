import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    * {
        font-family: 'Dosis', sans-serif;
    }

    body {
        background-color: black !important;
    }

    a.nav-link {
        text-transform: uppercase;
    }

    .main-nav {
        border-top: 1px solid rgba(255, 255, 255, .5);
        border-bottom: 1px solid rgba(255, 255, 255, .5);

        & > nav {
            padding-top: 0;
            padding-bottom: 0;
        }
        
        ul li {
            border-right: 1px solid rgba(255, 255, 255, .5);

            &:first-of-type { border-left: 1px solid rgba(255, 255, 255, .5); }

            & a.active { border-bottom: 5px solid #0066ff; }
        }
    }
`;  