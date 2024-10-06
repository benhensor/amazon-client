import React from 'react'
import FilterIcon from '../../icons/FilterIcon'
import styled from 'styled-components'

export default function PageHeader({
	products,
	heading,
	filtersOpen,
	setFiltersOpen,
}) {
	return (
		<PageHeaderContainer>
			<PageHeaderContent>
				{products.length > 0 && (
					<>
						<PageHeaderText>{heading}</PageHeaderText>
						<MobileFilterToggle
							onClick={() => setFiltersOpen(!filtersOpen)}
						>
							Filters <FilterIcon />
						</MobileFilterToggle>
					</>
				)}
			</PageHeaderContent>
		</PageHeaderContainer>
	)
}

const PageHeaderContainer = styled.div`
	position: sticky;
	top: 0;
	background-color: var(--white);
	border-bottom: 1px solid var(--lt-grey);
	z-index: 10;
`

const PageHeaderContent = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
	padding: var(--spacing-sm) var(--spacing-md);

	@media only screen and (max-width: 768px) {
		padding: var(--spacing-sm);
	}
`

const PageHeaderText = styled.h1`
	line-height: 3rem;
	color: var(--dk-blue);
`

const MobileFilterToggle = styled.button`
	display: none;
	align-items: center;
	gap: var(--spacing-xs);
	padding: var(--spacing-xs) var(--spacing-sm);
	background: none;
	border: 1px solid var(--lt-grey);
	border-radius: 4px;
	cursor: pointer;

	@media only screen and (max-width: 768px) {
		display: flex;
	}
`
