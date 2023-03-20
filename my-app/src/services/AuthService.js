import {getAuth, createUserWithEmailAndPassword, updateProfile,signInWithEmailAndPassword} from "firebase/auth"
import UserService from "./UserService"
import {app,db} from "../utils/firebase"

const auth=getAuth(app);
class AuthService {
  

  async signup(name,email, password) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth,
        email,
        password
      );
      const { user } = userCredential;

      
      
      await updateProfile(user,{ displayName: name });

      const permissions=["user"];
      const userData={
        uid:user.uid,
        name:user.displayName,
        email:user.email,
        provider:user.providerId,
        permissions:permissions
      }
      await UserService.createUser(userData);
      return user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async login(email, password) {
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

  async logout() {
    try {
      await auth.signOut();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  onAuthStateChanged(callback) {
    return auth.onAuthStateChanged(callback);
  }
  getCurrentUser() {
    return auth.currentUser;
  }
 
}

export const firebaseAuth=auth;


export default new AuthService();