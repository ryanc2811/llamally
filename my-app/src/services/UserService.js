import {db}from '../utils/firebase';
import {setDoc, doc, getDoc, collection,addDoc} from "firebase/firestore";
class UserService {

  async getUser(userId) {
    try {
      const userRef = doc(db,'users',userId);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists) {
        return { id: userDoc.id, ...userDoc.data() };
      } else {
        return null;
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async updateUser(userId, userData) {
    try {
      const userRef = doc(db,'users',userId);
      await userRef.update(userData);
      return true;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async createUser(userData) {
    try {
      const userRef = await setDoc(doc(db, "users",userData.uid),
        userData
      );
      
      return userRef?.id;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export default new UserService();