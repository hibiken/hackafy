import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as form } from 'redux-form';
import currentUser, * as fromCurrentUser from '../reducers/currentUser';
import posts, * as fromPosts from '../reducers/posts';
import publicProfiles from '../reducers/publicProfiles';

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
}

export const getAllPosts = (state) => {
  return fromPosts.getAllPosts(state.posts);
}

export const getIsFetchingPosts = (state) => {
  return fromPosts.getIsFetching(state.posts);
}

export default rootReducer;
