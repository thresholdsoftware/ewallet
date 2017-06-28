import * as admin from 'firebase-admin';
import serviceAccount from '../../config/firebase.key.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`
});
// These registration tokens come from the client FCM SDKs.
var registrationTokens = [
  'f5kRiF02ip8:APA91bHpm7VnYaJ5UNSYGBYIvuec2XG3VeW6cHd1wbpeLPVk9SPyfd5DmyC4ANV3Ith6Sp7J22SxrnAb9I2gkECdZaN166R1wHBmTrCijR16KTIjIWWDyIC-PWHmA-3OdtVsS3UN2Hjm'
];

// See the "Defining the message payload" section below for details
// on how to define a message payload.
var payload = {
  notification: {
    body: 'Yolo3232',
    title: 'Hahaha'
  }
};
export const message = (message = payload, token = registrationTokens) => {
  admin.messaging().sendToDevice(token, message).
    then(function (response) {
      // See the MessagingDevicesResponse reference documentation for
      // the contents of response.
      console.log('Successfully sent message:', response);
    }).
    catch(function (error) {
      console.log('Error sending message:', error);
    });
};
