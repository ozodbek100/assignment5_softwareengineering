import assert from "node:assert/strict";
import { after, before, describe, test } from "node:test";
import { createAppServer } from "../src/server.js";

describe("HTTP API", () => {
  let server;
  let baseURL;

  before(async () => {
    server = createAppServer();
    await new Promise((resolve) => server.listen(0, resolve));
    baseURL = `http://localhost:${server.address().port}`;
  });

  after(() => new Promise((resolve) => server.close(resolve)));

  test("BUG-101: grade request for a deleted student returns 404", async () => {
    const created = await fetch(`${baseURL}/transcripts`, {
      method: "POST",
      body: JSON.stringify({ name: "Mia" }),
    });
    const { studentID } = await created.json();
    await fetch(`${baseURL}/transcripts/${studentID}/CS360`, {
      method: "POST",
      body: JSON.stringify({ grade: 90 }),
    });

    const deleted = await fetch(`${baseURL}/transcripts/${studentID}`, {
      method: "DELETE",
    });
    assert.equal(deleted.status, 204);

    const response = await fetch(`${baseURL}/transcripts/${studentID}/CS360`);
    assert.equal(response.status, 404);
  });
});
