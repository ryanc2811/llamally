import { db } from '../utils/firebase';
import { setDoc, doc, getDoc, getDocs, collection, addDoc, query, where, deleteDoc } from "firebase/firestore";


export const getTutor = async (id) => {
  const tutorRef = doc(db, 'tutors', id);
  const tutorDoc = await getDoc(tutorRef)
  if (!tutorDoc.exists) {
    throw new Error("Tutor not found");
  }
  const data = tutorDoc.data();
  return data;
}

export const getTutorByUser = async (id) => {
  const q = query(collection(db, 'tutors'), where("user_id", "==", id));

  const tutorDocs = await getDocs(q);
  let tutors = [];
  tutorDocs.forEach((doc) => {
    tutors.push({ id: doc.id, ...doc.data() })
  });

  return tutors[0];
}
export const removeTutor = async (user_id) => {
  try {

    const tutor = await getTutorByUser(user_id);

    if (tutor) {
      await deleteDoc(doc(db, "tutors", tutor.id));

      return true;
    }

    return false;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
export const updateTutor = async (tutorId, tutorData) => {
  try {
    const tutorRef = doc(db, 'tutors', tutorId);
    await tutorRef.update(tutorData);
    return true;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const createTutor = async (tutorData) => {
  try {
    const tutorRef = await addDoc(collection(db, "tutors"), {
      display_name: tutorData.display_name,
      work_email: tutorData.work_email,
      user_id: tutorData.user_id,
      bio: tutorData.bio
    });


    return tutorRef.id;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
