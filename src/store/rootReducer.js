import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as form } from 'redux-form';
import currentUser, * as fromCurrentUser from '../reducers/currentUser';
import posts, * as fromPosts from '../reducers/posts';
import publicProfiles, * as fromPublicProfiles from '../reducers/publicProfiles';

const rootReducer = combineReducers({
  routing,
  form,
  currentUser,
  posts,
  publicProfiles,
});

/*** Selectors ***/
export const getIsSignedIn = (state) => {
  return Boolean(state.currentUser.authenticationToken);
};

export const getCurrentUser = (state) => {
  return fromCurrentUser.getCurrentUser(state.currentUser);
};

export const getAuthToken = (state) => {
  return fromCurrentUser.getAuthToken(state.currentUser);
};

export const getCurrentUsersPosts = (state) => {
  const postIds = fromCurrentUser.getPostIds(state.currentUser);
  return fromPosts.getPostsByIds(state.posts, postIds);
};

export const getCurrentUsersLikedPostIds = (state) => {
  return fromCurrentUser.getLikedPostIds(state.currentUser);
};

export const getCurrentUsersFollowingIds = (state) => {
  return fromCurrentUser.getFollowingIds(state.currentUser);
}

export const getAllPosts = (state) => {
  return fromPosts.getAllPosts(state.posts);
};

export const getIsFetchingPosts = (state) => {
  return fromPosts.getIsFetching(state.posts);
};

/* Returns object or false ***/
export const getPublicProfileByUsername = (state, username) => {
  return fromPublicProfiles.getPublicProfileByUsername(state.publicProfiles, username);
};

export const getPostsByUsername = (state, username) => {
  const postIds = fromPublicProfiles.getPostIdsByUsername(state.publicProfiles, username);
  return fromPosts.getPostsByIds(state.posts, postIds);
};

export const getIsFetchingPublicProfile = (state) => {
  return fromPublicProfiles.getIsFetchingPublicProfile(state.publicProfiles);
}

export default rootReducer;
