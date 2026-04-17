const { admin } = require("../config/firebase");

/**
 * Validate if user exists by phone number
 */
const validateUserByPhone = async (phoneNumber) => {
  const formattedPhone = phoneNumber.startsWith("+")
    ? phoneNumber
    : `+91${phoneNumber}`;

  try {
    const userRecord = await admin
      .auth()
      .getUserByPhoneNumber(formattedPhone);

    return {
      exists: true,
      uid: userRecord.uid,
      phoneNumber: userRecord.phoneNumber,
    };
  } catch (error) {
    if (error.code === "auth/user-not-found") {
      return { exists: false };
    }

    throw error;
  }
};

/**
 * Verify Firebase ID Token (after OTP verification on frontend)
 */
const verifyFirebaseToken = async (idToken) => {
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);

    return {
      valid: true,
      uid: decodedToken.uid,
      phoneNumber: decodedToken.phone_number,
    };
  } catch (error) {
    return { valid: false };
  }
};

const deleteUserByToken = async (idToken) => {
  try {
    // Verify ID Token
    const decodedToken = await admin.auth().verifyIdToken(idToken);

    const uid = decodedToken.uid;
    // Delete Firebase Auth user
    await admin.auth().deleteUser(uid);

    return { success: true, uid };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  validateUserByPhone,
  verifyFirebaseToken,
  deleteUserByToken,
};
