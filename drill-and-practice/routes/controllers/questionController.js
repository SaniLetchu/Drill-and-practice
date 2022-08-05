import * as questionService from "../../services/questionService.js";
import * as topicService from "../../services/topicService.js";
import { validasaur } from "../../deps.js";

const formValidationRules = {
  option_text: [validasaur.required, validasaur.minLength(1)],
};

const getFormData = async (request) => {
  const body = request.body({ type: "form" });
  const params = await body.value;
  return {
    option_text: params.get("option_text"),
    is_correct: params.get("is_correct"),
  };
};

const submitForm = async ({ params, request, response, user, render }) => {
  const data = await getFormData(request);
  const [passes, errors] = await validasaur.validate(
    data,
    formValidationRules,
  );

  if (!passes) {
    data.validationErrors = errors;
    data.question = await questionService.findQuestionById(params.qId);
    data.topic = await topicService.findTopicById(params.tId);
    data.options = await questionService.listQuestionOptions(params.qId);
    if (data.is_correct != null) {
      data.is_correct = "checked";
    }
    render("question.eta", data);
  } else {
    if (data.is_correct != null) {
      data.is_correct = true;
    } else {
      data.is_correct = false;
    }
    await questionService.addQuestionOption(
      params.qId,
      data.option_text,
      data.is_correct,
    );
    response.redirect(`/topics/${params.tId}/questions/${params.qId}`);
  }
};

const deleteQuestion = async ({ params, request, response, user, render }) => {
  const questionId = params.qId;
  await questionService.deleteQuestion(
    questionId,
  );
  response.redirect(`/topics/${params.tId}`);
};

const deleteOption = async ({ params, request, response, user, render }) => {
  const optionId = params.oId;
  await questionService.deleteAnswersWithOptionId(optionId);
  await questionService.deleteOption(
    optionId,
  );
  response.redirect(`/topics/${params.tId}/questions/${params.qId}`);
};

const showQuestion = async ({ render, params }) => {
  render("question.eta", {
    question: await questionService.findQuestionById(params.qId),
    topic: await topicService.findTopicById(params.tId),
    options: await questionService.listQuestionOptions(params.qId),
    option_text: "",
    is_correct: "",
  });
};

export { deleteOption, deleteQuestion, showQuestion, submitForm };
