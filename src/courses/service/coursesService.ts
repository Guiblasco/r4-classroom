import { showErrorModal } from "../../dom/index.js";
import { Course } from "../../types";
import { generateId } from "../../utils.js";

export const getCoursesTotal = (courses: Course[]): number => courses.length;

export const addCourse = (courses: Course[], name: string): void => {
  const newCourse: Course = { id: generateId(courses), name: name };

  if (courses.includes(newCourse)) {
    showErrorModal("El curso a crear ya existe");
  } else {
    courses.push(newCourse);
  }
};

export const deleteCourse = (courses: Course[], id: number): void => {
  const deleteCourseId = courses.findIndex((course) => course.id === id);

  if (deleteCourseId !== -1) {
    courses.splice(deleteCourseId, 1);
  }
};

export const getCoursesOptions = (
  courses: Course[]
): { id: number; name: string }[] => {
  const courseData = courses.map((course) => ({
    id: course.id,
    name: course.name,
  }));

  return courseData;
};
