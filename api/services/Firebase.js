/* global sails*/
import * as admin from 'firebase-admin';
import serviceAccount from '../../config/firebase.key.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`
});

export const createNotificationEntity = ({title, body, icon, ...extraPayload}) => ({
  notification: {
    title,
    body,
    icon,
    ...extraPayload
  }
});

export const sendNotificationToUser = (accountId, message = {}) => {
  const notificationEntity = message;
  const users = tokens;
  return admin.messaging().sendToDevice(users, notificationEntity).
    then(function (response) {
      sails.log.debug('Successfully sent message:', response);
    }).
    catch(function (error) {
      sails.log.debug('Error sending message:', error);
    });
};
