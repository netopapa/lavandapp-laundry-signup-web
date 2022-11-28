import { Toast } from "primereact/toast";
import { useRef, useState } from "react";
import { CustomError } from "../../api/dto/custom-error.dto";
import solicitationRequest from "../../api/solicitation-request";
import { AddressStep } from "../../components/AddressStep";
import { CompanyDataStep } from "../../components/CompanyDataStep";
import { EmailStep } from "../../components/EmailStep";
import { Feedback } from "../../components/Feedback";
import { Loading } from "../../components/Loading";
import { PersonalDataStep } from "../../components/PersonalDataStep";
import { LaundrySolicitation } from "../../models/laundry-solicitation";

export type HomeState = {
  isLoading?: boolean;
  step: "ADDRESS" | "PERSONAL" | "COMPANY" | "EMAIL" | "SUCCESS";
  solicitation?: LaundrySolicitation;
};

export const Home = () => {
  const toast = useRef(null);
  const [state, setState] = useState<HomeState>({
    step: "ADDRESS",
  });

  const handleFinishForm = async (solicitation: LaundrySolicitation) => {
    setState((prev) => ({ ...prev, isLoading: true }));

    try {
      await solicitationRequest(solicitation);
      setState((prev) => ({ ...prev, step: "SUCCESS" }));
    } catch (error) {
      (toast.current as any)?.show({
        severity: "error",
        detail: (error as CustomError).msg,
        life: 4000,
      });
    } finally {
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  return (
    <>
      {state.isLoading && <Loading />}
      <div className="flex justify-content-center align-items-center min-h-screen bg-primary p-3">
        {state.step === "ADDRESS" && (
          <div>
            <AddressStep
              data={state.solicitation?.address}
              onComplete={(address) =>
                setState((prev) => ({
                  ...prev,
                  solicitation: { ...state.solicitation!, address },
                  step: "PERSONAL",
                }))
              }
            />
          </div>
        )}

        {state.step === "PERSONAL" && (
          <div>
            <PersonalDataStep
              data={
                state.solicitation && {
                  ownerName: state.solicitation.ownerName ?? "",
                  ownerCpf: state.solicitation.ownerCpf ?? "",
                }
              }
              onComplete={(personalData) =>
                setState((prev) => ({
                  ...prev,
                  solicitation: { ...state.solicitation!, ...personalData },
                  step: "COMPANY",
                }))
              }
              requestPreviousStep={() =>
                setState((prev) => ({
                  ...prev,
                  step: "ADDRESS",
                }))
              }
            />
          </div>
        )}

        {state.step === "COMPANY" && (
          <div>
            <CompanyDataStep
              data={
                state.solicitation && {
                  displayName: state.solicitation.displayName ?? "",
                  cnpj: state.solicitation.cnpj ?? "",
                  corporateName: state.solicitation.corporateName ?? "",
                  fantasyName: state.solicitation.fantasyName ?? "",
                  phoneNumber: state.solicitation.phoneNumber ?? "",
                  weightPreference: state.solicitation.laundryPreferences
                    ?.allow12kg
                    ? "12"
                    : "10",
                }
              }
              onComplete={(companyData) =>
                setState((prev) => ({
                  ...prev,
                  solicitation: {
                    ...state.solicitation!,
                    ...companyData,
                    laundryPreferences: {
                      allow10kg: companyData.weightPreference === "10",
                      allow12kg: companyData.weightPreference === "12",
                    },
                  },
                  step: "EMAIL",
                }))
              }
              requestPreviousStep={() =>
                setState((prev) => ({
                  ...prev,
                  step: "PERSONAL",
                }))
              }
            />
          </div>
        )}

        {state.step === "EMAIL" && (
          <div>
            <EmailStep
              onComplete={(emailData) => {
                setState((prev) => ({
                  ...prev,
                  solicitation: { ...state.solicitation!, ...emailData },
                }));
                handleFinishForm({ ...state.solicitation!, ...emailData });
              }}
              requestPreviousStep={() =>
                setState((prev) => ({
                  ...prev,
                  step: "COMPANY",
                }))
              }
            />
          </div>
        )}
        {state.step === "SUCCESS" && <Feedback />}
      </div>
      <Toast ref={toast} />
    </>
  );
};
