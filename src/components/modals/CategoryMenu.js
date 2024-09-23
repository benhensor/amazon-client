import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllCategories } from '../../redux/slices/productsSlice';
import styled from 'styled-components';
import ProfileIcon from '../../icons/ProfileIcon';
import ChevronIcon from '../../icons/ChevronIcon'
import CloseIcon from '../../icons/CloseIcon';

export default function CategoryMenu({ menuOpen, closeMenu, onSearch }) {
	const dispatch = useDispatch();
	const { categories, status, error } = useSelector((state) => state.products);

	useEffect(() => {
		if (status === 'idle') {
			dispatch(fetchAllCategories());
		}
	}, [dispatch, status]);


	useEffect(() => {
		// Disable scroll when modal is open
		if (menuOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'auto'; // Restore scroll
		}

		// Cleanup function to restore scroll on unmount
		return () => {
			document.body.style.overflow = 'auto';
		};
	}, [menuOpen])


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
          <p>Shop by Department</p>
        </Heading>
				<ul>
					{categories.map((category, i) => (
						<li key={i}
							onClick={() => onSearch(category.name)}
						>
							<p>
								{category.name}
							</p>
							<ChevronIcon
								direction='right'
							/>				
						</li>
					))}
				</ul>
				{status === 'loading' && <p>Loading categories...</p>}
				{error && <p>Error loading categories: {error}</p>}
			</CategoryMenuContainer>
		</>
	);
}

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
`;

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
  ul {
	}
	li {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		padding: calc(var(--spacing-sm) + .5rem) var(--spacing-lg);
    font-size: var(--font-sm);
		cursor: pointer;
		p {
			color: var(--black);
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

  @media only screen and (max-width: 450px) {
    width: 100%;
  }

`;

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
`;

const Heading = styled.div`
  padding: var(--spacing-md) var(--spacing-lg);
  background-color: var(--lt-blue);
  p {
    font-size: var(--font-lg);
    font-weight: bold;
    color: var(--dk-blue);
  }
`;