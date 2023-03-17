import {getAuth, createUserWithEmailAndPassword, updateProfile} from "firebase/auth"
import {app} from "../utils/firebase"

const auth=getAuth(app);
class AuthService {
  

  async signup(email, password) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth,
        email,
        password
      );
      const { user } = userCredential;
      await updateProfile(user,{ displayName: email });
      return user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async login(email, password) {
    try {
      const userCredential = await this.auth.signInWithEmailAndPassword(
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

  async logout() {
    try {
      await this.auth.signOut();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  onAuthStateChanged(callback) {
    return this.auth.onAuthStateChanged(callback);
  }
  getCurrentUser() {
    return this.auth.currentUser;
  }
 
}

export const firebaseAuth=auth;


export default new AuthService();