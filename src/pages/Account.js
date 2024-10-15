import React from 'react'
import { accountOptions, accountLinks } from '../utils/accountOptions'
import styled from 'styled-components'

export default function Account() {
	const AccountOption = ({ option }) => {
		return (
			<Option>
				<OptionContainer>
					<OptionImage>
						<img src={option.image} alt={option.title} />
					</OptionImage>
					<OptionDetails>
						<h3>{option.title}</h3>
						<p>{option.text}</p>
					</OptionDetails>
				</OptionContainer>
			</Option>
		)
	}

	const AccountList = ({ list }) => {
		return (
			<List>
				<h3>{list.title}</h3>
				<ul>
					{list.links.map((link, i) => (
						<li key={i}>
							<span>{link}</span>
						</li>
					))}
				</ul>
			</List>
		)
	}

	return (
		<AccountPage>
			<PageContainer>
				<PageHeader>
					<h1>Your Account</h1>
				</PageHeader>
				<LayoutGrid>
					{accountOptions.map((option, i) => (
						<AccountOption key={i} option={option} />
					))}
				</LayoutGrid>
				<Divider><hr /></Divider>
				<LayoutGrid>
					{accountLinks.map((list, i) => (
						<AccountList key={i} list={list} />
					))}
				</LayoutGrid>
			</PageContainer>
		</AccountPage>
	)
}

const AccountPage = styled.section`
	background-color: var(--white);
  margin-bottom: 10rem;
`

const PageContainer = styled.div`
	max-width: 120rem;
	margin: 0 auto;
`

const PageHeader = styled.div`
	padding: var(--spacing-sm) 0;
`

const LayoutGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(30rem, 1fr));
	gap: var(--spacing-lg);
`

const Option = styled.div`
	border: 1px solid var(--border-grey);
  border-radius: var(--br-lg);
`

const OptionContainer = styled.div`
	display: flex;
	padding: var(--spacing-md);
`

const OptionImage = styled.div`
	margin-right: var(--spacing-sm);
	border-radius: var(--br-50);
	overflow: hidden;
  max-width: 7rem;
  max-height: 7rem;
	img {
    width: 100%;
  
    object-fit: cover;
	}
`

const OptionDetails = styled.div`
	h3 {
		margin-bottom: var(--spacing-sm);
	}
  p {
    color: var(--grey);
  }
`

const Divider = styled.div`
  margin: var(--spacing-xl) 0;
  hr {
    border: none;
    border-top: 1px solid var(--border-grey);
  }
`

const List = styled.div`
	padding: var(--spacing-md);
  border: 1px solid var(--border-grey);
  border-radius: var(--br-lg);
	h3 {
		margin-bottom: var(--spacing-sm);
	}
	ul {
		li {
			display: flex;
			justify-content: space-between;
      font-size: var(--font-sm);
      span {
        color: var(--link-blue);
        cursor: pointer;
        transition: var(--tr-fast);
        &:hover {
          text-decoration: underline;
        }
      }
		}
	}
`
