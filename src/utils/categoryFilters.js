export const categoryFilters = (category, products) => {

	const categoryList = [
		"beauty",
		"fragrances",
		"furniture",
		"groceries",
		"home-decoration",
		"kitchen-accessories",
		"laptops",
		"mens-shirts",
		"mens-shoes",
		"mens-watches",
		"mobile-accessories",
		"motorcycle",
		"skin-care",
		"smartphones",
		"sports-accessories",
		"sunglasses",
		"tablets",
		"tops",
		"vehicle",
		"womens-bags",
		"womens-dresses",
		"womens-jewellery",
		"womens-shoes",
		"womens-watches"
	]

	if (!categoryList.includes(category)) {
		const uniqueCategories = [...new Set(products.map(product => product.category))];
		return { category: uniqueCategories };  // Wrap in an object with the 'category' key
	}

	// Helper function to capitalize each word
	const capitalizeWords = (str) => {
		return str
			.split(' ') // Split the string into words
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
			.join(' ') // Rejoin the words into a single string
	}

	const tags = [
		...new Set(
			products.flatMap((product) =>
				(product.tags || []).map((tag) => capitalizeWords(tag))
			)
		),
	]
	const brands = [
		...new Set(products.map((product) => product.brand).filter(Boolean)),
	]

	// Define simulated filters for categories that don't have a brand field
	const simulatedFilters = {
		'womens-dresses': {
			size: ['XS', 'S', 'M', 'L', 'XL'],
			color: ['Black', 'Red', 'Purple', 'Floral Pattern', 'Polka Dot'],
		},
		tops: {
			tag: ['Frock', 'Dress'],
			size: ['S', 'M', 'L', 'XL'],
			color: ['Blue', 'Girl', 'Gray', 'Short', 'Tartan'],
		},
		groceries: {
			organic: [true, false],
		},
		'sports-accessories': {
			type: ['Ball', 'Rim', 'Gloves', 'Club', 'Bat', 'Racket'],
			sport: [
				'Football',
				'Baseball',
				'Basketball',
				'Cricket',
				'Golf',
				'Tennis',
				'Volleyball',
			],
		},
		'kitchen-accessories': {
			material: ['Silicone', 'Stainless Steel', 'Plastic'],
		},
		'home-decoration': {
			style: ['Contemporary', 'Vintage', 'Eclectic'],
		},
	}

	// Combine actual tags with simulated filters
	const combinedFilters = {
		...(tags.length && { tags }),
		...(brands.length && { brand: brands }),
		...(simulatedFilters[category] || {}),
	}

	return combinedFilters
}
