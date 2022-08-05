import * as topicService from "../../services/topicService.js";
import * as questionService from "../../services/questionService.js";
import { validasaur } from "../../deps.js";

const formValidationRules = {
  name: [validasaur.required, validasaur.minLength(1)],
};

const showTopic = async ({ render }) => {
  render("topic.eta", { topics: await topicService.listTopics(), name: "" });
};

const getFormData = async (request) => {
  const body = request.body({ type: "form" });
  const params = await body.value;
  return {
    name: params.get("name"),
  };
};

const submitFormTopic = async ({ request, response, user, render }) => {
  if (user.admin) {
    const data = await getFormData(request);
    const [passes, errors] = await validasaur.validate(
      data,
      formValidationRules,
    );

    if (!passes) {
      data.validationErrors = errors;
      data.topics = await topicService.listTopics();
      render("topic.eta", data);
    } else {
      await topicService.addTopic(
        user.id,
        data.name,
      );

      response.redirect("/topics");
    }
  } else {
    response.redirect("/topics");
  }
};

const deleteTopic = async ({ params, request, response, user, render }) => {
  if (user.admin) {
    const topicId = params.id;
    const res = await questionService.findQuestionsByTopicId(topicId);
    for (const question of res) {
      await questionService.deleteAnswersWithQuestionId(question.id);
      await questionService.deleteOptionsWithQuestionId(question.id);
      await questionService.deleteQuestion(question.id);
    }
    await topicService.deleteTopic(topicId);
    response.redirect("/topics");
  } else {
    response.redirect("/topics");
  }
};

export { deleteTopic, showTopic, submitFormTopic };
