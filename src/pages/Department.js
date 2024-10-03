import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { superCategories } from '../utils/superCategories'
import { formatCategory } from '../utils/formatCategory'
import styled from 'styled-components'
import Carousel from '../components/products/Carousel'

export default function Department() {
  const dispatch = useDispatch()
  const { products, selectedCategory, categoryList, status, error } = useSelector(
    (state) => state.products
  )
  console.log(selectedCategory)
  const department = superCategories.find(
    (superCategory) => superCategory.title === selectedCategory
  )
  return (
    <div>
      <h1>{selectedCategory}</h1>
      {department.subCategories.map((subCategory) => {
        const filteredProducts = products.filter(
          (product) => product.category === subCategory
        )
        return <Carousel key={subCategory} title={formatCategory(subCategory)} products={filteredProducts} /> 
      })}
    </div>
  )
}
