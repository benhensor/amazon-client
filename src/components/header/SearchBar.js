import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCategoryList } from '../../redux/slices/productsSlice'
import formatQuery from '../../utils/formatQuery'
import SearchIcon from '../../icons/SearchIcon'
import { SearchbarContainer } from '../../assets/styles/HeaderStyles'

export default function SearchBar({ onSearch }) {
	const dispatch = useDispatch()
	const { categoryList, status, error } = useSelector(
		(state) => state.products
	)

	const [localSearchTerm, setLocalSearchTerm] = useState('')
	const [localCategory, setLocalCategory] = useState('All')
	const selectRef = useRef(null)
	const spanRef = useRef(null)

	useEffect(() => {
		if (status === 'idle') {
			dispatch(fetchCategoryList())
		}
	}, [dispatch, status])

	useEffect(() => {
		if (spanRef.current && selectRef.current) {
			spanRef.current.textContent =
				selectRef.current.options[selectRef.current.selectedIndex].text
			selectRef.current.style.width = `${
				spanRef.current.offsetWidth + 36
			}px`
		}
	}, [localCategory])

	const handleCategoryChange = (e) => {
		setLocalCategory(e.target.value)
	}

	const handleSearchChange = (e) => {
		setLocalSearchTerm(e.target.value)
	}

	const handleSubmit = (e) => {
		e.preventDefault()

		if (localSearchTerm.trim()) {
			onSearch(localSearchTerm, localCategory)
			setLocalSearchTerm('')
		}
	}

	return (
		<SearchbarContainer onSubmit={handleSubmit}>
			<span
				ref={spanRef}
				style={{
					visibility: 'hidden',
					whiteSpace: 'nowrap',
					position: 'absolute',
				}}
			></span>

			<label htmlFor="category" className="sr-only"></label>
			<select
				id="category"
				name="category"
				value={localCategory}
				onChange={handleCategoryChange}
				ref={selectRef}
			>
				<option value="All">All</option>
				{categoryList &&
					categoryList.length > 0 &&
					categoryList.map((category, i) => (
						<option key={i} value={category}>
							{formatQuery(category)}
						</option>
					))}
			</select>

			<input
				id="search"
				name="search"
				type="text"
				placeholder="Search Amazon"
				value={!error ? localSearchTerm : 'Error fetching categories'}
				onChange={handleSearchChange}
			/>
			<button 
				aria-label="Search"
				type="submit"
			>
				<SearchIcon />
			</button>
		</SearchbarContainer>
	)
}
