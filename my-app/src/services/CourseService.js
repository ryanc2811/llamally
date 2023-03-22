import { db, app } from "../utils/firebase";
import { query, where, getDocs, getDoc, doc, collection, addDoc ,and} from "firebase/firestore"

export const getAllCourses = async () => {
  const coursesRef = collection(db, "courses");
  const snapshot = await getDocs(coursesRef);
  const courses = [];
  snapshot.forEach((doc) => {
    const data = doc.data();
    courses.push({
      id: doc.id,
      title: data.title,
      description: data.description,
      tutor_id: data.tutor_id,
      published: data.published,
      sections: data.sections,
    });
  });
  return courses;
}
export const getPublishedCourses = async () => {
  const coursesRef = collection(db, "courses");
  const q = query(coursesRef, where("published", "==", true))
  const snapshot = await getDocs(q);
  const courses = [];
  snapshot.forEach((doc) => {
    const data = doc.data();

    courses.push({
      id: doc.id,
      title: data.title,
      description: data.description,
      tutor_id: data.tutor_id,
      published: data.published,
    });
  });
  return courses;
}
export const getTutorsCourses = async (tutor_id) => {
  const coursesRef = collection(db, "courses");
  const q = query(coursesRef, where("tutor_id", "==", tutor_id),where("published", "==", true))
  const snapshot = await getDocs(q);
  const courses = [];
  snapshot.forEach((doc) => {
    const data = doc.data();

    courses.push({
      id: doc.id,
      title: data.title,
      description: data.description,
      tutor_id: data.tutor_id,
      published: data.published,
    });
  });
  return courses;
}
export const getCourseById = async (id) => {
  const courseRef = doc(db, 'courses', id);
  const courseDoc = await getDoc(courseRef)
  if (!courseDoc.exists) {
    throw new Error("Course not found");
  }
  const data = courseDoc.data();
  return {
    id: courseDoc.id,
    title: data.title,
    description: data.description,
    tutor_id: data.tutor_id,
    published: data.published,
  };
}

export const createCourse = async (course) => {
  try {
    const courseRef = await addDoc(doc(db, "courses"),
      course
    );

    return courseRef.id;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const updateCourse = async (id, updatedCourse) => {
  const courseRef = db.collection("courses").doc(id);
  await courseRef.update(updatedCourse);
}

export const deleteCourse = async (id) => {
  const courseRef = db.collection("courses").doc(id);
  await courseRef.delete();
}

export const addCourseSection = async (courseId, section) => {
  const courseRef = db.collection("courses").doc(courseId);
  await courseRef.update({
    sections: app.firestore.FieldValue.arrayUnion(section),
  });
}

export const updateCourseSection = async (courseId, sectionIndex, updatedSection) => {
  const courseRef = db.collection("courses").doc(courseId);
  await courseRef.update({
    [`sections.${sectionIndex}`]: updatedSection,
  });
}

export const deleteCourseSection = async (courseId, sectionIndex) => {
  const courseRef = db.collection("courses").doc(courseId);
  await courseRef.update({
    sections: app.firestore.FieldValue.arrayRemove(
      courseRef.sections[sectionIndex]
    ),
  });
}
