import BarclaysLogo from '../icons/BarclaysLogo'
import HSBCLogo from '../icons/HSBCLogo'
import NatWestLogo from '../icons/NatwestLogo'
import LloydsLogo from '../icons/LloydsLogo'
import LloydsHorse from '../icons/LloydsHorse'
import SantanderLogo from '../icons/SantanderLogo'
import HalifaxLogo from '../icons/HalifaxLogo'
import RBSLogo from '../icons/RBSLogo'
import TSBLogo from '../icons/TSBLogo'
import NationwideLogo from '../icons/NationwideLogo'
import MetroBankLogo from '../icons/MetroBankLogo'
import VisaLogo from '../icons/VisaLogo'
import MastercardLogo from '../icons/MastercardLogo'
import AmexLogo from '../icons/AmexLogo'

const getTypeLogo = (type) => {
	switch (type) {
		case 'VISA':
			return <VisaLogo />
		case 'Mastercard':
			return <MastercardLogo />
		case 'American Express':
			return <AmexLogo />
		default:
			return null
	}
}

export const getAttributes = (card) => {
	switch (card.bank) {
		case 'Barclays':
			return {
				logo: <BarclaysLogo />,
				typeLogo: getTypeLogo(card.type),
				background: 'linear-gradient(90deg, #02BAF6 50%, #28446A)',
			}
		case 'HSBC':
			return {
				logo: <HSBCLogo />,
				typeLogo: getTypeLogo(card.type),
				background: 'linear-gradient(90deg, #010103 50%, #272727)',
			}
		case 'NatWest':
			return {
				logo: <NatWestLogo />,
				typeLogo: getTypeLogo(card.type),
				background: '#5A287D',
			}
		case 'Lloyds Bank':
			return {
				logo: <LloydsLogo />,
				typeLogo: getTypeLogo(card.type),
				img: <LloydsHorse />,
				background: 'linear-gradient(90deg, #023A2D 50%, #609256)',
			}
		case 'Santander':
			return {
				logo: <SantanderLogo />,
				typeLogo: getTypeLogo(card.type),
				background: '#EA0001',
			}
		case 'Halifax':
			return {
				logo: null,
				typeLogo: getTypeLogo(card.type),
				img: <HalifaxLogo />,
				background: '#0863BA',
			}
		case 'RBS':
			return {
				logo: <RBSLogo />,
				typeLogo: getTypeLogo(card.type),
				background: '#142E5B',
			}
		case 'TSB':
			return {
				logo: <TSBLogo />,
				typeLogo: getTypeLogo(card.type),
				background: '#2D3B90',
			}
		case 'Nationwide':
			return {
				logo: <NationwideLogo />,
				typeLogo: getTypeLogo(card.type),
				background: '#091C4C',
			}
		case 'Metro Bank':
			return {
				logo: <MetroBankLogo />,
				typeLogo: getTypeLogo(card.type),
				background: '#08399C',
			}
		default:
			return {
				logo: null,
				typeLogo: null,
				background: '#000',
			}
	}
}

