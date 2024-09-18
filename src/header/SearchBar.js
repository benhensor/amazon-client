import React from 'react'
import styled from 'styled-components'
import SearchIcon from '../icons/SearchIcon'

export default function SearchBar() {
  return (
    <Container>
      <select name="" id="">
        <option value="All">All</option>
        <option value="Electronics">Electronics</option>
        <option value="Books">Books</option>
        <option value="Clothing">Clothing</option>
        <option value="Home">Home</option>
        <option value="Toys">Toys</option>
      </select>
      <input type="text" placeholder="Search Scamazon.co.uk" />
      <button>
        <SearchIcon />
      </button>
    </Container>
  )
}

const Container = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  background-color: var(--white);
  color: var(--dk-blue);
  height: 4rem;
  border-radius: var(--br-md);
  overflow: hidden;
  margin-right: var(--spacing-md);
  select {
    width: 6rem;
    height: 100%;
    border: none;
    background-color: var(--lt-grey);
    font-size: var(--font-sm);
    padding: 0 var(--spacing-sm);
    outline: none;
    option {
      color: var(--yellow);
    }
    &:hover {
      background-color: var(--lt-grey-hover);
    }
  }
  input {
    flex: 1;
    height: 100%;
    border: none;
    padding-left: var(--spacing-sm);
    font-size: var(--font-md);
    &:focus {
      outline: none;
    }
  }
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background-color: var(--lt-orange);
    width: 5rem;
    height: 100%;
    &:hover {
      background-color: var(--lt-orange-hover);
    }
  }
`