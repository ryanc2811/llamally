import {db}from '../utils/firebase';
import {setDoc, doc, getDoc, collection,addDoc} from "firebase/firestore";


export const getTutor=  async (id)=> {
    const tutorRef = doc(db,'tutors',id);
    const tutorDoc = await getDoc(tutorRef)
    if (!tutorDoc.exists) {
      throw new Error("Course not found");
    }
    const data = tutorDoc.data();
    return data;
  }

  export const updateTutor = async (tutorId, tutorData) =>{
    try {
      const tutorRef = doc(db,'tutors',tutorId);
      await tutorRef.update(tutorData);
      return true;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  export const createTutor=async(tutorData) =>{
    try {
      const tutorRef = await setDoc(doc(db, "tutors",tutorData.uid),
        tutorData
      );
      
      return tutorRef?.id;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
