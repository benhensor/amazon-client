import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

export default function Addresses() {

	return (
		<PageContainer>
			<Page>
				<div className="breadcrumb">
					<Link to='/account' className="primary-link">Your Account</Link>
					<span>▸</span>
					<p>Under Construction</p>
				</div>
      <PageHeader>
        <h1>Under Construction</h1>
      </PageHeader>
			</Page>
		</PageContainer>
	)
}

const PageContainer = styled.div`
	background-color: var(--white);
	margin-bottom: 10rem;
`

const Page = styled.div`
	max-width: 100rem;
	margin: 0 auto;
	.breadcrumb {
		display: flex;
		align-items: center;
		gap: var(--spacing-xs);
		margin: var(--spacing-md) 0;
		font-size: var(--font-xs);
		p {
			color: var(--order-breadcrumb);
		}
		span {
			margin-bottom: 2px;
		}
	}
  
	@media only screen and (max-width: 1199px) {
		padding: var(--spacing-md);
	}
	@media only screen and (max-width: 450px) {
		padding: var(--spacing-sm);
	}
`

const PageHeader = styled.div`
	padding: var(--spacing-sm) 0;
`