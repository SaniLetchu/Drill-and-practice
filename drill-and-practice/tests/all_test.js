import { superoak } from "https://deno.land/x/superoak@4.7.0/mod.ts";
import { app } from "../app.js";
import * as questionService from "../services/questionService.js";
import * as userService from "../services/userService.js";
import {
  assertEquals,
  assertMatch,
} from "https://deno.land/std@0.100.0/testing/asserts.ts";

Deno.test({
  name: "Should get the main site normally status 200",
  fn: async () => {
    const testClient = await superoak(app);
    await testClient.get("/").expect(200);
  },
  sanitizeResources: false,
  sanitizeOps: false,
});

Deno.test({
  name: "Test login functionality with admin credentials",
  fn: async () => {
    const credentials = "email=admin@admin.com&password=123456";
    const testClient = await superoak(app);
    await testClient.post("/auth/login").send(credentials)
      .expect(302);
  },
  sanitizeResources: false,
  sanitizeOps: false,
});

Deno.test({
  name: "Test registration functionality",
  fn: async () => {
    const registrationCredentials = "email=test@test.com&password=test";
    const registrationEmail = "test@test.com";
    const testClient = await superoak(app);
    await testClient.post("/auth/register").send(registrationCredentials)
      .expect(302);

    const user = await userService.findUserByEmail(registrationEmail);

    //Delete the test user
    await userService.deleteUser(user[0].id);
  },
  sanitizeResources: false,
  sanitizeOps: false,
});

Deno.test({
  name: "Api returns JSON",
  fn: async () => {
    const testClient = await superoak(app);
    await testClient.get("/api/questions/random")
      .expect("Content-Type", new RegExp("application/json"));
  },
  sanitizeResources: false,
  sanitizeOps: false,
});

//Only works if there is data in the database

Deno.test({
  name: "Api return JSON that contains exactly 3 objects",
  fn: async () => {
    const testClient = await superoak(app);
    const result = await testClient.get("/api/questions/random");
    assertEquals(Object.keys(result.body).length, 3);
  },
  sanitizeResources: false,
  sanitizeOps: false,
});

//Only works if there is data in the database
Deno.test({
  name: "Api returns JSON that contains exactly 3 specific objects",
  fn: async () => {
    const testClient = await superoak(app);
    const result = await testClient.get("/api/questions/random");
    const objectKeys = Object.keys(result.body);
    assertMatch(
      objectKeys,
      new RegExp(["questionId", "questionText", "answerOptions"]),
    );
  },
  sanitizeResources: false,
  sanitizeOps: false,
});

Deno.test({
  name:
    "POST request to Api with wrong data should return status error 400 ('Invalid input')",
  fn: async () => {
    const testClient = await superoak(app);
    await testClient.post("/api/questions/answer").send({
      "nothing": 0,
    }).expect(400);
  },
  sanitizeResources: false,
  sanitizeOps: false,
});

//Only works if there are answers
Deno.test({
  name: "findAllAnswers functionality works",
  fn: async () => {
    const res = await questionService.findAllAnswers();
    assertEquals(Object.keys(res[0]), [
      "id",
      "user_id",
      "question_id",
      "question_answer_option_id",
    ]);
  },
  sanitizeResources: false,
  sanitizeOps: false,
});

//Only works if there are options
Deno.test({
  name: "findAllOptions functionality works",
  fn: async () => {
    const res = await questionService.findAllOptions();
    assertEquals(Object.keys(res[0]), [
      "id",
      "question_id",
      "option_text",
      "is_correct",
    ]);
  },
  sanitizeResources: false,
  sanitizeOps: false,
});

//Only works if there are questions
Deno.test({
  name: "findAllOptions functionality works",
  fn: async () => {
    const res = await questionService.findAllQuestions();
    assertEquals(Object.keys(res[0]), [
      "id",
      "user_id",
      "topic_id",
      "question_text",
    ]);
  },
  sanitizeResources: false,
  sanitizeOps: false,
});
