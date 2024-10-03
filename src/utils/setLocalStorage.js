export const setLocalStorage = (value) => {
  localStorage.setItem({
    currentProduct: value || null,
    searchTerm: value || null,
    selectedCategory: value || null,
  })
}