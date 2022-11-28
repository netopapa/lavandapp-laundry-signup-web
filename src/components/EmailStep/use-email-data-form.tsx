import { FormikErrors, useFormik } from "formik";
import { CONSTANTS } from "../../constants";
import { LaundrySolicitation } from "../../models/laundry-solicitation";

export type EmailFormModel = Pick<LaundrySolicitation, "email">;

type UseEmailDataFormProps = {
  onSubmit: (email: EmailFormModel) => void;
  initialValues?: EmailFormModel;
};

export const useEmailDataForm = ({
  onSubmit,
  initialValues,
}: UseEmailDataFormProps) => {
  const {
    handleSubmit,
    handleBlur,
    handleChange,
    setFieldValue,
    errors,
    touched,
    values,
  } = useFormik<EmailFormModel>({
    initialValues: initialValues || {
      email: "",
    },
    onSubmit: onSubmit,
    validate(values) {
      const errors: FormikErrors<EmailFormModel> = {};

      if (!values.email) {
        errors.email = CONSTANTS.ERROR_MESSAGES.REQUIRED();
      }

      return errors;
    },
  });

  const isFormFieldValid = (fieldName: string) =>
    !!((touched as any)[fieldName] && (errors as any)[fieldName]);

  const getFormErrorMessage = (fieldName: string) => {
    return (
      isFormFieldValid(fieldName) && (
        <small className="p-error">{(errors as any)[fieldName]}</small>
      )
    );
  };

  return {
    handleSubmit,
    handleBlur,
    handleChange,
    setFieldValue,
    getFormErrorMessage,
    isFormFieldValid,
    errors,
    touched,
    values,
  };
};
