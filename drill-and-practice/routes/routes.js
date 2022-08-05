import { Router } from "../deps.js";
import * as mainController from "./controllers/mainController.js";
import * as registrationController from "./controllers/registrationController.js";
import * as loginController from "./controllers/loginController.js";
import * as topicController from "./controllers/topicController.js";
import * as specificTopicController from "./controllers/specificTopicController.js";
import * as quizController from "./controllers/quizController.js";
import * as questionController from "./controllers/questionController.js";
import * as quizApi from "./apis/quizApi.js";

const router = new Router();

router.get("/", mainController.showMain);

router.get("/auth/register", registrationController.showRegistrationForm);
router.post("/auth/register", registrationController.registerUser);

router.get("/auth/login", loginController.showLoginForm);
router.post("/auth/login", loginController.processLogin);

router.get("/topics", topicController.showTopic);
router.get("/topics/:id", specificTopicController.showTopic);
router.post("/topics/:id/questions", specificTopicController.submitForm);
router.get("/topics/:tId/questions/:qId", questionController.showQuestion);
router.post(
  "/topics/:tId/questions/:qId/options",
  questionController.submitForm,
);
router.post(
  "/topics/:tId/questions/:qId/options/:oId/delete",
  questionController.deleteOption,
);

router.post(
  "/topics/:tId/questions/:qId/delete",
  questionController.deleteQuestion,
);
router.post(
  "/topics/:id/delete",
  topicController.deleteTopic,
);

router.post("/topics", topicController.submitFormTopic);
router.get("/quiz", quizController.showQuiz);
router.get("/quiz/:tId", quizController.getRandomQuestion);
router.get("/quiz/:tId/questions/:qId", quizController.showSpecificQuiz);
router.post(
  "/quiz/:tId/questions/:qId/options/:oId",
  quizController.storeAnswer,
);
router.get("/quiz/:tId/questions/:qId/correct", quizController.showCorrect);
router.get("/quiz/:tId/questions/:qId/incorrect", quizController.showIncorrect);
router.get("/api/questions/random", quizApi.getQuestion);
router.post("/api/questions/answer", quizApi.checkAnswer);

export { router };
