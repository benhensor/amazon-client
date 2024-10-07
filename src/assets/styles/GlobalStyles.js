import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`

  :root {

    ::-webkit-scrollbar {display: none;}

    font-size: 62.5%;

    // Colors
    --white: #fff;
    --black: #221F1F;
    --background-grey: #E3E6E6;
    --lt-grey: #E6E6E6;
    --lt-grey-hover: #D4D4D4;
    --cat-menu-hover: #EAEDED;
    --md-grey:#8A9899;
    --paleblue: #37475A;
    --paleblue-hover: #485769;
    --md-blue: #232F3E;
    --dk-blue: #131921;
    --dk-blue-50: #13192150;
    --yellow: #FFD814;
    --yellow-hover: #F7CA00;
    --lt-orange: #FEBD69;
    --lt-orange-hover: #F3A847;
    --md-orange: #F08804;
    --dk-orange: #C45500;
    --price-red: #B12704;
    --link-blue: #007185;
    --link-hover: #C7511F;
    --crime-blue: #2193C2;
    --crime-orange: #F8991D;
    --link-white-hover: #F7FAFA;
    --star-rating: #DF7921;
    --discount-red: #CC0C39;
    --highlight-red: #E5061D;
    --order-header: #F0F2F2;

    // spacing
    --spacing-xs: .4rem;
    --spacing-ms: .6rem;
    --spacing-sm: .8rem;
    --spacing-md: 1.6rem;
    --spacing-lg: 2.4rem;
    --spacing-xl: 3.2rem;

    // font-sizes
    --font-xxs: 1rem;
    --font-xs: 1.2rem;
    --font-sm: 1.4rem;
    --font-md: 1.6rem;
    --font-lg: 1.8rem;
    --font-xl: 2.4rem;
    --font-xxl: 3.2rem;
    --font-xxxl: 4rem;
    --font-cta: clamp(2rem, 5vw, 5rem);

    // line-heights
    --lh-xs: 1.2rem;
    --lh-sm: 1.4rem;
    --lh-md: 1.6rem;
    --lh-lg: 1.8rem;
    --lh-xl: 2.0rem;
    --lh-xxl: 2.2rem;

    // border-radius
    --br-sm: .4rem;
    --br-md: .8rem;
    --br-lg: 1.2rem;
    --br-xl: 1.6rem;
    --br-25: 2.5rem;
    --br-50: 50%;

    // transitions
    --tr-fast: all .12s ease-in-out;
    --tr-medium: all .3s ease-in-out;
    --tr-slow: all .6s ease-in-out;
    
  }

  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    height: 100vh;
  }

  body {
    font-family: 'Open Sans', sans-serif;
    font-size: 1.6rem;
    line-height: 1.5;
    color: var(--black);
  }

  main {
    width: 100vw;
    background: var(--background-grey);
  }

  section {
    margin: 0 var(--spacing-md);
  }

  aside {
    height: 100vh;
    border-right: 1px solid var(--lt-grey);
  }

  ul {
    list-style-type: none;
  }

  h1 {
    font-size: clamp(var(--font-lg), 3vw, var(--font-xxl));
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    cursor: pointer;
    border: none;
    background-color: transparent;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  @media only screen and (max-width: 450px) {
    section {
      margin: 0 var(--spacing-sm);
    }
  }

`

export default GlobalStyles;