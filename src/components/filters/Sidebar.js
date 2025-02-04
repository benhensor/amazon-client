import React from 'react'
import formatQuery from '../../utils/formatQuery'
import SortingBtn from '../buttons/SortingBtn'
import {
	DesktopSidebar,
	SectionContent,
	FilterGroup,
	FilterOption,
	Separator,
	SortingControls,
} from '../../assets/styles/FilterStyles'

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
			{Object.entries(filters).map(([filterType, values]) => (
				<SectionContent key={filterType}>
					{/* Handle the filter type and capitalize the first letter */}
					<h3>Filters</h3>
					<p>
						{filterType.charAt(0).toUpperCase() +
							filterType.slice(1)}
						:
					</p>
					{Array.isArray(values) ? (
						// If the filter values are an array (e.g., for category, tags, brands)
						<FilterGroup>
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
									{formatQuery(value)}
								</FilterOption>
							))}
							<Separator />
						</FilterGroup>
					) : (
						// If the filter values are an object (e.g., simulated filters)
						<FilterGroup>
							{Object.entries(values).map(
								([subFilterType, subValues]) => (
									<FilterOption key={subFilterType}>
										<p>{subFilterType}:</p>
										{subValues.map((subValue) => (
											<label key={subValue}>
												<input
													type="checkbox"
													checked={selectedFilters[
														subFilterType
													]?.includes(subValue)}
													onChange={() =>
														handleFilterChange(
															subFilterType,
															subValue
														)
													}
												/>
												{subValue}
											</label>
										))}
									</FilterOption>
								)
							)}
						</FilterGroup>
					)}
				</SectionContent>
			))}
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
