import { FormikErrors, useFormik } from "formik";
import { CONSTANTS } from "../../constants";
import { LaundrySolicitation } from "../../models/laundry-solicitation";

export type CompanyDataFormModel = {
  weightPreference: "10" | "12";
} & Pick<
  LaundrySolicitation,
  "cnpj" | "corporateName" | "fantasyName" | "phoneNumber" | "displayName"
>;

type UseCompanyDataFormProps = {
  onSubmit: (CompanyData: CompanyDataFormModel) => void;
  initialValues?: CompanyDataFormModel;
};

export const useCompanyDataForm = ({
  onSubmit,
  initialValues,
}: UseCompanyDataFormProps) => {
  const {
    handleSubmit,
    handleBlur,
    handleChange,
    setFieldValue,
    errors,
    touched,
    values,
  } = useFormik<CompanyDataFormModel>({
    initialValues: initialValues || {
      cnpj: "",
      corporateName: "",
      fantasyName: "",
      phoneNumber: "",
      weightPreference: "10",
      displayName: "",
    },
    onSubmit: onSubmit,
    validate(values) {
      const errors: FormikErrors<CompanyDataFormModel> = {};

      if (!values.cnpj) {
        errors.cnpj = CONSTANTS.ERROR_MESSAGES.REQUIRED();
      }
      if (!values.corporateName) {
        errors.corporateName = CONSTANTS.ERROR_MESSAGES.REQUIRED();
      }
      if (!values.displayName) {
        errors.displayName = CONSTANTS.ERROR_MESSAGES.REQUIRED();
      }
      if (!values.fantasyName) {
        errors.fantasyName = CONSTANTS.ERROR_MESSAGES.REQUIRED();
      }
      if (!values.phoneNumber) {
        errors.phoneNumber = CONSTANTS.ERROR_MESSAGES.REQUIRED();
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
