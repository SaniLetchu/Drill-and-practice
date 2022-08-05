import { bcrypt, validasaur } from "../../deps.js";
import * as userService from "../../services/userService.js";

const formValidationRules = {
  email: [validasaur.isEmail],
  password: [validasaur.minLength(4)],
};

const getFormData = async (request) => {
  const body = request.body({ type: "form" });
  const params = await body.value;
  return {
    email: params.get("email"),
    password: params.get("password"),
  };
};

const registerUser = async ({ request, response, render }) => {
  const data = await getFormData(request);
  const [passes, errors] = await validasaur.validate(
    data,
    formValidationRules,
  );

  if (!passes) {
    data.validationErrors = errors;
    render("registration.eta", data);
  } else {
    await userService.addUser(
      data.email,
      await bcrypt.hash(data.password),
    );

    response.redirect("/auth/login");
  }
};

const showRegistrationForm = ({ render }) => {
  render("registration.eta", { email: "" });
};

export { registerUser, showRegistrationForm };
