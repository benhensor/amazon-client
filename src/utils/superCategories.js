import ClothingImg from '../assets/img/hero/clothing.webp'
import CosmeticsImg from '../assets/img/hero/cosmetics.webp'
import ElectronicsImg from '../assets/img/hero/gadgets.webp'
import GroceriesImg from '../assets/img/hero/groceries.webp'
import VehiclesImg from '../assets/img/hero/vehicles.webp'
import HomeImg from '../assets/img/hero/home.webp'
import SportsImg from '../assets/img/hero/sports.webp'


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
		cta: 'make yourself presentable',
		previewHeading: 'Clothing',
	},
	{
		id: 1,
		slug: 'beauty-and-personal-care',
		title: 'Beauty & Personal Care',
		subCategories: ['beauty', 'fragrances', 'skin-care'],
		image: CosmeticsImg,
		cta: 'fix your face',
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
		cta: 'pointless gadgets?',
		previewHeading: 'Consumer Electronics',
	},
	{
		id: 3,
		slug: 'groceries',
		title: 'Groceries',
		subCategories: ['groceries'],
		image: GroceriesImg,
		cta: 'consume more',
		previewHeading: 'Groceries',
	},
	{
		id: 4,
		slug: 'home-and-living',
		title: 'Home & Living',
		subCategories: ['furniture', 'home-decoration', 'kitchen-accessories'],
		image: HomeImg,
		cta: 'sort your life out',
		previewHeading: 'Home & Living',
	},
	{
		id: 5,
		slug: 'automotive-and-vehicles',
		title: 'Automotive & Vehicles',
		subCategories: ['motorcycle', 'vehicle'],
		image: VehiclesImg,
		cta: 'midlife crisis?',
		previewHeading: 'Automotive & Vehicles',
	},
	{
		id: 6,
		slug: 'sports-and-outdoor',
		title: 'Sports & Outdoor',
		subCategories: ['sports-accessories', 'sunglasses'],
		image: SportsImg,
		cta: 'maybe go outside?',
		previewHeading: 'Sports & Outdoor',
	},
]
