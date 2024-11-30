import admin from "firebase-admin";

const serviceAccount = require("./service.json"); // Add your service account file here

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export const adminDb = admin.firestore();
export const adminAuth = admin.auth();
