import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { LInputMask } from "../../custom-prime/LInputMask";
import { LInputText } from "../../custom-prime/LInputText";
import { usePersonalDataForm, PersonalDataFormModel } from "./use-personal-data-form";

export type PersonalDataStepProps = {
  onComplete: (personalData: any) => void;
  requestPreviousStep: () => void;
  data?: PersonalDataFormModel;
};
export const PersonalDataStep = ({
  onComplete,
  requestPreviousStep,
  data
}: PersonalDataStepProps) => {
  const { handleSubmit, handleBlur, handleChange, errors, touched, values } =
    usePersonalDataForm({
      onSubmit: onComplete,
      initialValues: data
    });

  return (
    <Card className="max-w-screen p-3  md:w-30rem">
      <h2 className="mt-0">Responsável da loja</h2>
      <p>Preencha as informações com seus dados pessoais.</p>

      <div className="h-2rem" />

      <form noValidate onSubmit={handleSubmit}>
        <div className="formgrid grid">
          <div className="col-12 mt-3">
            <LInputText
              id="ownerName"
              name="ownerName"
              value={values.ownerName}
              onChange={handleChange}
              onBlur={handleBlur}
              labeltext="Nome completo*"
              errorMessage={touched["ownerName"] && errors["ownerName"]}
            />
          </div>

          <div className="col-12 mt-3">
            <LInputMask
              id="ownerCpf"
              name="ownerCpf"
              value={values.ownerCpf}
              onChange={handleChange}
              onBlur={handleBlur}
              labeltext="CPF*"
              errorMessage={touched["ownerCpf"] && errors["ownerCpf"]}
              mask="999.999.999-99"
              unmask
            />
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
