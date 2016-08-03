import { combineReducers } from 'redux';
import {
  POST_UPLOAD_START,
  POST_UPLOAD_SUCCESS,
  POST_UPLOAD_FAILURE
} from '../actions/actionTypes';

const initialState = {
  allIds: [],
  byId: {},
  isFetching: false,
  isUploading: false,
};

const allIds = (state = initialState.allIds, action) => {
  switch (action.type) {
    case POST_UPLOAD_SUCCESS:
      return [...state, action.payload.id];
    default:
      return state;
  }
}

const byId = (state = initialState.byId, action) => {
  switch (action.type) {
    case POST_UPLOAD_SUCCESS:
      return {
        ...state,
        [action.payload.id]: action.payload,
      };
    default:
      return state;
  }
}

const isFetching = (state = initialState.isFetching, action) => {
  switch (action.type) {
    default:
      return state;
  }
}

const isUploading = (state = initialState.isUploading, action) => {
  switch (action.type) {
    case POST_UPLOAD_START:
      return true;
    case POST_UPLOAD_SUCCESS:
    case POST_UPLOAD_FAILURE:
      return false;
    default:
      return state;
  }
}

export default combineReducers({
  allIds,
  byId,
  isFetching,
  isUploading,
});
