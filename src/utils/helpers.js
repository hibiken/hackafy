import defaultAvatarImg from '../images/default-avatar.png';
import noImage from '../images/no-image.jpg';

// Helper function for User avatar image
export const getAvatarUrl = (avatarUrl) => {
  const facebookAvatarUrl = /http:\/\/graph.facebook.com\//;
  return avatarUrl ?
  `${(process.env.NODE_ENV !== 'production' && !facebookAvatarUrl.test(avatarUrl)) ? 'http://localhost:5000' : ''}${avatarUrl}` :
  defaultAvatarImg;
}

// Helper  function for Post picture image
export const getImageUrl = (imageUrl) => {
  return imageUrl ? `${process.env.NODE_ENV !== 'production' ? 'http://localhost:5000' : ''}${imageUrl}` : noImage;
}

// Helper function for pluralization
export const pluralize = (count, singular, plural) => {
  return count === 1 ? singular : plural;
}
