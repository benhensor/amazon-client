import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

export default function Orders() {
	return (
		<YourOrders>
			<div className="content">
				<div className="breadcrumb">
          <Link to='/account' className="primary-link">Your Account</Link>
          <span>▸</span>
          <p>Your Orders</p>
        </div>

				<div className="header">
					<h1>Your Orders</h1>
					<form action="">
						<input type="text" />
						<button>Search Orders</button>
					</form>
				</div>

				<div className="order-filters">
					<nav>
						<ul>
							<li className='primary-link'>Orders</li>
							<li className='primary-link'>Buy Again</li>
							<li className='primary-link'>Not Yet Dispatched</li>
							<li className='primary-link'>Local Store Orders</li>
							<li className='primary-link'>Cancelled Orders</li>
						</ul>
					</nav>
				</div>

				<div className="order-history">
					<p>(Number) orders placed in</p>
					<select name="" id="">
						<option value="">past three months</option>
						<option value="">past six months</option>
						<option value="">past year</option>
						<option value="">all time</option>
					</select>
				</div>

				<div className="order-list">
					<div className="order">

						<div className="order-header">
							<div className="order-header-item">
								<p>order placed</p>
								<p>(order date)</p>
							</div>
							<div className="order-header-item">
								<p>total</p>
								<p>(order total)</p>
							</div>
							<div className="order-header-item">
								<p>dispatch to</p>
								<p>(shipping address)</p>
							</div>
							<div className="order-header-item">
								<p>order #</p>
								<p>(order number)</p>
							</div>
						</div>

						<div className="order-body">

							<div>
                <div className="order-status">
                  <p>Delivered (date delivered)</p>
                </div>
                <div className="order-item">
                                <div className="order-item-details">
                                  <div className="order-item-image">
                                    <img src="" alt="" />
                                  </div>
                                  <div className="order-item-info">
                                    <p>Product name/description</p>
                                    <p>Return items: Eligible until (product.returnInfo)</p>
                                    <div className="order-buttons">
                                      <button>Buy it again</button>
                                      <button>View item</button>
                                    </div>
                                  </div>
                                </div>
                </div>
              </div>

							<div className="order-options">
								<button className='accent'>Problem with order</button>
								<button>Track package</button>
								<button>Return items</button>
								<button>Share gift receipt</button>
								<button>Leave seller feedback</button>
								<button>Write a product review</button>
							</div>

						</div>

            <div className="order-archive-btn">
              <button className="archive-btn primary-link">Archive order</button>
            </div>

					</div>
				</div>
			</div>

			<div>Buy it again</div>
		</YourOrders>
	)
}

const YourOrders = styled.div`
  background-color: var(--white);
  .content {
    max-width: 92rem;
    margin: 0 auto;
  }

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

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: var(--spacing-md) 0;

    form {
      display: flex;
      align-items: center;

      input {
        padding: var(--spacing-sm);
        border: 1px solid var(--border-grey);
        border-radius: var(--br-sm);
      }

      button {
        padding: var(--spacing-sm);
        background-color: var(--order-search-btn-bg);
        color: var(--white);
        border: none;
        border-radius: var(--br-25);
        margin-left: var(--spacing-sm);

        &:hover {
          background-color: var(--order-search-btn-bg-hover);
        }
      }
    }
  }

  .order-filters {
    padding: 0 var(--spacing-md);
    nav {
      font-size: clamp(var(--font-xs), 3vw, var(--font-sm));
      font-weight: 600;
      border-bottom: 1px solid var(--lt-grey);
      ul {
        display: flex;
        align-items: center;
        gap: var(--spacing-lg);
        li {
          padding: var(--spacing-ms);
          cursor: pointer;
        }
      }
    }
  }

  .order-history {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    margin: var(--spacing-md) 0;
    font-size: var(--font-xs);
    select {
      padding: var(--spacing-xs);
      border: 1px solid var(--border-grey);
      background-color: var(--lt-grey);
      border-radius: var(--br-md);
      font-size: var(--font-xs);
    }

  }

  .order-list {
    .order {
      border: 1px solid var(--border-grey);
      border-radius: var(--br-lg);
      overflow: hidden;

      .order-header {
        display: flex;
        background-color: var(--order-header-grey);
        padding: var(--spacing-md);
        border-bottom: 1px solid var(--lt-grey);

        .order-header-item {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          font-size: var(--font-xs);
          margin-right: var(--spacing-lg);
          p {
            &:first-child {
              text-transform: uppercase;
            }
          }
          &:last-child {
            margin-left: auto;
            margin-right: 0;
            align-items: flex-end;
          }
        }
      }

      .order-body {
        display: flex;
        padding: var(--spacing-md);
        border-bottom: 1px solid var(--border-grey);
        .order-status {
          p {
            font-weight: 600;
          }
        }

        .order-item {
          display: grid;
          grid-template-columns: 1fr 3fr;
          

          .order-item-details {
            display: flex;
            align-items: center;

            .order-item-image {
              img {
                max-width: 7rem;
                max-height: 7rem;
              }
            }

            .order-item-info {
              p {
                margin: var(--spacing-sm) 0;
              }

              .order-buttons {
                
                button {
                  padding: var(--spacing-sm) var(--spacing-md);
                  background-color: var(--black);
                  color: var(--white);
                  border: none;
                  border-radius: var(--border-radius);
                  margin-right: var(--spacing-sm);
                }
              }
              button.accent {
                background-color: var(--yellow);
              }
            }
          }
        }

        .order-options {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-xs);
          padding: var(--spacing-sm);
          width: 60rem;
          button {
            padding: var(--spacing-sm) var(--spacing-md);
            background-color: transparent;
            color: var(--paleblue);
            border: 1px solid var(--lt-grey);
            border-radius: var(--br-25);
          }
        }

      }

      .order-archive-btn {
        display: flex;
        padding: var(--spacing-sm) var(--spacing-md);
        button.archive-btn {
          background-color: none;
          border: none;
        }

      }
        
    }
    


  }
`