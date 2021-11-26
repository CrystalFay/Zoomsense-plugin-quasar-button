const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.database();

exports.onSlideInputMeeting = functions.database
  .ref('/data/slides/{meetingid}/current/{field}')
  .onWrite(async (change, context) => {
    // functions.logger.log(change.after);
    const timestamp = Date.now();
    await db
      .ref(`/data/slides/${context.params.meetingid}/_history/${timestamp}/${context.params.field}`)
      .set(change.after.val());
  });

exports.onSlideInputSequence = functions.database
  .ref('/sequence/{sequenceid}/slides/current/{field}')
  .onWrite(async (change, context) => {
    // functions.logger.log(change.after);
    const timestamp = Date.now();
    await db
      .ref(`/sequence/${context.params.sequenceid}/_history/${timestamp}/${context.params.field}`)
      .set(change.after.val());
  });

exports.onSlideChanged = functions.database
  .ref('/config/{meetingid}/current/currentState/plugins/slides/currentslide')
  .onWrite(async (change, context) => {
    // functions.logger.log(change.after);
    const timestamp = Date.now();
    await db.ref(`/data/slides/${context.params.meetingid}/_history/${timestamp}/_slide`).set(change.after.val());
  });
