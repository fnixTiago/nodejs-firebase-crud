require("dotenv").config();
const admin = require("firebase-admin");
const serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://munanky-43fc1.firebaseio.com'
});
const db = admin.firestore();
module.exports = db;