import defaultAvatarImg from '../images/default-avatar.png'

export const getAvatarUrl = (avatarUrl) => {
  return avatarUrl ? `${process.env.NODE_ENV !== 'production' ? 'http://localhost:5000' : ''}${avatarUrl}` : defaultAvatarImg
}
