export const categoryFilters = (category, products) => {
  const tags = [...new Set(products.flatMap(product => product.tags || []))];
  const brands = [...new Set(products.map(product => product.brand).filter(Boolean))];

  // Define simulated filters for categories that don't have a brand field
  const simulatedFilters = {
    "womens-dresses": {
      size: ["XS", "S", "M", "L", "XL"],
      color: ["Black", "Red", "Purple", "Floral Pattern", "Polka Dot"],
    },
    tops: {
      tag: ["Frock", "Dress"],
      size: ["S", "M", "L", "XL"],
      color: ["Blue", "Girl", "Gray", "Short", "Tartan"],
    },
    groceries: {
      organic: [true, false],
    },
    "sports-accessories": {
      type: ["Ball", "Rim", "Gloves", "Club", "Bat", "Racket"],
      sport: ["Football", "Baseball", "Basketball", "Cricket", "Golf", "Tennis", "Volleyball"]
    },
    "kitchen-accessories": {
      material: ["Silicone", "Stainless Steel", "Plastic"],
    },
    "home-decoration": {
      style: ["Contemporary", "Vintage", "Eclectic"],
    },
  };

  // Combine actual tags with simulated filters
  const combinedFilters = {
    ...(tags.length && { tags }),
    ...(brands.length && { brand: brands }),
    ...(simulatedFilters[category] || {}),
  };

  return combinedFilters;
};
