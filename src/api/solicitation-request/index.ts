import axios, { AxiosError } from "axios";
import { CONSTANTS } from "../../constants";
import { LaundrySolicitation } from "../../models/laundry-solicitation";
import { CustomError } from "../dto/custom-error.dto";

const solicitationRequest = async (
  payload: LaundrySolicitation
): Promise<LaundrySolicitation> => {
  try {
    return (
      await axios.post<LaundrySolicitation>(
        CONSTANTS.CORE_BASE_URL + `pre-registration-laundry/solicitation`,
        payload
      )
    ).data;
  } catch (e) {
    const error = e as AxiosError;

    let customError: CustomError = {
      msg: "Erro ao solicitar cadastro.",
      httpStatus: error.status,
      apiMessage: error.message,
    };

    if ((error.response as any)?.data?.message?.includes("already exists")) {
      customError.msg = "Solicitação já existe!";
    }

    if (
      (error.response as any)?.data?.message?.includes(
        "information doesn't matches"
      )
    ) {
      customError.msg = "Informações da empresa não conferem!";
    }

    throw customError;
  }
};

export default solicitationRequest;
