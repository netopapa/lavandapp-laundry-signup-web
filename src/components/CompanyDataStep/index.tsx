import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { RadioButton } from "primereact/radiobutton";
import { LInputMask } from "../../custom-prime/LInputMask";
import { LInputText } from "../../custom-prime/LInputText";
import {
  CompanyDataFormModel,
  useCompanyDataForm,
} from "./use-company-data-form";

export type CompanyDataStepProps = {
  onComplete: (companyData: any) => void;
  requestPreviousStep: () => void;
  data?: CompanyDataFormModel;
};

export const CompanyDataStep = ({
  onComplete,
  requestPreviousStep,
  data,
}: CompanyDataStepProps) => {
  const { handleSubmit, handleBlur, handleChange, errors, touched, values } =
    useCompanyDataForm({
      onSubmit: onComplete,
      initialValues: data,
    });
  return (
    <Card className="max-w-screen p-3 w-10 md:w-30rem">
      <h2 className="mt-0">Dados da empresa</h2>
      <p>Preencha as informações com os dados da sua empresa.</p>

      <div className="h-2rem" />

      <form noValidate onSubmit={handleSubmit}>
        <div className="formgrid grid">
          <div className="col-12 mt-3">
            <LInputMask
              id="cnpj"
              name="cnpj"
              value={values.cnpj}
              onChange={handleChange}
              onBlur={handleBlur}
              labeltext="CPF*"
              errorMessage={touched["cnpj"] && errors["cnpj"]}
              mask="99.999.999/9999-99"
              unmask
            />
          </div>

          <div className="col-12 mt-3">
            <LInputText
              id="corporateName"
              name="corporateName"
              value={values.corporateName}
              onChange={handleChange}
              onBlur={handleBlur}
              labeltext="Razão social*"
              errorMessage={touched["corporateName"] && errors["corporateName"]}
            />
          </div>

          <div className="col-12 mt-3">
            <LInputText
              id="fantasyName"
              name="fantasyName"
              value={values.fantasyName}
              onChange={handleChange}
              onBlur={handleBlur}
              labeltext="Nome Fantasia*"
              errorMessage={touched["fantasyName"] && errors["fantasyName"]}
            />
          </div>

          <div className="col-12 mt-3">
            <LInputText
              id="displayName"
              name="displayName"
              value={values.displayName}
              onChange={handleChange}
              onBlur={handleBlur}
              labeltext="Nome de exibição (como aparecerá no aplicativo)*"
              errorMessage={touched["displayName"] && errors["displayName"]}
            />
          </div>

          <div className="col-12 mt-3">
            <LInputMask
              id="phoneNumber"
              name="phoneNumber"
              value={values.phoneNumber}
              onChange={handleChange}
              onBlur={handleBlur}
              labeltext="Telefone ou celular*"
              errorMessage={touched["phoneNumber"] && errors["phoneNumber"]}
              mask="(99) 99999?-9999"
              unmask
            />
          </div>

          <h5 className="mt-0">Até quantos quilos você aceita lavar?</h5>
          <div className="col-12 field-radiobutton">
            <RadioButton
              inputId="allow10kg"
              name="weightPreference"
              value="10"
              onChange={handleChange}
              checked={values.weightPreference === "10"}
            />
            <label htmlFor="allow10kg">Cesto de 10kg</label>
          </div>
          <div className="col-12 field-radiobutton">
            <RadioButton
              inputId="allow12kg"
              name="weightPreference"
              value="12"
              onChange={handleChange}
              checked={values.weightPreference === "12"}
            />
            <label htmlFor="allow12kg">Cesto de 12kg</label>
          </div>
        </div>

        <div className="h-2rem" />

        <div className="flex justify-content-end">
          <Button
            label="Voltar"
            aria-label="Previous Page"
            onClick={requestPreviousStep}
            className="mr-2 p-button-outlined"
          />
          <Button label="Continuar" aria-label="Submit" type="submit" />
        </div>
      </form>
    </Card>
  );
};
