import * as topicService from "../../services/topicService.js";
import * as questionService from "../../services/questionService.js";

const showQuiz = async ({ render }) => {
  render("quiz.eta", {
    topics: await topicService.listTopics(),
  });
};

const showCorrect = async ({ render, params }) => {
  render("correct.eta", {
    topic: await topicService.findTopicById(params.tId),
  });
};

const showIncorrect = async ({ render, params }) => {
  render("incorrect.eta", {
    topic: await topicService.findTopicById(params.tId),
    corrects: await questionService.findCorrectOptions(params.qId),
  });
};

const showSpecificQuiz = async ({ render, params }) => {
  render("specificQuiz.eta", {
    topic: await topicService.findTopicById(params.tId),
    question: await questionService.findQuestionById(params.qId),
    options: await questionService.listQuestionOptions(params.qId),
  });
};

const storeAnswer = async ({ render, params, user, response }) => {
  await questionService.addQuestionAnswer(user.id, params.qId, params.oId);
  const option = await questionService.findOptionById(params.oId);
  if (option.is_correct) {
    response.redirect(`/quiz/${params.tId}/questions/${params.qId}/correct`);
  } else {
    response.redirect(`/quiz/${params.tId}/questions/${params.qId}/incorrect`);
  }
};

const getRandomQuestion = async ({ response, params, render }) => {
  const question = await questionService.getRandomQuestionWithTopicId(
    params.tId,
  );
  if (!question) {
    render("noquestions.eta", {
      topic: await topicService.findTopicById(params.tId),
    });
  } else {
    response.redirect(`/quiz/${params.tId}/questions/${question.id}`);
  }
};

export {
  getRandomQuestion,
  showCorrect,
  showIncorrect,
  showQuiz,
  showSpecificQuiz,
  storeAnswer,
};
