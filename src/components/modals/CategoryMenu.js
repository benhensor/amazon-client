import React, { useEffect, useCallback } from 'react'
import {
	fashionAndAccessoriesCategory,
	beautyAndPersonalCareCategory,
	electronicsAndTechnologyCategory,
	groceriesCategory,
	homeAndLivingCategory,
	automotiveAndVehiclesCategory,
	sportsAndOutdoorCategory,
} from '../../utils/superCategories'
import styled from 'styled-components'
import ProfileIcon from '../../icons/ProfileIcon'
import ChevronIcon from '../../icons/ChevronIcon'
import CloseIcon from '../../icons/CloseIcon'

export default function CategoryMenu({ menuOpen, closeMenu, onSearch }) {

	const categoryGroups = [
		{ title: 'Fashion & Accessories', categories: fashionAndAccessoriesCategory },
		{ title: 'Beauty & Personal Care', categories: beautyAndPersonalCareCategory },
		{ title: 'Consumer Electronics', categories: electronicsAndTechnologyCategory },
		{ title: 'Groceries', categories: groceriesCategory },
		{ title: 'Home & Living', categories: homeAndLivingCategory },
		{ title: 'Automotive & Vehicles', categories: automotiveAndVehiclesCategory },
		{ title: 'Sports & Outdoors', categories: sportsAndOutdoorCategory },
	]

	useEffect(() => {
		// Prevent scroll when menu is open
		document.body.style.overflow = menuOpen ? 'hidden' : 'auto'
		return () => {
			document.body.style.overflow = 'auto'
		}
	}, [menuOpen])

	// Memoize the formatCategory function for optimization
	const formatCategory = useCallback((category) => {
		return category
			.split('-')
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' ')
	}, [])

	// Extract Department component for each category group
	const renderDepartments = () =>
		categoryGroups.map(({ title, categories }, i) => (
			<Department key={i} title={title} categories={categories} formatCategory={formatCategory} onSearch={onSearch} />
		))

		return (
			<>
				<ModalBackground $menuOpen={menuOpen} onClick={closeMenu} />
				<CategoryMenuContainer $menuOpen={menuOpen}>
					<CategoryMenuHeader>
						<ProfileIcon />
						<p>Hello...</p>
						<button onClick={closeMenu}>
							<CloseIcon />
						</button>
					</CategoryMenuHeader>
					<Heading>
						<h2>Shop by Department</h2>
					</Heading>
					{renderDepartments()}
				</CategoryMenuContainer>
			</>
		)
	}
	
	// Department component to handle each category section
	const Department = ({ title, categories, formatCategory, onSearch }) => (
		<DepartmentWrapper>
			<h3>{title}</h3>
			<ul>
				{categories.map((category, i) => (
					<li key={i} onClick={() => onSearch(category)}>
						<div>
							<p>{formatCategory(category)}</p>
							<ChevronIcon direction="right" />
						</div>
					</li>
				))}
			</ul>
		</DepartmentWrapper>
	)

const ModalBackground = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100vh;
	background: rgba(0, 0, 0, 0.7);
	z-index: 100;
	opacity: ${({ $menuOpen }) => ($menuOpen ? 1 : 0)};
	visibility: ${({ $menuOpen }) => ($menuOpen ? 'visible' : 'hidden')};
	transition: var(--tr-medium);
`

const CategoryMenuContainer = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	height: 100vh;
	width: 40rem;
	background-color: var(--white);
	z-index: 99999;
	overflow-y: auto;
	transform: ${({ $menuOpen }) =>
		$menuOpen ? 'translateX(0)' : 'translateX(-100%)'};
	opacity: ${({ $menuOpen }) => ($menuOpen ? 1 : 0)};
	transition: var(--tr-medium);

	@media only screen and (max-width: 450px) {
		width: 100%;
	}
`

const CategoryMenuHeader = styled.div`
	display: flex;
	align-items: center;
	padding: var(--spacing-md) var(--spacing-lg);
	background-color: var(--md-blue);
	position: relative;
	p {
		font-size: var(--font-lg);
		font-weight: bold;
		margin-left: var(--spacing-sm);
	}
	button {
		display: flex;
		align-items: center;
		justify-content: center;
		border: none;
		background-color: transparent;
		position: absolute;
		right: var(--spacing-lg);
	}
`

const Heading = styled.div`
	padding: var(--spacing-md) var(--spacing-lg);
	background-color: var(--lt-blue);
	border-bottom: 1px solid var(--lt-grey-hover);
	h2 {
		font-size: clamp(var(--font-md), 2vw, var(--font-lg));
		font-weight: bold;
		color: var(--dk-blue);
	}
`

const DepartmentWrapper = styled.div`
	padding: var(--spacing-md) 0;
	border-bottom: 1px solid var(--lt-grey-hover);
	h3 {
		padding: var(--spacing-sm) var(--spacing-lg);
		font-size: clamp(var(--font-sm), 2vw, var(--font-md));
		font-weight: bold;
		color: var(--black);
	}
	ul {
	}
	li {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		font-size: var(--font-sm);
		cursor: pointer;
		div {
			width: 100%;
			padding: var(--spacing-sm) var(--spacing-md);
			display: flex;
			justify-content: space-between;
		}
		p {
			font-size: var(--font-sm);
			color: var(--dk-blue);
			padding: var(--spacing-sm) var(--spacing-md);
		}
		svg {
			path {
				stroke: var(--md-grey);
			}
		}
		&:hover {
			background-color: var(--cat-menu-hover);
			svg {
				path {
					stroke: var(--black);
				}
			}
		}
	}
	a {
		color: var(--black);
		text-decoration: none;
	}
`
