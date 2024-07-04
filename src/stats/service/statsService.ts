import { getGradesTotal } from "../../grades/service/gradesService.js";
import { courses, grades, students } from "../../index.js";
import { getStudentsTotal } from "../../students/service/studentsService.js";
import { CourseStats } from "../../types";

export const getCourseStats = (courseId: number): CourseStats => {
  const courseStatsId = grades.filter((grade) => grade.courseId === courseId);

  const approvedCriteria: number = 5;

  let failedCount: number = 0;

  const studentsCount = courseStatsId.length;

  for (const grade of courseStatsId) {
    if (grade.value < approvedCriteria) failedCount++;
  }

  const passedCount = courseStatsId.length - failedCount;

  const failedCountPercentage: number =
    (failedCount / courseStatsId.length) * 100;

  const passedPercentGrades: number = 100 - failedCountPercentage;

  let averageGrade: number = 0;

  for (let grade = 0; grade < courseStatsId.length; grade++) {
    if (grade != courseStatsId.length - 1) {
      averageGrade += courseStatsId[grade].value;
    } else {
      averageGrade += courseStatsId[grade].value;
      averageGrade = averageGrade / courseStatsId.length;
    }
  }

  let highestGrade: number = 0;

  let highestGradeStudentId: number = 0;

  for (const grade of courseStatsId) {
    if (grade.value >= highestGrade) {
      highestGrade = grade.value;
      highestGradeStudentId = grade.studentId;
    }
  }

  const courseStats: CourseStats = {
    courseId: courseId,
    studentsCount: studentsCount,
    passedCount: passedCount,
    passedCountPercentage: passedPercentGrades,
    failedCount: failedCount,
    failedCountPercentage: failedCountPercentage,
    averageGrade: averageGrade,
    highestGrade: highestGrade,
    highestGradeStudentId: highestGradeStudentId,
  };
  return courseStats;
};
