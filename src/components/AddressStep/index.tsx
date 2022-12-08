import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { InputMask } from "primereact/inputmask";
import { Toast } from "primereact/toast";
import { classNames as cx } from "primereact/utils";
import { useEffect, useMemo, useRef, useState } from "react";
import { CepResponseDTO } from "../../api/dto/cep-response.dto";
import { CustomError } from "../../api/dto/custom-error.dto";
import findCepRequest from "../../api/find-cep-request";
import { LInputText } from "../../custom-prime/LInputText";
import { CompanyAddress } from "../../models/company-address";
import { MapView } from "../MapView";
import { useAddressForm } from "./use-address-form";

export type AddressStepProps = {
  data?: CompanyAddress;
  onComplete: (address: CompanyAddress) => void;
};

type AddressStepState = {
  cepLoading?: boolean;
  cepData?: CepResponseDTO;
};

export const AddressStep = ({ onComplete, data }: AddressStepProps) => {
  const toast = useRef(null);
  const [state, setState] = useState<AddressStepState>();
  const {
    handleSubmit,
    handleBlur,
    handleChange,
    setFieldValue,
    getFormErrorMessage,
    isFormFieldValid,
    errors,
    touched,
    values,
  } = useAddressForm({
    onSubmit: onComplete,
    initialValues: data,
  });

  useEffect(() => {
    const _fetchCep = async () => {
      if (values.zipcode?.length === 8) {
        setState((prev) => ({ ...prev, cepLoading: true }));
        try {
          const cepData = await findCepRequest(values.zipcode);
          setState((prev) => ({ ...prev, cepData }));
          if (cepData && cepData.localidade !== "Florianópolis") {
            (toast.current as any)?.show({
              severity: "warn",
              detail:
                "Estamos presente somente em Florianópolis/SC no momento.",
              life: 10000,
            });
          } else {
            setFieldValue("neighborhood", cepData.bairro);
            setFieldValue("street", cepData.logradouro);
            setFieldValue("state", cepData.uf);
            setFieldValue("city", cepData.localidade);
          }
        } finally {
          setState((prev) => ({
            ...prev,
            cepLoading: false,
          }));
        }
      }
    };

    _fetchCep();
  }, [values.zipcode]);

  const inlineLocation = useMemo(() => {
    if (
      !values.state ||
      !values.city ||
      !values.neighborhood ||
      !values.street ||
      !values.number
    ) {
      return null;
    }

    return `${values.street} ${values.number},${values.neighborhood}, ${values.country}`;
  }, [values]);

  return (
    <>
      <Card className="max-w-screen p-3  md:w-30rem">
        <h2 className="mt-0">Endereço da loja</h2>
        <p>Preencha as informações de endereço da sua loja.</p>

        <div className="h-2rem" />

        <form noValidate onSubmit={handleSubmit}>
          <div className="formgrid grid">
            <div className="field col-12 md:col-6">
              <div className="p-float-label p-input-icon-right w-full">
                {state?.cepLoading && <i className="pi pi-spin pi-spinner" />}
                <InputMask
                  id="zipcode"
                  name="zipcode"
                  className={cx({
                    "p-invalid": isFormFieldValid("zipcode"),
                    "w-full": true,
                  })}
                  value={values.zipcode}
                  mask="99999-999"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  unmask
                />
                <label htmlFor="zipcode">CEP*</label>
              </div>
              {getFormErrorMessage("zipcode")}
            </div>

            <div className="field col-12">
              <a
                href="https://buscacepinter.correios.com.br/app/endereco/index.php"
                target="_blanc"
              >
                Descobrir meu CEP
              </a>
            </div>

            <div className="col-12 h-1rem" />

            <div className="col-12 md:col-6 mt-3">
              <LInputText
                id="state"
                name="state"
                value={values.state}
                onChange={handleChange}
                onBlur={handleBlur}
                labeltext="Estado*"
                errorMessage={touched["state"] && errors["state"]}
                disabled={!!state?.cepData?.uf}
              />
            </div>

            <div className="col-12 md:col-6 mt-3">
              <LInputText
                id="city"
                name="city"
                value={values.city}
                onChange={handleChange}
                onBlur={handleBlur}
                labeltext="Cidade*"
                errorMessage={touched["city"] && errors["city"]}
                disabled={!!state?.cepData?.localidade}
              />
            </div>

            <div className="col-12 mt-3">
              <LInputText
                id="neighborhood"
                name="neighborhood"
                value={values.neighborhood}
                onChange={handleChange}
                onBlur={handleBlur}
                labeltext="Bairro*"
                errorMessage={touched["neighborhood"] && errors["neighborhood"]}
              />
            </div>

            <div className="col-12 mt-3">
              <LInputText
                id="street"
                name="street"
                value={values.street}
                onChange={handleChange}
                onBlur={handleBlur}
                labeltext="Endereço*"
                errorMessage={touched["street"] && errors["street"]}
              />
            </div>

            <div className="col-12 md:col-6 mt-3">
              <LInputText
                id="number"
                name="number"
                value={values.number}
                onChange={handleChange}
                onBlur={handleBlur}
                labeltext="Número*"
                errorMessage={touched["number"] && errors["number"]}
              />
            </div>

            <div className="col-12 md:col-6 mt-3">
              <LInputText
                id="complement"
                name="complement"
                value={values.complement}
                onChange={handleChange}
                onBlur={handleBlur}
                labeltext="Complemento*"
                errorMessage={touched["complement"] && errors["complement"]}
              />
            </div>
          </div>

          {!!inlineLocation && (
            <>
              <div className="h-1rem" />
              <MapView location={inlineLocation} />
            </>
          )}

          {!inlineLocation && (
            <div style={{ height: "200px" }} className="bg-blue-50"></div>
          )}

          <div className="h-2rem" />

          <div className="flex justify-content-end">
            <Button
              label="Continuar"
              disabled={
                !!state?.cepData?.localidade &&
                state.cepData.localidade !== "Florianópolis"
              }
              aria-label="Submit"
              type="submit"
            />
          </div>
        </form>
      </Card>
      <Toast ref={toast} />
    </>
  );
};
