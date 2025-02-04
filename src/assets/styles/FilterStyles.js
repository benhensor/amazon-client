import styled from 'styled-components'


export const FilterMenu = styled.div`
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

export const MobileMenuHeader = styled.div`
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

export const CloseButton = styled.button`
	background: none;
	border: none;
	font-size: var(--font-xl);
	color: var(--dk-blue);
	cursor: pointer;
`

export const Overlay = styled.div`
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

export const FilterSectionContent = styled.div`
	padding: var(--spacing-md) var(--spacing-sm);

	> p {
		font-weight: bold;
		margin-bottom: var(--spacing-xs);
		color: var(--dk-blue);
	}
`

export const SortingControls = styled.div`
	margin-top: var(--spacing-md);
	display: flex;
	flex-direction: column;
	gap: var(--spacing-md);
`

export const FilterGroup = styled.div`
	margin-bottom: var(--spacing-md);
`

export const FilterType = styled.p`
	font-weight: bold;
	margin-bottom: var(--spacing-xs);
	color: var(--dk-blue);
`

export const FilterOption = styled.label`
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

export const Separator = styled.hr`
	margin: var(--spacing-md) 0;
	border: 0.5px solid var(--lt-grey);
`


export const DesktopSidebar = styled.aside`
	position: sticky;
	top: 4.6rem;
	min-width: 25rem;
	height: calc(100vh - 60px);
	border-right: 1px solid var(--lt-grey);
	background-color: var(--white);
	overflow-y: auto;

	@media only screen and (max-width: 768px) {
		display: none;
	}
`

export const SectionContent = styled.div`
	padding: var(--spacing-md) var(--spacing-md);

	> p {
		font-weight: bold;
		margin-bottom: var(--spacing-xs);
		color: var(--dk-blue);
	}
`
