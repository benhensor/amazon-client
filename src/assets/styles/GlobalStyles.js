import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap');

  :root {

    ::-webkit-scrollbar {display: none;}

    font-size: 62.5%;

    // Colors
    --white: #fff;
    --black: #221F1F;
    --lt-grey: #E6E6E6;
    --lt-grey-hover: #D4D4D4;
    --md-grey: ##666666;
    --paleblue: #37475A;
    --paleblue-hover: #485769;
    --md-blue: #232F3E;
    --dk-blue: #131921;
    --yellow: #FFD814;
    --yellow-hover: #F7CA00;
    --lt-orange: #FEBD69;
    --lt-orange-hover: #F3A847;
    --md-orange: #F08804;
    --dk-orange: #C45500;
    --price-red: #B12704;
    --link-blue: #007185;
    --link-hover: #C7511F;
    --link-white-hover: #F7FAFA;
    --star-rating: #DF7921;
    --discount-red: #CC0C39;
    --highlight-red: #E5061D;
    --order-header: #F0F2F2;

    // spacing
    --spacing-xs: .4rem;
    --spacing-sm: .8rem;
    --spacing-md: 1.6rem;
    --spacing-lg: 2.4rem;
    --spacing-xl: 3.2rem;

    // font-sizes
    --font-xs: 1.2rem;
    --font-sm: 1.4rem;
    --font-md: 1.6rem;
    --font-lg: 1.8rem;
    --font-xl: 2.0rem;
    --font-xxl: 2.2rem;

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
    --tr-fast: .12s;
    --tr-medium: .3s;
    --tr-slow: .6s;
    
  }

  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {}

  body {
    font-family: 'Open Sans', sans-serif;
    font-size: 1.6rem;
    line-height: 1.5;
    color: var(--black);
    background-color: var(--white);
  }

`

export default GlobalStyles;