import { db,firebase } from "../utils/firebase";
import {query, where, getDocs} from "firebase/firestore"
class CourseService {
  async getAllCourses() {
    const coursesRef = db.collection("courses");
    const snapshot = await coursesRef.get();
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
  async getPublishedCourses() {
    const coursesRef = db.collection("courses");
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
  async getCourseById(id) {
    const courseRef = db.collection("courses").doc(id);
    const doc = await courseRef.get();
    if (!doc.exists) {
      throw new Error("Course not found");
    }
    const data = doc.data();
    return {
      id: doc.id,
      name: data.name,
      description: data.description,
      tutorId: data.tutorId,
      published: data.published,
      sections: data.sections,
    };
  }

  async createCourse(course) {
    const courseRef = await db.collection("courses").add(course);
    return courseRef.id;
  }

  async updateCourse(id, updatedCourse) {
    const courseRef = db.collection("courses").doc(id);
    await courseRef.update(updatedCourse);
  }

  async deleteCourse(id) {
    const courseRef = db.collection("courses").doc(id);
    await courseRef.delete();
  }

  async addCourseSection(courseId, section) {
    const courseRef = db.collection("courses").doc(courseId);
    await courseRef.update({
      sections: firebase.firestore.FieldValue.arrayUnion(section),
    });
  }

  async updateCourseSection(courseId, sectionIndex, updatedSection) {
    const courseRef = db.collection("courses").doc(courseId);
    await courseRef.update({
      [`sections.${sectionIndex}`]: updatedSection,
    });
  }

  async deleteCourseSection(courseId, sectionIndex) {
    const courseRef = db.collection("courses").doc(courseId);
    await courseRef.update({
      sections: firebase.firestore.FieldValue.arrayRemove(
        courseRef.sections[sectionIndex]
      ),
    });
  }
}

export default CourseService();