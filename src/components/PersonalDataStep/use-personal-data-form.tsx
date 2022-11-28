import { FormikErrors, useFormik } from "formik";
import { CONSTANTS } from "../../constants";
import { LaundrySolicitation } from "../../models/laundry-solicitation";

export type PersonalDataFormModel = Pick<
  LaundrySolicitation,
  "ownerName" | "ownerCpf"
>;

type UsePersonalDataFormProps = {
  onSubmit: (personalData: PersonalDataFormModel) => void;
  initialValues?: PersonalDataFormModel
};

export const usePersonalDataForm = ({ onSubmit, initialValues }: UsePersonalDataFormProps) => {
  const {
    handleSubmit,
    handleBlur,
    handleChange,
    setFieldValue,
    errors,
    touched,
    values,
  } = useFormik<PersonalDataFormModel>({
    initialValues: initialValues || {
      ownerCpf: "",
      ownerName: "",
    },
    onSubmit: onSubmit,
    validate(values) {
      const errors: FormikErrors<PersonalDataFormModel> = {};

      if (!values.ownerCpf) {
        errors.ownerCpf = CONSTANTS.ERROR_MESSAGES.REQUIRED();
      }
      if (!values.ownerName) {
        errors.ownerName = CONSTANTS.ERROR_MESSAGES.REQUIRED();
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
