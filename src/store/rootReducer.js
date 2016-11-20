import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as form } from 'redux-form';
import currentUser, * as fromCurrentUser from '../reducers/currentUser';
import posts, * as fromPosts from '../reducers/posts';
import publicProfiles, * as fromPublicProfiles from '../reducers/publicProfiles';
import followersFollowing, * as fromFollowersFollowing from '../reducers/followersFollowing';
import likers, * as fromLikers from '../reducers/likers';
import notifications, * as fromNotifications from '../reducers/notifications';
import followSuggestions, * as fromSuggestions from '../reducers/followSuggestions';
import { USER_SIGN_OUT } from '../actions/actionTypes';

const appReducer = combineReducers({
  routing,
  form,
  currentUser,
  posts,
  publicProfiles,
  followersFollowing,
  likers,
  notifications,
  followSuggestions,
});

const rootReducer = (state, action) => {
  if (action.type === USER_SIGN_OUT) {
    // Reset redux state to initialState.
    state = undefined;
  }

  return appReducer(state, action);
}

export default rootReducer;

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

export const getAuthErrors = (state) => {
  return fromCurrentUser.getAuthErrors(state.currentUser);
};

export const getIsAuthenticating = (state) => {
  return fromCurrentUser.getIsAuthenticating(state.currentUser);
};

export const getIsLoggingInWithFB = (state) => {
  return fromCurrentUser.getIsLoggingInWithFB(state.currentUser);
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

export const getPostById = (state, id) => {
  return fromPosts.getPostById(state.posts, id);
};

export const getIsFetchingPosts = (state) => {
  return fromPosts.getIsFetching(state.posts);
};

export const getIsUploadingPost = (state) => {
  return fromPosts.getIsUploading(state.posts);
}

export const getPostsCurrentPage = (state) => {
  return fromPosts.getCurrentPage(state.posts);
};

export const getPostsNextPage = (state) => {
  return fromPosts.getNextPage(state.posts);
};

export const getPostsTotalPages = (state) => {
  return fromPosts.getTotalPages(state.posts);
};

/* Returns object or false ***/
export const getPublicProfileByUsername = (state, username) => {
  return fromPublicProfiles.getPublicProfileByUsername(state.publicProfiles, username);
};

export const getPublicProfileErrors = (state) => {
  return fromPublicProfiles.getErrors(state.publicProfiles);
};

export const getPostsByUsername = (state, username) => {
  const postIds = fromPublicProfiles.getPostIdsByUsername(state.publicProfiles, username);
  return fromPosts.getPostsByIds(state.posts, postIds);
};

export const getIsFetchingPublicProfile = (state) => {
  return fromPublicProfiles.getIsFetchingPublicProfile(state.publicProfiles);
};

export const getPaginationByUsername = (state, username) => {
  return fromPublicProfiles.getPaginationByUsername(state.publicProfiles, username);
};

export const getPaginationByTagName = (state, tagName) => {
  return fromPosts.getPaginationByTagName(state.posts, tagName);
};

export const getPostsByPlaceId = (state, placeId) => {
  return fromPosts.getPostsByPlaceId(state.posts, placeId);
};

export const getPostsByTagName = (state, tagName) => {
  return fromPosts.getPostsByTagName(state.posts, tagName);
};

export const getFollowersByUsername = (state, username) => {
  return fromFollowersFollowing.getFollowersByUsername(state.followersFollowing, username);
};

export const getFollowingByUsername = (state, username) => {
  return fromFollowersFollowing.getFollowingByUsername(state.followersFollowing, username);
};

export const getIsFetchingFollowersFollowing = (state) => {
  return fromFollowersFollowing.getIsFetching(state.followersFollowing);
};

export const getFollowingPaginationByUsername = (state, username) => {
  return fromFollowersFollowing.getFollowingPaginationByUsername(state.followersFollowing, username);
};

export const getFollowerPaginationByUsername = (state, username) => {
  return fromFollowersFollowing.getFollowerPaginationByUsername(state.followersFollowing, username);
};

export const getFollowingNextPageByUsername = (state, username) => {
  return fromFollowersFollowing.getFollowingNextPageByUsername(state.followersFollowing, username);
};

export const getFollowerNextPageByUsername = (state, username) => {
  return fromFollowersFollowing.getFollowerNextPageByUsername(state.followersFollowing, username);
};

export const getLikersByPostId = (state, postId) => {
  return fromLikers.getLikersByPostId(state.likers, postId);
};

export const getLikerPaginationByPostId = (state, postId) => {
  return fromLikers.getLikerPaginationByPostId(state.likers, postId);
};

export const getIsFetchingLikers = (state) => {
  return fromLikers.getIsFetching(state.likers);
};

export const getNotifications = (state) => {
  return fromNotifications.getNotifications(state.notifications);
};

export const getNewNotifications = (state) => {
  return fromNotifications.getNewNotifications(state.notifications);
};

export const getIsFetchingNotifications = (state) => {
  return fromNotifications.getIsFetchingNotifications(state.notifications);
};

export const getNotificationCount = (state) => {
  return fromNotifications.getCount(state.notifications);
};

export const getNotificationsNextPage = (state) => {
  return fromNotifications.getNextPage(state.notifications);
};

export const getNotificationsTotalPages = (state) => {
  return fromNotifications.getTotalPages(state.notifications);
};

export const getNotificationsCurrentPage = (state) => {
  return fromNotifications.getCurrentPage(state.notifications);
};

export const getAllSuggestions = (state) => {
  return fromSuggestions.getAllSuggestions(state.followSuggestions);
}

export const getIsFetchingSuggestions = (state) => {
  return fromSuggestions.getIsFetching(state.followSuggestions);
}
