import React from 'react'
import SortingBtn from '../buttons/SortingBtn'
import {
	FilterMenu,
	MobileMenuHeader,
	CloseButton,
	Overlay,
	FilterSectionContent,
	FilterType,
	FilterGroup,
	FilterOption,
	Separator,
	SortingControls,
} from '../../assets/styles/FilterStyles'

export default function MobileFilterMenu({
  filters,
  selectedFilters,
  handleFilterChange,
  filtersOpen,
  setFiltersOpen,
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
				<FilterSectionContent>
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
			</FilterSectionContent>
			</FilterMenu>

			{/* Overlay for mobile menu */}
			{filtersOpen && <Overlay onClick={() => setFiltersOpen(false)} />}
		</>
	)
}
