import ActionCable from 'actioncable';
import { WS_URL } from '../config/constants'

export const createConsumerWithToken = (authToken) => {
  window.App.cable = ActionCable.createConsumer(`${WS_URL}?token=${authToken}`)
}
