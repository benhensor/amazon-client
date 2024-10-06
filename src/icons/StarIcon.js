import React from 'react';
import styled from 'styled-components';

export default function StarIcon({ type }) {
  const renderStar = () => {
    switch (type) {
      case 'empty':
        return (
          <StarEmpty viewBox="0 0 512 512">
            <path d="M480 208H308L256 48L204 208H32L172 304L118 464L256 364L394 464L340 304L480 208Z" />
          </StarEmpty>
        );
      case 'half':
        return (
          <StarHalf viewBox="0 0 512 512">
            <path d="M480,208H308L256,48,204,208H32l140,96L118,464,256,364,394,464,340,304Z" />
            <polygon points="256 48 256 364 118 464 172 304 32 208 204 208 256 48" />
          </StarHalf>
        );
      case 'full':
      default:
        return (
          <StarFull viewBox="0 0 512 512">
            <path d="M394,480a16,16,0,0,1-9.39-3L256,383.76,127.39,477a16,16,0,0,1-24.55-18.08L153,310.35,23,221.2A16,16,0,0,1,32,192H192.38l48.4-148.95a16,16,0,0,1,30.44,0l48.4,149H480a16,16,0,0,1,9.05,29.2L359,310.35l50.13,148.53A16,16,0,0,1,394,480Z" />
          </StarFull>
        );
    }
  };

  return <StarIconContainer>{renderStar()}</StarIconContainer>;
}

const StarIconContainer = styled.div`
  width: 1.8rem; 
  height: 1.8rem;

  @media only screen and (max-width: 768px) {
    width: 1.6rem; 
    height: 1.6rem; 
  }
  @media only screen and (max-width: 450px) {
    width: 1.2rem; 
    height: 1.2rem; 
  }
`;

const StarEmpty = styled.svg`
  width: 100%;
  height: 100%;
  fill: none;
  stroke: var(--star-rating);
  stroke-width: 32;
  stroke-linejoin: round;
`;

const StarHalf = styled.svg`
  width: 100%;
  height: 100%;
  fill: var(--star-rating);
  stroke: var(--star-rating);
  stroke-linejoin: round;
  stroke-width: 32px;
`;

const StarFull = styled.svg`
  width: 100%;
  height: 100%;
  fill: var(--star-rating);
  stroke: var(--star-rating);
`;