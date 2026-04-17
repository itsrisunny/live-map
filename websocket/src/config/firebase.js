const admin = require("firebase-admin");

if (process.env.NODE_ENV === "production") {
  admin.initializeApp({
    projectId: "apni-gaadi-2026",
  });
} else {
  const serviceAccount = require("../../serviceAccountKey.json");
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();
db.settings({
  databaseId: "agmpl2026",
});

module.exports = { db, admin };
