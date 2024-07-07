import { showErrorModal } from "../../dom/index.js";
import { students } from "../../index.js";
import { Student } from "../../types.js";
import { generateId } from "../../utils.js";

export const getStudentsTotal = (students: Student[]): number =>
  students.length;

export const addStudent = (
  students: Student[],
  name: string,
  lastName: string,
  age: number,
  email: string,
  phoneNumber: string
): void => {
  const newStudent: Student = {
    id: generateId(students),
    name,
    lastName,
    age,
    email,
    phoneNumber,
  };

  if (students.some((student) => student.email === email)) {
    showErrorModal("Este estudiante ya esta inscrito");
  } else {
    students.push(newStudent);
  }
};

export const deleteStudent = (students: Student[], id: number): void => {
  const deleteStudent = students.findIndex((student) => student.id === id);

  if (deleteStudent !== -1) {
    students.splice(deleteStudent, 1);
  }
};

export const getStudentsOptions = (
  students: Student[]
): { id: number; name: string; lastName: string }[] => {
  const studentData = students.map((student) => ({
    id: student.id,
    name: student.name,
    lastName: student.lastName,
  }));

  return studentData;
};

export const getStudentNameById = (
  students: Student[],
  studentId: number
): string => {
  const studentCompleteName = students.find(
    (student) => studentId === student.id
  );

  if (studentCompleteName) {
    return `${studentCompleteName.name} ${studentCompleteName.lastName}`;
  }
  return "No existe el estudiante";
};
