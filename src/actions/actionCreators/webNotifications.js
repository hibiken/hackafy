import {
  LIKE_POST_NOTIFICATION_RECEIVED,
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
    default:
      return;
  }
}
