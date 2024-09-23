import React, { useEffect, useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllProducts, fetchCategoryList } from '../redux/slices/productsSlice'
import Hero from '../components/hero/Hero'
import Carousel from '../components/products/Carousel'
import styled from 'styled-components'

export default function Home() {
  const dispatch = useDispatch()
  const { products, categoryList, status, error } = useSelector((state) => state.products)

  // useEffect(() => {
  //   if (status === 'idle') {
  //     dispatch(fetchAllProducts())
  //     dispatch(fetchCategoryList())
  //   }
  // }, [dispatch, status])

  const productsByCategory = useMemo(() => {
    return categoryList.reduce((acc, category) => {
      acc[category] = products.filter(product => product.category === category)
      return acc
    }, {})
  }, [products, categoryList])

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

  console.log('Status:', status)
  console.log('Products:', products)
  console.log('CategoryList:', categoryList)
  console.log('ProductsByCategory:', productsByCategory)

  if (categoryList.length === 0) {
    return (
      <section>
        <h1>Home</h1>
        <div>No categories available.</div>
      </section>
    )
  }

  return (
    <HomePageContainer>
      <Hero />
      {categoryList.map(category => (
        <Carousel key={category} category={category} products={productsByCategory[category]} />
      ))}
    </HomePageContainer>
  )
}

const HomePageContainer = styled.section`

`
