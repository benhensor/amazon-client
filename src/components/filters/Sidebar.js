import React from 'react'
import SortingBtn from '../buttons/SortingBtn'
import styled from 'styled-components'

export default function Sidebar({
	filters,
	selectedFilters,
	handleFilterChange,
	handleSort,
	sortType,
	sortDirection,
}) {
	const getChevronDirection = (buttonType) => {
		if (sortType === buttonType) {
			return sortDirection === 'asc' ? 'up' : 'down'
		}
		return 'right' // default direction for inactive buttons
	}

	return (
		<DesktopSidebar>
			<SectionContent>
				<p>Filter by:</p>
				{Object.entries(filters).map(([filterType, values]) => (
					<FilterGroup key={filterType}>
						<FilterType>
							{filterType.charAt(0).toUpperCase() +
								filterType.slice(1)}
						</FilterType>
						{values.map((value) => (
							<FilterOption key={value}>
								<input
									type="checkbox"
									checked={selectedFilters[
										filterType
									]?.includes(value)}
									onChange={() =>
										handleFilterChange(filterType, value)
									}
								/>
								{value}
							</FilterOption>
						))}
						<Separator />
					</FilterGroup>
				))}
			</SectionContent>
			<SectionContent>
				<p>Sort by:</p>
				<SortingControls>
					<SortingBtn
						text="Price"
						onClick={() => handleSort('price')}
						isActive={sortType === 'price'}
						direction={getChevronDirection('price')}
					/>
					<SortingBtn
						text="Rating"
						onClick={() => handleSort('rating')}
						isActive={sortType === 'rating'}
						direction={getChevronDirection('rating')}
					/>
					<SortingBtn
						text="Discount"
						onClick={() => handleSort('discount')}
						isActive={sortType === 'discount'}
						direction={getChevronDirection('discount')}
					/>
				</SortingControls>
			</SectionContent>
		</DesktopSidebar>
	)
}

const DesktopSidebar = styled.aside`
	position: sticky;
	top: 4.6rem;
	width: 25rem;
	height: calc(100vh - 60px);
	border-right: 1px solid var(--lt-grey);
	background-color: var(--white);
	overflow-y: auto;

	@media only screen and (max-width: 768px) {
		display: none;
	}
`

const SectionContent = styled.div`
	padding: var(--spacing-md) var(--spacing-md);

	> p {
		font-weight: bold;
		margin-bottom: var(--spacing-xs);
		color: var(--dk-blue);
	}
`

const SortingControls = styled.div`
	margin-top: var(--spacing-md);
	display: flex;
	flex-direction: column;
	gap: var(--spacing-md);
`

const FilterGroup = styled.div`
	margin-bottom: var(--spacing-md);
`

const FilterType = styled.p`
	font-weight: bold;
	margin-bottom: var(--spacing-xs);
	color: var(--dk-blue);
`

const FilterOption = styled.label`
	display: flex;
	align-items: center;
	gap: var(--spacing-xs);
	cursor: pointer;
	font-size: var(--font-sm);
	margin-bottom: var(--spacing-xs);

	&:hover {
		color: var(--md-grey);
	}
`

const Separator = styled.hr`
	margin: var(--spacing-md) 0;
	border: 0.5px solid var(--lt-grey);
`
