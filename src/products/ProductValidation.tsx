// Validation function for product form fields
export const validateForm = (
  values: Record<string, any>,
): Record<string, any> => {
  const errors = {} as any;
  if (!values.productname) {
    errors.productname = "ra.validation.required";
  }
  if (values.productname && values.productname.length > 16) {
    errors.productname = "Product name must be at most 16 characters";
  }
  if (!values.description) {
    errors.description = "ra.validation.required";
  }
  if (values.description && values.description.length > 128) {
    errors.description = "Description must be at most 128 characters";
  }
  return errors;
};
