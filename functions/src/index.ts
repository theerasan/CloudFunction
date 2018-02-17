import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp(functions.config().firebase)

export const addMessage = functions.https.onRequest((req, resp) => {
    const original = req.query.text;
    admin.database().ref("/messages")
        .push({original: original})
        .then(snapshot => {
            resp.redirect(303, snapshot.ref);
        });
});

export const makeUppercase = functions.database.ref('/messages/{pushId}/original')
    .onWrite(event => {
        const original = event.data.val();
        const upperCase = original.toUpperCase();

        return event.data.ref.parent.child('uppercase').set(upperCase);
    });

export const getAllMessages = functions.https.onRequest((req, resp) => {
    resp.send(admin.database().ref("/message").toJSON().toString());
});