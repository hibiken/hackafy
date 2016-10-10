import {
  LIKE_POST_NOTIFICATION_RECEIVED,
  START_FOLLOWING_NOTIFICATION_RECEIVED,
  COMMENT_ON_POST_NOTIFICATION_RECEIVED,
} from '../actionTypes';

export const handleNotificationReceived = (notification) =>  {
  switch (notification.actionType) {
    case 'LIKE_POST':
      return  {
        type: LIKE_POST_NOTIFICATION_RECEIVED,
        payload: notification,
        postId: notification.notifiableId,
        likesCount: notification.metadata.likesCount,
      };
    case 'START_FOLLOWING':
      return {
        type: START_FOLLOWING_NOTIFICATION_RECEIVED,
        payload: notification,
        followerIds: notification.metadata.followerIds,
      }
    case 'COMMENT_ON_POST':
      return {
        type: COMMENT_ON_POST_NOTIFICATION_RECEIVED,
        payload: notification,
        postId: notification.notifiableId,
        comment: notification.metadata.comment,
      }
    default:
      return;
  }
}