// export const paymentMethods = [
// 	{
// 		id: 1,
// 		bank: 'Barclays',
// 		type: 'VISA',
// 		account: 'Debit',
// 		number: '4532012345671234',
// 		start_date: '01/23',
// 		end_date: '01/28',
// 		csv: '397',
// 		status: 'default',
// 	},
// 	{
// 		id: 2,
// 		bank: 'HSBC',
// 		type: 'Mastercard',
// 		account: 'Credit',
// 		number: '5412345678901234',
// 		start_date: '03/24',
// 		end_date: '03/29',
// 		csv: '456',
// 		status: 'valid',
// 	},
// 	{
// 		id: 3,
// 		bank: 'NatWest',
// 		type: 'VISA',
// 		account: 'Credit',
// 		number: '4123456789012345',
// 		start_date: '06/24',
// 		end_date: '06/29',
// 		csv: '789',
// 		status: 'valid',
// 	},
// 	{
// 		id: 4,
// 		bank: 'Lloyds Bank',
// 		type: 'Mastercard',
// 		account: 'Debit',
// 		number: '5234567890123456',
// 		start_date: '12/19',
// 		end_date: '12/28',
// 		csv: '234',
// 		status: 'valid',
// 	},
// 	{
// 		id: 5,
// 		bank: 'Santander',
// 		type: 'VISA',
// 		account: 'Credit',
// 		number: '4345678901234567',
// 		start_date: '09/20',
// 		end_date: '09/29',
// 		csv: '567',
// 		status: 'valid',
// 	},
// 	{
// 		id: 6,
// 		bank: 'Halifax',
// 		type: 'Mastercard',
// 		account: 'Debit',
// 		number: '5345678901234567',
// 		start_date: '03/19',
// 		end_date: '03/22',
// 		csv: '890',
// 		status: 'expired',
// 	},
// 	{
// 		id: 7,
// 		bank: 'RBS',
// 		type: 'VISA',
// 		account: 'Credit',
// 		number: '4456789012345678',
// 		start_date: '08/21',
// 		end_date: '08/26',
// 		csv: '345',
// 		status: 'expired',
// 	},
// 	{
// 		id: 8,
// 		bank: 'TSB',
// 		type: 'Mastercard',
// 		account: 'Debit',
// 		number: '5456789012345678',
// 		start_date: '11/20',
// 		end_date: '11/23',
// 		csv: '678',
// 		status: 'expired',
// 	},
// 	{
// 		id: 9,
// 		bank: 'Nationwide',
// 		type: 'VISA',
// 		account: 'Credit',
// 		number: '4567890123456789',
// 		start_date: '04/22',
// 		end_date: '04/27',
// 		csv: '901',
// 		status: 'expired',
// 	},
// 	{
// 		id: 10,
// 		bank: 'Metro Bank',
// 		type: 'Mastercard',
// 		account: 'Debit',
// 		number: '5567890123456789',
// 		start_date: '07/19',
// 		end_date: '07/22',
// 		csv: '234',
// 		status: 'expired',
// 	},
// 	{
// 		id: 11,
// 		bank: 'Barclays',
// 		type: 'VISA',
// 		account: 'Credit',
// 		number: '4678901234567890',
// 		start_date: '02/21',
// 		end_date: '02/24',
// 		csv: '567',
// 		status: 'expired',
// 	},
// 	{
// 		id: 12,
// 		bank: 'HSBC',
// 		type: 'Mastercard',
// 		account: 'Debit',
// 		number: '5678901234567890',
// 		start_date: '05/20',
// 		end_date: '05/23',
// 		csv: '890',
// 		status: 'expired',
// 	},
// 	{
// 		id: 13,
// 		bank: 'NatWest',
// 		type: 'VISA',
// 		account: 'Credit',
// 		number: '4789012345678901',
// 		start_date: '10/21',
// 		end_date: '10/26',
// 		csv: '123',
// 		status: 'expired',
// 	},
// 	{
// 		id: 14,
// 		bank: 'Lloyds',
// 		type: 'Mastercard',
// 		account: 'Debit',
// 		number: '5789012345678901',
// 		start_date: '01/19',
// 		end_date: '01/22',
// 		csv: '456',
// 		status: 'expired',
// 	},
// 	{
// 		id: 15,
// 		bank: 'Santander',
// 		type: 'American Express',
// 		account: 'Credit',
// 		number: '3789012345678901',
// 		start_date: '12/21',
// 		end_date: '12/26',
// 		csv: '789',
// 		status: 'expired',
// 	},
// 	{
// 		id: 16,
// 		bank: 'Halifax',
// 		type: 'VISA',
// 		account: 'Debit',
// 		number: '4890123456789012',
// 		start_date: '03/20',
// 		end_date: '03/23',
// 		csv: '012',
// 		status: 'expired',
// 	},
// 	{
// 		id: 17,
// 		bank: 'RBS',
// 		type: 'Mastercard',
// 		account: 'Credit',
// 		number: '5890123456789012',
// 		start_date: '06/19',
// 		end_date: '06/22',
// 		csv: '345',
// 		status: 'expired',
// 	},
// 	{
// 		id: 18,
// 		bank: 'TSB',
// 		type: 'VISA',
// 		account: 'Debit',
// 		number: '4901234567890123',
// 		start_date: '09/22',
// 		end_date: '09/27',
// 		csv: '678',
// 		status: 'expired',
// 	},
// 	{
// 		id: 19,
// 		bank: 'Nationwide',
// 		type: 'Mastercard',
// 		account: 'Credit',
// 		number: '5901234567890123',
// 		start_date: '11/21',
// 		end_date: '11/26',
// 		csv: '901',
// 		status: 'expired',
// 	},
// 	{
// 		id: 20,
// 		bank: 'Metro Bank',
// 		type: 'American Express',
// 		account: 'Credit',
// 		number: '3901234567890123',
// 		start_date: '08/22',
// 		end_date: '08/27',
// 		csv: '234',
// 		status: 'expired',
// 	},
// ]

