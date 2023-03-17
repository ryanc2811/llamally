import firebase from 'firebase/app';
import 'firebase/auth';

class AuthService {
  constructor() {
    this.auth = firebase.auth();
  }

  async signup(email, password) {
    try {
      const userCredential = await this.auth.createUserWithEmailAndPassword(
        email,
        password
      );
      const { user } = userCredential;
      await user.updateProfile({ displayName: email });
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

  getCurrentUser() {
    return this.auth.currentUser;
  }
}

export default AuthService;