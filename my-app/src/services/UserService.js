import {db}from '../utils/firebase';
import 'firebase/firestore';

class UserService {

  async getUser(userId) {
    try {
      const userRef = db.collection('users').doc(userId);
      const userDoc = await userRef.get();
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
      const userRef = db.collection('users').doc(userId);
      await userRef.update(userData);
      return true;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async createUser(userData) {
    try {
      const userRef = await db.collection('users').add(userData);
      return userRef.id;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export default UserService;