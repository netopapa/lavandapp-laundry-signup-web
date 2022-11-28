import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { LInputText } from "../../custom-prime/LInputText";
import { EmailFormModel, useEmailDataForm } from "./use-email-data-form";

export type EmailStepProps = {
  onComplete: (email: EmailFormModel) => void;
  requestPreviousStep: () => void;
};

export const EmailStep = ({
  onComplete,
  requestPreviousStep,
}: EmailStepProps) => {
  const { handleSubmit, handleBlur, handleChange, errors, touched, values } =
    useEmailDataForm({
      onSubmit: onComplete,
    });
  return (
    <Card className="max-w-screen p-3  md:w-30rem">
      <h2 className="mt-0">Email</h2>
      <p>Esolha um email para receber comunicações da plataforma Lavandapp.</p>

      <div className="h-2rem" />

      <form noValidate onSubmit={handleSubmit}>
        <div className="formgrid grid">
          <div className="col-12 mt-3">
            <LInputText
              id="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              labeltext="Email*"
              errorMessage={touched["email"] && errors["email"]}
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
          <Button label="Finalizar" aria-label="Submit" type="submit" />
        </div>
      </form>
    </Card>
  );
};
