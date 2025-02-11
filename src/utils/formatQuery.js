const formatQuery = (query) => {
  // Handle non-string inputs
  if (!query || typeof query !== 'string') {
    console.warn('formatQuery received non-string input:', query);
    return '';
  }

  // Check if the query contains 'search=' and extract the part after it
  if (query.includes('search=')) {
    query = query.split('search=')[1];
  }

  // Format the query
  return query
    .split('-') // Split by hyphen if exists
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize first letter of each word
    .join(' '); // Join back into a string with spaces
};

export default formatQuery;