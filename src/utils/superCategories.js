import ClothingImg from '../assets/img/hero/clothing_xwide.webp'
import CosmeticsImg from '../assets/img/hero/cosmetics_xwide.webp'
import ElectronicsImg from '../assets/img/hero/gadgets_xwide.webp'
import GroceriesImg from '../assets/img/hero/groceries_xwide.webp'
import VehiclesImg from '../assets/img/hero/vehicles_xwide.webp'
import HomeImg from '../assets/img/hero/home_xwide.webp'
import SportsImg from '../assets/img/hero/sports_xwide.webp'


export const superCategories = [
	{
		id: 0,
		slug: 'fashion-and-accessories',
		title: 'Fashion & Accessories',
		subCategories: [
			'mens-shirts',
			'mens-shoes',
			'mens-watches',
			'womens-dresses',
			'womens-bags',
			'womens-jewellery',
			'womens-shoes',
			'womens-watches',
			'tops',
		],
		image: ClothingImg,
		cta: 'Fashion & Accessories',
		previewHeading: 'Clothing',
	},
	{
		id: 1,
		slug: 'beauty-and-personal-care',
		title: 'Beauty & Personal Care',
		subCategories: ['beauty', 'fragrances', 'skin-care'],
		image: CosmeticsImg,
		cta: 'Beauty & Personal Care',
		previewHeading: 'Beauty Products',
	},
	{
		id: 2,
		slug: 'consumer-electronics',
		title: 'Consumer Electronics',
		subCategories: [
			'laptops',
			'mobile-accessories',
			'smartphones',
			'tablets',
		],
		image: ElectronicsImg,
		cta: 'Consumer Electronics',
		previewHeading: 'Consumer Electronics',
	},
	{
		id: 3,
		slug: 'groceries',
		title: 'Groceries',
		subCategories: ['groceries'],
		image: GroceriesImg,
		cta: 'Groceries',
		previewHeading: 'Groceries',
	},
	{
		id: 4,
		slug: 'home-and-living',
		title: 'Home & Living',
		subCategories: ['furniture', 'home-decoration', 'kitchen-accessories'],
		image: HomeImg,
		cta: 'Home & Living',
		previewHeading: 'Home & Living',
	},
	{
		id: 5,
		slug: 'automotive-and-vehicles',
		title: 'Automotive & Vehicles',
		subCategories: ['motorcycle', 'vehicle'],
		image: VehiclesImg,
		cta: 'Automotive & Vehicles',
		previewHeading: 'Automotive & Vehicles',
	},
	{
		id: 6,
		slug: 'sports-and-outdoor',
		title: 'Sports & Outdoor',
		subCategories: ['sports-accessories', 'sunglasses'],
		image: SportsImg,
		cta: 'Sports & Outdoor',
		previewHeading: 'Sports & Outdoor',
	},
]
