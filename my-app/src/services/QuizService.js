import { firestore } from '../utils/firebase';

const QUIZ_COLLECTION = 'quizzes';

// Get a quiz by id
export const getQuizById = async (id) => {
  try {
    const quizRef = firestore.collection(QUIZ_COLLECTION).doc(id);
    const quizDoc = await quizRef.get();

    if (quizDoc.exists) {
      return { id: quizDoc.id, ...quizDoc.data() };
    } else {
      throw new Error('Quiz not found');
    }
  } catch (error) {
    console.error('Error getting quiz:', error);
    throw error;
  }
};

// Create a new quiz
export const createQuiz = async (quizData) => {
  try {
    const quizRef = await firestore.collection(QUIZ_COLLECTION).add(quizData);
    return quizRef.id;
  } catch (error) {
    console.error('Error creating quiz:', error);
    throw error;
  }
};

// Update an existing quiz
export const updateQuiz = async (id, quizData) => {
  try {
    const quizRef = firestore.collection(QUIZ_COLLECTION).doc(id);
    await quizRef.update(quizData);
  } catch (error) {
    console.error('Error updating quiz:', error);
    throw error;
  }
};

// Delete an existing quiz
export const deleteQuiz = async (id) => {
  try {
    const quizRef = firestore.collection(QUIZ_COLLECTION).doc(id);
    await quizRef.delete();
  } catch (error) {
    console.error('Error deleting quiz:', error);
    throw error;
  }
};