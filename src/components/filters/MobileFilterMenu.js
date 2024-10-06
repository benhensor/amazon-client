import React from 'react'
import styled from 'styled-components'

export default function MobileFilterMenu({
  filters,
  selectedFilters,
  handleFilterChange,
  filtersOpen,
  setFiltersOpen,
}) {
	return (
		<>
			{/* Mobile Filter Menu */}
			<FilterMenu $isOpen={filtersOpen}>
				<MobileMenuHeader>
					<h2>Filters</h2>
					<CloseButton onClick={() => setFiltersOpen(false)}>
						×
					</CloseButton>
				</MobileMenuHeader>
				<FilterSectionContent>
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
											handleFilterChange(
												filterType,
												value
											)
										}
									/>
									{value}
								</FilterOption>
							))}
							<Separator />
						</FilterGroup>
					))}
				</FilterSectionContent>
			</FilterMenu>

			{/* Overlay for mobile menu */}
			{filtersOpen && <Overlay onClick={() => setFiltersOpen(false)} />}
		</>
	)
}

const FilterMenu = styled.div`
	display: none;
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100vh;
	background-color: var(--white);
	transform: translateY(${(props) => (props.$isOpen ? '0' : '-100%')});
	transition: transform 0.3s ease-in-out;
	z-index: 1000;
	overflow-y: auto;

	@media only screen and (max-width: 768px) {
		display: block;
	}
`

const MobileMenuHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: var(--spacing-sm) var(--spacing-md);
	border-bottom: 1px solid var(--lt-grey);

	h2 {
		font-size: var(--font-lg);
		color: var(--dk-blue);
	}
`

const CloseButton = styled.button`
	background: none;
	border: none;
	font-size: var(--font-xl);
	color: var(--dk-blue);
	cursor: pointer;
`

const Overlay = styled.div`
	display: none;

	@media only screen and (max-width: 768px) {
		display: block;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 999;
	}
`

const FilterSectionContent = styled.div`
	padding: var(--spacing-md) var(--spacing-sm);

	> p {
		font-weight: bold;
		margin-bottom: var(--spacing-xs);
		color: var(--dk-blue);
	}
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
