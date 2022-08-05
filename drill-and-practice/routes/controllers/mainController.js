import * as topicService from "../../services/topicService.js";
import * as questionService from "../../services/questionService.js";
import * as userService from "../../services/userService.js";

const showMain = async ({ render }) => {
  render("main.eta", {
    users: (await userService.findAll()).length,
    topics: (await topicService.findAll()).length,
    questions: (await questionService.findAllQuestions()).length,
    options: (await questionService.findAllOptions()).length,
    answers: (await questionService.findAllAnswers()).length,
  });
};

export { showMain };
