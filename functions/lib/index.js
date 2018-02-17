"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);
exports.addMessage = functions.https.onRequest((req, resp) => {
    const original = req.query.text;
    admin.database().ref("/messages")
        .push({ original: original })
        .then(snapshot => {
        resp.redirect(303, snapshot.ref);
    });
});
exports.makeUppercase = functions.database.ref('/messages/{pushId}/original')
    .onWrite(event => {
    const original = event.data.val();
    const upperCase = original.toUpperCase();
    return event.data.ref.parent.child('uppercase').set(upperCase);
});
exports.getAllMessages = functions.https.onRequest((req, resp) => {
    resp.send(admin.database().ref("/message").toJSON().toString());
});
//# sourceMappingURL=index.js.map