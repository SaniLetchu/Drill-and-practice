import { executeQuery } from "../../database/database.js";

const getQuestion = async ({ response }) => {
  const result = await executeQuery(
    "SELECT * FROM questions ORDER BY RANDOM() LIMIT 1",
  );

  if (result && result.rows.length > 0) {
    const list = [];
    const result1 = await executeQuery(
      "SELECT * FROM question_answer_options WHERE question_id = $id ORDER BY id",
      {
        id: result.rows[0].id,
      },
    );
    result1.rows.forEach((option) => {
      list.push({ "optionId": option.id, "optionText": option.option_text });
    });

    response.body = {
      "questionId": result.rows[0].id,
      "questionText": result.rows[0].question_text,
      "answerOptions": list,
    };
  } else {
    response.body = {};
  }
};

const checkAnswer = async ({ params, response, request }) => {
  const body = request.body({ type: "json" });
  const content = await body.value;

  if (!content.questionId) {
    response.status = 400;
    return;
  }
  if (!content.optionId) {
    response.status = 400;
    return;
  }

  const result = await executeQuery(
    "SELECT * FROM question_answer_options WHERE question_id = $q AND id = $o;",
    {
      q: content.questionId,
      o: content.optionId,
    },
  );

  if (result && result.rows.length > 0) {
    response.body = {
      "correct": result.rows[0].is_correct,
    };
  } else {
    response.status = 404;
  }
};

export { checkAnswer, getQuestion };
