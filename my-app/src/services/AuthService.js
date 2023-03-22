import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth"
import UserService from "./UserService"
import { app, db } from "../utils/firebase"

const auth = getAuth(app);


export const signup = async (name, email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth,
      email,
      password
    );
    const { user } = userCredential;



    await updateProfile(user, { displayName: name });

    const permissions = ["user"];
    const userData = {
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      provider: user.providerId,
      permissions: permissions,
    }
    await UserService.createUser(userData);
    await sendAuthEmailVerification(user);
    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth,
      email,
      password
    );
    const { user } = userCredential;

    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const logout = async () => {
  try {
    await auth.signOut();
  } catch (error) {
    console.error(error);
    throw error;
  }
}
export const onAuthStateChanged = (callback) => {
  return auth.onAuthStateChanged(callback);
}
export const getCurrentUser = () => {
  return auth.currentUser;
}

export const sendAuthEmailVerification = async (user) => {
  try {
    await sendEmailVerification(user)
  } catch (error) {
    console.error(error);
    throw error;

  };
}


export const resetPassword = async (email) => {
  try {


    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    console.error(error);
    throw error;

  };
};


export const firebaseAuth = auth;
