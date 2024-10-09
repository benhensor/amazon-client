export const starCalculator = (rating) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push('full');
    } else if (i === fullStars && hasHalfStar) {
      stars.push('half');
    } else {
      stars.push('empty');
    }
  }
  
  return stars;
};

export const generateVoteCount = (rating) => {
  const baseVotes = 10; 
  const multiplier = 10;
  const randomFactor = Math.random() * 150; 

  // Higher ratings generate more votes
  return Math.round(baseVotes + (rating * multiplier) + randomFactor);
};