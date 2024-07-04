import { courses, grades, students } from "../../index.js";
import { showErrorModal } from "../../dom/index.js";
import { Grade } from "../../types";
import { generateId } from "../../utils.js";

export const getGradesTotal = (grades: Grade[]): number => grades.length;

export const getGradeFullData = (
  grade: Grade
): {
  value: number;
  studentName: string;
  studentLastName: string;
  courseName: string;
} => {
  const studentData = students.find(
    (student) => student.id === grade.studentId
  );
  const courseData = courses.find((course) => course.id === grade.courseId);

  return {
    value: grade.value,
    studentName: studentData
      ? studentData.name
      : "No se ha  encontrado el nombre del usuario",
    studentLastName: studentData
      ? studentData.lastName
      : "No se ha encontrado el apellido del usuario",
    courseName: courseData
      ? courseData.name
      : "No se ha encontrado nombre el curso",
  };
};

export const deleteGrade = (grades: Grade[], id: number): void => {
  const deleteGrade = grades.findIndex((grade) => grade.id === id);

  if (deleteGrade !== -1) {
    grades.splice(deleteGrade, 1);
  }
};

export const addGrade = (
  grades: Grade[],
  studentId: number,
  courseId: number,
  value: number
): void => {
  const newGrade: Grade = {
    id: generateId(grades),
    studentId,
    courseId,
    value,
  };

  if (
    grades.some(
      (newGrade) =>
        newGrade.studentId === studentId &&
        newGrade.courseId === courseId &&
        newGrade.value === value
    )
  ) {
    showErrorModal("Este estudiante ya tiene una nota");
  } else {
    grades.push(newGrade);
  }
};
