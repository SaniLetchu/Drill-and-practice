import * as topicService from "../../services/topicService.js";
import * as questionService from "../../services/questionService.js";
import { validasaur } from "../../deps.js";

const showTopic = async ({ params, render }) => {
  render("specificTopic.eta", {
    topic: await topicService.findTopicById(params.id),
    questions: await questionService.listQuestions(params.id),
    question_text: "",
  });
};

const formValidationRules = {
  question_text: [validasaur.required, validasaur.minLength(1)],
};

const getFormData = async (request) => {
  const body = request.body({ type: "form" });
  const params = await body.value;
  return {
    question_text: params.get("question_text"),
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
    data.questions = await questionService.listQuestions(params.id);
    data.topic = await topicService.findTopicById(params.id);
    render("specificTopic.eta", data);
  } else {
    await questionService.addQuestion(
      user.id,
      params.id,
      data.question_text,
    );

    response.redirect(`/topics/${params.id}`);
  }
};

export { showTopic, submitForm };
