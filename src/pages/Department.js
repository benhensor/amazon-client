import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedCategory, fetchProductsByCategory } from '../redux/slices/productsSlice'
import { superCategories } from '../utils/superCategories'
import { formatCategory } from '../utils/formatCategory'
import styled from 'styled-components'
import Carousel from '../components/products/Carousel'

export default function Department() {
  const dispatch = useDispatch()
  const { products, selectedCategory, status, error } = useSelector((state) => state.products)
  
  const [department, setDepartment] = useState(null)

  // UseEffect to handle page refresh and set the category from localStorage
  useEffect(() => {
    const storedCategory = localStorage.getItem('selectedCategory')
    
    if (storedCategory) {
      // If category exists in localStorage, update the state and dispatch the action to set it
      dispatch(setSelectedCategory(storedCategory))
    }
  }, [dispatch])

  useEffect(() => {
    // If there's a selectedCategory, update department and store it in localStorage
    if (selectedCategory) {
      const currentDepartment = superCategories.find(
        (superCategory) => superCategory.title === selectedCategory
      )
      setDepartment(currentDepartment)

      // Save the selected category in localStorage
      localStorage.setItem('selectedCategory', selectedCategory)

      // Fetch products for all subCategories
      if (currentDepartment) {
        currentDepartment.subCategories.forEach((subCategory) => {
          dispatch(fetchProductsByCategory(subCategory))
        })
      }
    }
  }, [selectedCategory, dispatch])

  if (status === 'loading') {
    return (
      <section>
        <div>Loading...</div>
      </section>
    )
  }

  if (error) {
    return (
      <section>
        <div>Error: {error}</div>
      </section>
    )
  }

  // Make sure to only render content when department is defined
  return (
    <DepartmentContainer>
      <DepartmentHeader>
        <h1>{selectedCategory}</h1>
      </DepartmentHeader>

      <Content>
        <Sidebar />
        
        <ProductsGrid>
          {department ? (
            department.subCategories.map((subCategory) => {
              const filteredProducts = products.filter(
                (product) => product.category === subCategory
              )
              return (
                <Carousel
                  key={subCategory}
                  title={formatCategory(subCategory)}
                  products={filteredProducts}
                />
              )
            })
          ) : (
            <p>No department found.</p>
          )}
        </ProductsGrid>
      </Content>
    </DepartmentContainer>
  )
}

const DepartmentContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const DepartmentHeader = styled.div`
  padding: 0 var(--spacing-md);
  background-color: var(--white);
  border-bottom: 1px solid var(--lt-grey);
  h1 {
    font-size: clamp(var(--font-lg), 3vw, var(--font-xxl));
  }

  @media only screen and (max-width: 768px) {
    padding: var(--spacing-xs) var(--spacing-sm);
  }
`

const Content = styled.div`
  display: flex;
  background-color: var(--white);

  @media only screen and (max-width: 768px) {
    flex-direction: column;
    padding: var(--spacing-sm);
  }
`

const Sidebar = styled.aside`
  width: 30rem;
  min-width: 25rem;
  height: 100vh;
  padding: var(--spacing-md);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  @media only screen and (max-width: 768px) {
    display: none;
  }
`

const ProductsGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  flex: 1;
  @media only screen and (max-width: 768px) {
    gap: var(--spacing-sm);
  }
`

