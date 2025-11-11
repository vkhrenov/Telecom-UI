// Validation function for endpoint form fields
export const validateForm = (
  values: Record<string, any>,
): Record<string, any> => {
  const errors = {} as any;
  if (!values.endpoint) {
    errors.endpoint = "ra.validation.required";
  }
  if (values.endpoint && values.endpoint.length > 64) {
    errors.endpoint = "Endpoint must be at most 64 characters";
  }
  if (!values.description) {
    errors.description = "ra.validation.required";
  }
  if (values.description && values.description.length > 128) {
    errors.description = "Description must be at most 128 characters";
  }
  return errors;
};
