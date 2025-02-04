import BarclaysLogo from '../icons/BarclaysLogo'
import CoopLogo from '../icons/CoopLogo'
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
  const cardType = type.toLowerCase();
  switch (cardType) {
    case 'visa':
      return <VisaLogo />;
    case 'mastercard':
      return <MastercardLogo />;
    case 'amex':
    case 'american express':
      return <AmexLogo />;
    default:
      return null;
  }
};

export const generateCVV = (cardType) => {
  // AMEX uses 4-digit CVV, others use 3-digit
  const type = cardType.toLowerCase();
  const length = type === 'amex' || type === 'american express' ? 4 : 3;
  return Array(length)
    .fill(0)
    .map(() => Math.floor(Math.random() * 10))
    .join('');
};

export const generateAccountType = () => {
	const randomChoice = Math.floor(Math.random() * 2);
	return randomChoice === 0 ? 'Debit' : 'Credit';
}

export const generateDates = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;

  // Generate start date (current month/year)
  const startMonth = currentMonth.toString().padStart(2, '0');
  const startYear = (currentYear % 100).toString();
  const startDate = `${startMonth}/${startYear}`;

  // Generate end date (5 years from start)
  const endYear = ((currentYear + 5) % 100).toString();
  const endDate = `${startMonth}/${endYear}`;

  return { startDate, endDate };
};

export const generateCardNumber = (type) => {
  // Standardize type to lowercase
  const cardType = type.toLowerCase();
  
  // Define prefix ranges for different card types
  const cardPrefixes = {
    'visa': ['4'],
    'mastercard': ['51', '52', '53', '54', '55'],
    'amex': ['34', '37'],
    'american express': ['34', '37']
  };

  // Get the prefix array for the specified card type
  const prefixes = cardPrefixes[cardType];
  if (!prefixes) {
    throw new Error('Invalid card type');
  }

  // Randomly select a prefix
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];

  // Calculate remaining length needed (15 for AMEX, 16 for others)
  const isAmex = cardType === 'amex' || cardType === 'american express';
  const remainingLength = isAmex ? 15 - prefix.length : 16 - prefix.length;

  // Generate random digits for the remaining length
  let number = prefix;
  for (let i = 0; i < remainingLength; i++) {
    number += Math.floor(Math.random() * 10).toString();
  }

  // Apply Luhn algorithm for the check digit
  const digits = number.split('').map(Number);
  let sum = 0;
  let isEven = false;

  // Loop from right to left
  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = digits[i];

    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    isEven = !isEven;
  }

  // Calculate check digit
  const checkDigit = ((Math.floor(sum / 10) + 1) * 10 - sum) % 10;
  
  return number + checkDigit.toString();
};

export const getAttributes = (card) => {
	switch (card?.bank) {
		case 'Barclays':
			return {
				logo: <BarclaysLogo />,
				typeLogo: getTypeLogo(card?.card_type),
				background: 'linear-gradient(90deg, #02BAF6 50%, #28446A)',
			}
		case 'Co-op':
			return {
				logo: <CoopLogo />,
				typeLogo: getTypeLogo(card?.card_type),
				background: 'linear-gradient(90deg, #0099CC 50%, #0079a2)',
			}
		case 'HSBC':
			return {
				logo: <HSBCLogo />,
				typeLogo: getTypeLogo(card?.card_type),
				background: 'linear-gradient(90deg, #010103 50%, #272727)',
			}
		case 'NatWest':
			return {
				logo: <NatWestLogo />,
				typeLogo: getTypeLogo(card?.card_type),
				background: '#5A287D',
			}
		case 'Lloyds Bank':
			return {
				logo: <LloydsLogo />,
				typeLogo: getTypeLogo(card?.card_type),
				img: <LloydsHorse />,
				background: 'linear-gradient(90deg, #023A2D 50%, #609256)',
			}
		case 'Santander':
			return {
				logo: <SantanderLogo />,
				typeLogo: getTypeLogo(card?.card_type),
				background: '#EA0001',
			}
		case 'Halifax':
			return {
				logo: null,
				typeLogo: getTypeLogo(card?.card_type),
				img: <HalifaxLogo />,
				background: '#0863BA',
			}
		case 'RBS':
			return {
				logo: <RBSLogo />,
				typeLogo: getTypeLogo(card?.card_type),
				background: '#142E5B',
			}
		case 'TSB':
			return {
				logo: <TSBLogo />,
				typeLogo: getTypeLogo(card?.card_type),
				background: '#2D3B90',
			}
		case 'Nationwide':
			return {
				logo: <NationwideLogo />,
				typeLogo: getTypeLogo(card?.card_type),
				background: '#091C4C',
			}
		case 'Metro Bank':
			return {
				logo: <MetroBankLogo />,
				typeLogo: getTypeLogo(card?.card_type),
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
