import { FormikErrors, useFormik } from "formik";
import { CONSTANTS } from "../../constants";
import { CompanyAddress } from "../../models/company-address";

type UseAddressFormProps = {
  onSubmit: (address: CompanyAddress) => void;
  initialValues?: CompanyAddress;
};

export const useAddressForm = ({
  onSubmit,
  initialValues,
}: UseAddressFormProps) => {  
  const {
    handleSubmit,
    handleBlur,
    handleChange,
    setFieldValue,
    errors,
    touched,
    values,
  } = useFormik<CompanyAddress>({
      initialValues: initialValues || {
      street: "",
      number: "",
      complement: "",
      neighborhood: "",
      zipcode: "",
      city: "",
      state: "",
      country: "Brasil",
    },
    onSubmit: onSubmit,
    validate(values) {
      const errors: FormikErrors<CompanyAddress> = {};

      if (!values.zipcode) {
        errors.zipcode = CONSTANTS.ERROR_MESSAGES.REQUIRED();
      }
      if (values.zipcode.length < 8) {
        errors.zipcode = CONSTANTS.ERROR_MESSAGES.INVALID();
      }
      if (!values.street) {
        errors.street = CONSTANTS.ERROR_MESSAGES.REQUIRED();
      }
      if (!values.number) {
        errors.number = CONSTANTS.ERROR_MESSAGES.REQUIRED();
      }
      if (!values.complement) {
        errors.complement = CONSTANTS.ERROR_MESSAGES.REQUIRED();
      }
      if (!values.neighborhood) {
        errors.neighborhood = CONSTANTS.ERROR_MESSAGES.REQUIRED();
      }
      if (!values.zipcode) {
        errors.zipcode = CONSTANTS.ERROR_MESSAGES.REQUIRED();
      }
      if (!values.city) {
        errors.city = CONSTANTS.ERROR_MESSAGES.REQUIRED();
      }
      if (!values.state) {
        errors.state = CONSTANTS.ERROR_MESSAGES.REQUIRED();
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
