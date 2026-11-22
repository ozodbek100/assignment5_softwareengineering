// Shared validation helpers for TranscriptStore (REF-201).
// Error messages are part of the public behavior (server.js maps them to
// HTTP status codes), so they must not change.

/** Trim + upper-case a course code. Never throws; used for lookups too. */
export function normalizeCourse(course) {
  return String(course ?? "").trim().toUpperCase();
}

/** Normalize a course code and require it to be non-empty. */
export function requireCourse(course) {
  const normalizedCourse = normalizeCourse(course);
  if (!normalizedCourse) {
    throw new Error("Course name is required");
  }
  return normalizedCourse;
}

/** Convert a grade to a number and require an integer from 0 to 100. */
export function requireGrade(grade) {
  const numericGrade = Number(grade);
  if (!Number.isInteger(numericGrade) || numericGrade < 0 || numericGrade > 100) {
    throw new Error("Grade must be an integer from 0 to 100");
  }
  return numericGrade;
}

/** Convert a student ID to a number and require a positive integer. */
export function parseStudentID(studentID) {
  const parsedID = Number(studentID);
  if (!Number.isInteger(parsedID) || parsedID <= 0) {
    throw new Error("Student ID must be a positive integer");
  }
  return parsedID;
}