// INSERT INTO payment_methods (payment_method_id, bank, type, account, number, start_date, end_date, cvv, status) VALUES
// (1, 'Barclays', 'VISA', 'Debit', '4532012345671234', '01/23', '01/28', '397', 'default'),
// (2, 'HSBC', 'Mastercard', 'Credit', '5412345678901234', '03/24', '03/29', '456', 'valid'),
// (3, 'NatWest', 'VISA', 'Credit', '4123456789012345', '06/24', '06/29', '789', 'valid'),
// (4, 'Lloyds Bank', 'Mastercard', 'Debit', '5234567890123456', '12/19', '12/28', '234', 'valid'),
// (5, 'Santander', 'VISA', 'Credit', '4345678901234567', '09/20', '09/29', '567', 'valid'),
// (6, 'Halifax', 'Mastercard', 'Debit', '5345678901234567', '03/19', '03/22', '890', 'expired'),
// (7, 'RBS', 'VISA', 'Credit', '4456789012345678', '08/21', '08/26', '345', 'expired'),
// (8, 'TSB', 'Mastercard', 'Debit', '5456789012345678', '11/20', '11/23', '678', 'expired'),
// (9, 'Nationwide', 'VISA', 'Credit', '4567890123456789', '04/22', '04/27', '901', 'expired'),
// (10, 'Metro Bank', 'Mastercard', 'Debit', '5567890123456789', '07/19', '07/22', '234', 'expired'),
// (11, 'Barclays', 'VISA', 'Credit', '4678901234567890', '02/21', '02/24', '567', 'expired'),
// (12, 'HSBC', 'Mastercard', 'Debit', '5678901234567890', '05/20', '05/23', '890', 'expired'),
// (13, 'NatWest', 'VISA', 'Credit', '4789012345678901', '10/21', '10/26', '123', 'expired'),
// (14, 'Lloyds', 'Mastercard', 'Debit', '5789012345678901', '01/19', '01/22', '456', 'expired'),
// (15, 'Santander', 'American Express', 'Credit', '3789012345678901', '12/21', '12/26', '789', 'expired'),
// (16, 'Halifax', 'VISA', 'Debit', '4890123456789012', '03/20', '03/23', '012', 'expired'),
// (17, 'RBS', 'Mastercard', 'Credit', '5890123456789012', '06/19', '06/22', '345', 'expired'),
// (18, 'TSB', 'VISA', 'Debit', '4901234567890123', '09/22', '09/27', '678', 'expired'),
// (19, 'Nationwide', 'Mastercard', 'Credit', '5901234567890123', '11/21', '11/26', '901', 'expired'),
// (20, 'Metro Bank', 'American Express', 'Credit', '3901234567890123', '08/22', '08/27', '234', 'expired');
