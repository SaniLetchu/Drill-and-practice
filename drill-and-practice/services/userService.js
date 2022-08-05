import { executeQuery } from "../database/database.js";

const addUser = async (email, password) => {
  await executeQuery(
    `INSERT INTO users
      (email, password)
        VALUES ($email, $password)`,
    {
      email: email,
      password: password,
    },
  );
};

const findUserByEmail = async (email) => {
  const result = await executeQuery(
    "SELECT * FROM users WHERE email = $email",
    {
      email: email,
    },
  );

  return result.rows;
};

const deleteUser = async (id) => {
  await executeQuery(
    `DELETE FROM users WHERE id = $id`,
    {
      id: id,
    },
  );
};

const findAll = async () => {
  const result = await executeQuery(
    "SELECT * FROM users",
  );
  return result.rows;
};

export { addUser, deleteUser, findAll, findUserByEmail };
