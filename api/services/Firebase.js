/* global sails*/
import * as admin from 'firebase-admin';
import map from 'lodash/map';
import {cleanArrayOfFalsy} from '../utils/transformer.util';
import serviceAccount from '../../config/firebase.key.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`
});

const _getNotificationEntity = ({title, body, ...extraPayload}) => ({
  notification: {
    title,
    body,
    ...extraPayload
  }
});

const notificationOptions = {
  priority: 'high',
  timeToLive: 60 * 60 * 24
};

export const sendNotificationToUser = (accountId, message = {}) => {
  const notification = _getNotificationEntity(message);
  return Account.findOne({id: accountId}).populate('devices').
    then((account) => {
      const notificationTokens = cleanArrayOfFalsy(map(account.devices, 'notificationId'));
      return admin.messaging().sendToDevice(notificationTokens, notification, notificationOptions);
    }).
    then((response) => console.log('Successfully sent message:', response)).
    catch((error) => console.log('Error sending message:', error));
};

export const sendNotificationToDevice = (deviceNotificationToken, message = {}) => {
  const notification = _getNotificationEntity(message);
  return admin.messaging().sendToDevice(deviceNotificationToken, notification, notificationOptions).
  then((response) => console.log('Successfully sent message:', response)).
  catch((error) => console.log('Error sending message:', error));
};

export const sendNotificationToAllDevices = (message = {}) => {
  const notification = _getNotificationEntity(message);
  return admin.messaging().sendToCondition('*', notification, notificationOptions).
  then((response) => console.log('Successfully sent message:', response)).
  catch((error) => console.log('Error sending message:', error));
};
