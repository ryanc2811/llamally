import { db,app } from "../utils/firebase";
import {query, where, getDocs,getDoc, doc, collection} from "firebase/firestore"

  export const getAllCourses = async ()=> {
    const coursesRef = collection(db,"courses");
    const snapshot = await getDocs(coursesRef);
    const courses = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      courses.push({
        id: doc.id,
        name: data.name,
        description: data.description,
        tutorId: data.tutorId,
        published: data.published,
        sections: data.sections,
      });
    });
    return courses;
  }
  export const getPublishedCourses= async ()=> {
    const coursesRef = collection(db,"courses");
    const q=query(coursesRef,where ("published","==",true))
    const snapshot = await getDocs(q);
    const courses = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      
      courses.push({
        id: doc.id,
        name: data.name,
        description: data.description,
        tutorId: data.tutorId,
        published: data.published,
        sections: data.sections,
      });
    });
    return courses;
  }
  export const getCourseById= async(id)=> {
    const courseRef = doc(db,'courses',id);
    const courseDoc = await getDoc(courseRef)
    if (!courseDoc.exists) {
      throw new Error("Course not found");
    }
    const data = courseDoc.data();
    return {
      id: courseDoc.id,
      name: data.name,
      description: data.description,
      tutor_id: data.tutor_id,
      published: data.published,
      sections: data.sections,
    };
  }

  export const createCourse= async (course) =>{
    const courseRef = await db.collection("courses").add(course);
    return courseRef.id;
  }

  export const updateCourse= async (id, updatedCourse) =>{
    const courseRef = db.collection("courses").doc(id);
    await courseRef.update(updatedCourse);
  }

  export const deleteCourse=async (id)=> {
    const courseRef = db.collection("courses").doc(id);
    await courseRef.delete();
  }

  export const addCourseSection=async (courseId, section)=> {
    const courseRef = db.collection("courses").doc(courseId);
    await courseRef.update({
      sections: app.firestore.FieldValue.arrayUnion(section),
    });
  }

  export const updateCourseSection=async(courseId, sectionIndex, updatedSection) =>{
    const courseRef = db.collection("courses").doc(courseId);
    await courseRef.update({
      [`sections.${sectionIndex}`]: updatedSection,
    });
  }

  export const deleteCourseSection= async(courseId, sectionIndex)=> {
    const courseRef = db.collection("courses").doc(courseId);
    await courseRef.update({
      sections: app.firestore.FieldValue.arrayRemove(
        courseRef.sections[sectionIndex]
      ),
    });
  }
