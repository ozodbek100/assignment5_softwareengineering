import assert from "node:assert/strict";
import { describe, test } from "node:test";
import {
  normalizeCourse,
  parseStudentID,
  requireCourse,
  requireGrade,
} from "../src/validation.js";

describe("validation", () => {
  test("normalizeCourse trims and upper-cases without throwing", () => {
    assert.equal(normalizeCourse(" cs360 "), "CS360");
    assert.equal(normalizeCourse(undefined), "");
  });

  test("requireCourse rejects empty course names", () => {
    assert.equal(requireCourse("cs360"), "CS360");
    assert.throws(() => requireCourse("  "), /Course name is required/);
  });

  test("requireGrade accepts integers 0-100 only", () => {
    assert.equal(requireGrade("85"), 85);
    assert.throws(() => requireGrade(101), /Grade must be an integer from 0 to 100/);
    assert.throws(() => requireGrade(7.5), /Grade must be an integer from 0 to 100/);
  });

  test("parseStudentID requires a positive integer", () => {
    assert.equal(parseStudentID("3"), 3);
    assert.throws(() => parseStudentID(0), /Student ID must be a positive integer/);
  });
});
