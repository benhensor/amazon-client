import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCategoryList, setSelectedCategory, clearSearchTerm } from '../../redux/slices/productsSlice'
import styled from 'styled-components'
import SearchIcon from '../../icons/SearchIcon'

export default function SearchBar({ onSearch }) {
  const dispatch = useDispatch()
  const { categories, status, error, selectedCategory, shouldClearSearch } = useSelector((state) => state.products)

  const [localSearchTerm, setLocalSearchTerm] = useState('')
  const selectRef = useRef(null)
  const spanRef = useRef(null)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCategoryList())
    }
  }, [dispatch, status])

  useEffect(() => {
    if (shouldClearSearch) {
      setLocalSearchTerm('')
      dispatch(clearSearchTerm())
    }
  }, [shouldClearSearch, dispatch])

  useEffect(() => {
    if (spanRef.current && selectRef.current) {
      spanRef.current.textContent =
        selectRef.current.options[selectRef.current.selectedIndex].text
      selectRef.current.style.width = `${
        spanRef.current.offsetWidth + 36
      }px`
    }
  }, [selectedCategory])

  const handleCategoryChange = (e) => {
    dispatch(setSelectedCategory(e.target.value))
  }

  const handleSearchChange = (e) => {
    setLocalSearchTerm(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (localSearchTerm.trim()) {
      onSearch(localSearchTerm, selectedCategory)
    }
  }

  return (
    <Container onSubmit={handleSubmit}>
      <span
        ref={spanRef}
        style={{
          visibility: 'hidden',
          whiteSpace: 'nowrap',
          position: 'absolute',
        }}
      ></span>

      <select
        name="category"
        value={selectedCategory}
        onChange={handleCategoryChange}
        ref={selectRef}
      >
        <option value="All">All</option>
        {categories.map((category, i) => (
          <option key={i} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>

      <input 
        type="text" 
        placeholder="Search Scamazon" 
        value={!error ? localSearchTerm : 'Error fetching categories'}
        onChange={handleSearchChange}
      />
      <button type="submit">
        <SearchIcon />
      </button>
    </Container>
  )
}

const Container = styled.form`
	flex: 1;
	display: flex;
	align-items: center;
	background-color: var(--white);
	color: var(--dk-blue);
	height: 4rem;
	border-radius: var(--br-sm);
	overflow: hidden;
	select {
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
    @media only screen and (max-width: 768px) {
      display: none;
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
  @media only screen and (max-width: 768px) {
    margin-right: 0;
  }
`
