import { executeQuery } from "../database/database.js";

const addTopic = async (userId, name) => {
  await executeQuery(
    `INSERT INTO topics
      (user_id, name) VALUES ($userId, $name)`,
    {
      userId: userId,
      name: name,
    },
  );
};

const deleteTopic = async (topic_id) => {
  await executeQuery(
    `DELETE FROM topics WHERE id = $topic_id`,
    {
      topic_id: topic_id,
    },
  );
};

const listTopics = async () => {
  const res = await executeQuery(`SELECT * FROM topics ORDER BY name`);

  return res.rows;
};

const findTopicById = async (id) => {
  const res = await executeQuery(`SELECT * FROM topics WHERE id = $id`, {
    id: id,
  });

  return res.rows[0];
};

const findAll = async () => {
  const result = await executeQuery(
    "SELECT * FROM topics",
  );
  return result.rows;
};

export { addTopic, deleteTopic, findAll, findTopicById, listTopics };
