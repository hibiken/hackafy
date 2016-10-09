import {
  LIKE_POST_NOTIFICATION_RECEIVED,
  START_FOLLOWING_NOTIFICATION_RECEIVED,
} from '../actionTypes';

export const handleNotificationReceived = (notification) =>  {
  console.log('notification', notification);
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
    default:
      return;
  }
}
