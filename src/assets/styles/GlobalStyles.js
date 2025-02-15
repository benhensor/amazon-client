import styled, { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`

  :root {

    ::-webkit-scrollbar {display: none;}

    font-size: 62.5%;

    // Colors
    --white: #fff;
    --black: #221F1F;
    --background-grey: #E3E6E6;
    --checkout-grey: #F8F8F8;
    --continue-grey: #F7F7F7;
    --secondary-hover: #F7F7F7;
    --qty-select-grey: #F0F2F2;
    --order-header-grey: #F0F2F2;
    --lt-grey: #E6E6E6;
    --lt-grey-hover: #D4D4D4;
    --border-grey: #D5D9D9;
    --cat-menu-hover: #EAEDED;
    --lt-text: #767676;
    --md-grey:#8A9899;
    --paleblue: #37475A;
    --paleblue-hover: #485769;
    --md-blue: #232F3E;
    --dk-blue: #131921;
    --dk-blue-50: #13192150;
    --yellow: #FFD814;
    --yellow-hover: #F7CA00;
    --primary-yellow: #FFD814;
    --primary-yellow-hover: #F7CA00;
    --lt-orange: #FEBD69;
    --lt-orange-hover: #F3A847;
    --md-orange: #F08804;
    --bin-orange: #FFA41C;
    --bin-orange-hover: #FA8900; 
    --dk-orange: #C45500; 
    --price-red: #B12704;
    --link-blue: #007185;
    --link-hover: #C7511F;
    --prime-blue: #1399ff;
    --basket-total: #91F6FE;
    --prime-orange: #F8991D;
    --active-payment-method: #FF8F00;
    --inactive-payment-method: #E0E1E1;
    --link-white-hover: #F7FAFA;
    --star-rating: #DF7921;
    --discount-red: #CC0C39;
    --highlight-red: #E5061D;
    --order-header: #F0F2F2;
    --stock-green: #007600;
    --input-focus: #c8f3fa;
    --input-focus-border: #75B1BB;
    --input-focus-bg: #E8F0FE;
    --signin-link: #0066C0;
    --checkbox-bg: #007185;
    --checkbox-hover: #1196AB;
    --input-error: #CC0C39;
    --account-link-hover: #CA5B2C;
    --account-imgBG: #B8DDE1;
    --order-breadcrumb: #C55804;
    --order-search-btn-bg: #303333;
    --order-search-btn-bg-hover: #0F1111;
    --def-address-green: #067D62;
    --autofill-border: #50C4D9;
    --autofill-gradient: linear-gradient(90deg, #ECFDFF 0%, #C9F3FA 100%);
    --scrollbar-thumb: #969999;
    --scrollbar-thumb-hover: #6F7373;
    --default-green: #ADE422;

    // spacing
    --spacing-xxs: .2rem;
    --spacing-xs: .4rem;
    --spacing-ms: .6rem;
    --spacing-sm: .8rem;
    --spacing-md: 1.6rem;
    --spacing-lg: 2.4rem;
    --spacing-xl: 3.2rem;
    --spacing-xxl: 4rem;

    // font-sizes
    --font-xxs: 1rem;
    --font-xs: 1.2rem;
    --font-sm: 1.4rem;
    --font-md: 1.6rem;
    --font-lg: 1.8rem;
    --font-xl: 2.4rem;
    --font-xxl: 3.2rem;
    --font-xxxl: 4rem;
    --font-cta: clamp(1rem, 3vw, 5rem);

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
    user-select: none;
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
    background: transparent;
    transition: var(--tr-fast);
  }

  img {
    max-width: 100%;
    height: auto;
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
    border: 0;
  }

  .auth-link {
    font-size: var(--font-xs);
    color: var(--signin-link);
    transition: var(--tr-fast);
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }

  .primary-link {
    color: var(--link-blue);
    transition: var(--tr-fast);
    cursor: pointer;
    &:hover {
      color: var(--link-hover);
      text-decoration: underline;
    }
  }

  .auth-btn {
    box-shadow: 0 2px 5px 0 rgba(213, 217, 217, 0.5);
    width: 100%;
  }

  .primary-btn, .secondary-btn {
    padding: var(--spacing-sm) var(--spacing-md);
	  border-radius: var(--br-md);
    font-size: clamp(var(--font-xs), 2vw, var(--font-sm));
  }

  .primary-btn {
    background-color: var(--primary-yellow);
    color: var(--black);
    &:hover {
      background-color: var(--primary-yellow-hover);
    }
  }

  .secondary-btn {
    border: 1px solid var(--border-grey);
    background-color: var(--white);
    color: var(--black);
    &:hover {
      background-color: var(--secondary-hover);
    }
  }

  .pill-btn {
    border-radius: var(--br-25);
    width: 100%;
  }

  @media only screen and (max-width: 450px) {
    section {
      margin: 0 var(--spacing-sm);
    }
  }
`
export const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  font-size: var(--font-lg);
  color: var(--black);

  .loader {
    display: inline-block;
    width: 80px;
    height: 80px;
  }

  .loader:after {
    content: " ";
    display: block;
    width: 64px;
    height: 64px;
    margin: 8px;
    border-radius: 50%;
    border: 6px solid var(--black);
    border-color: var(--black) transparent var(--black) transparent;
    animation: loader 1.2s linear infinite;
  }

  @keyframes loader {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @media only screen and (max-width: 450px) {
    font-size: var(--font-md);
  }
`

export default GlobalStyles
