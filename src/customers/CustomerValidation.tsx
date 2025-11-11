// Validation function for customer form fields
export const validateForm = (
  values: Record<string, any>,
): Record<string, any> => {
  const errors = {} as any;
  if (!values.name) {
    errors.name = "ra.validation.required";
  }
  if (values.name && values.name.length > 64) {
    errors.name = "Name must be at most 64 characters";
  }
  if (!values.username) {
    errors.username = "ra.validation.required";
  }
  if (values.username && values.username.length > 16) {
    errors.username = "Username must be at most 16 characters";
  }
  if (!values.login) {
    errors.login = "ra.validation.required";
  }
  if (values.login && values.login.length > 16) {
    errors.login = "Login must be at most 16 characters";
  }
  if (values.email && values.email.trim().length > 128) {
    errors.email = "Email must be at most 128 characters";
  }
  if (values.password && values.password !== values.confirm_password) {
    errors.confirm_password = "resources.customers.errors.password_mismatch";
  }
  return errors;
};
