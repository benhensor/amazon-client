export const formatQuery = (query) => {
  if (!query) return ''; // Handle empty or undefined query
  
  // Check if the query contains 'search=' and extract the part after it
  if (query.includes('search=')) {
    query = query.split('search=')[1];
  }

  // Now, format the query (e.g., split by hyphen, capitalize first letter)
  return query
    .split('-') // Split by hyphen if exists
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize first letter of each word
    .join(' '); // Join back into a string with spaces
};
