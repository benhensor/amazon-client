import styled from 'styled-components'

export const DepartmentContainer = styled.div`
	display: flex;
	flex-direction: column;
`

export const Content = styled.div`
	display: flex;
	background-color: var(--white);

	@media only screen and (max-width: 768px) {
		flex-direction: column;
	}
`

export const MainContent = styled.main`
	flex: 1;
	padding: var(--spacing-sm);
	background-color: var(--white);

	@media only screen and (max-width: 768px) {
		padding: var(--spacing-sm);
	}
`

export const ResultCount = styled.p`
	margin-bottom: var(--spacing-sm);
	font-size: var(--font-sm);
	color: var(--md-grey);
	padding-left: var(--spacing-sm);
`
