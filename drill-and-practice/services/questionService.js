import { executeQuery } from "../database/database.js";

const addQuestion = async (userId, topicId, question_text) => {
  await executeQuery(
    `INSERT INTO questions
      (user_id, topic_id, question_text) VALUES ($userId, $topicId, $question_text)`,
    {
      userId: userId,
      topicId: topicId,
      question_text: question_text,
    },
  );
};

const addQuestionOption = async (questionId, option_text, is_correct) => {
  await executeQuery(
    `INSERT INTO question_answer_options
      (question_id, option_text, is_correct) VALUES ($questionId, $option_text, $is_correct)`,
    {
      questionId: questionId,
      option_text: option_text,
      is_correct: is_correct,
    },
  );
};

const addQuestionAnswer = async (userId, questionId, questionOptionId) => {
  await executeQuery(
    `INSERT INTO question_answers
      (user_id, question_id, question_answer_option_id) VALUES ($userId, $questionId, $questionOptionId)`,
    {
      userId: userId,
      questionId: questionId,
      questionOptionId: questionOptionId,
    },
  );
};

const listQuestions = async (topic_id) => {
  const res = await executeQuery(
    `SELECT * FROM questions WHERE topic_id = $topic_id`,
    {
      topic_id: topic_id,
    },
  );
  return res.rows;
};

const deleteOption = async (option_id) => {
  await executeQuery(
    `DELETE FROM question_answer_options WHERE id = $option_id`,
    {
      option_id: option_id,
    },
  );
};

const deleteQuestion = async (question_id) => {
  await executeQuery(
    `DELETE FROM questions WHERE id = $question_id`,
    {
      question_id: question_id,
    },
  );
};

const deleteOptionsWithQuestionId = async (question_id) => {
  await executeQuery(
    `DELETE FROM question_answer_options WHERE question_id = $question_id`,
    {
      question_id: question_id,
    },
  );
};

const deleteAnswersWithQuestionId = async (question_id) => {
  await executeQuery(
    `DELETE FROM question_answers WHERE question_id = $question_id`,
    {
      question_id: question_id,
    },
  );
};

const deleteAnswersWithOptionId = async (option_id) => {
  await executeQuery(
    `DELETE FROM question_answers WHERE question_answer_option_id = $option_id`,
    {
      option_id: option_id,
    },
  );
};

const listQuestionOptions = async (qId) => {
  const res = await executeQuery(
    `SELECT * FROM question_answer_options WHERE question_id = $qId`,
    {
      qId: qId,
    },
  );
  return res.rows;
};

const findQuestionById = async (id) => {
  const res = await executeQuery(`SELECT * FROM questions WHERE id = $id`, {
    id: id,
  });

  return res.rows[0];
};

const findOptionById = async (id) => {
  const res = await executeQuery(
    `SELECT * FROM question_answer_options WHERE id = $id`,
    {
      id: id,
    },
  );
  return res.rows[0];
};

const getRandomQuestionWithTopicId = async (id) => {
  const res = await executeQuery(
    `SELECT * FROM questions WHERE topic_id = $id ORDER BY RANDOM() LIMIT 1`,
    {
      id: id,
    },
  );

  return res.rows[0];
};

const findQuestionsByTopicId = async (topic_id) => {
  const res = await executeQuery(
    `SELECT * FROM questions WHERE topic_id = $topic_id`,
    {
      topic_id: topic_id,
    },
  );
  return res.rows;
};

const findCorrectOptions = async (question_id) => {
  const res = await executeQuery(
    `SELECT * FROM question_answer_options WHERE question_id = $question_id AND is_correct = TRUE`,
    {
      question_id: question_id,
    },
  );
  return res.rows;
};

const findAllQuestions = async () => {
  const result = await executeQuery(
    "SELECT * FROM questions",
  );
  return result.rows;
};

const findAllOptions = async () => {
  const result = await executeQuery(
    "SELECT * FROM question_answer_options",
  );
  return result.rows;
};

const findAllAnswers = async () => {
  const result = await executeQuery(
    "SELECT * FROM question_answers",
  );
  return result.rows;
};

export {
  addQuestion,
  addQuestionAnswer,
  addQuestionOption,
  deleteAnswersWithOptionId,
  deleteAnswersWithQuestionId,
  deleteOption,
  deleteOptionsWithQuestionId,
  deleteQuestion,
  findAllAnswers,
  findAllOptions,
  findAllQuestions,
  findCorrectOptions,
  findOptionById,
  findQuestionById,
  findQuestionsByTopicId,
  getRandomQuestionWithTopicId,
  listQuestionOptions,
  listQuestions,
};
