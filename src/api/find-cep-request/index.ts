import axios, { AxiosError } from "axios";
import { CONSTANTS } from "../../constants";
import { CepResponseDTO } from "../dto/cep-response.dto";
import { CustomError } from "../dto/custom-error.dto";

const findCepRequest = async (cep: string): Promise<CepResponseDTO> => {
  try {
    return (
      await axios.get<CepResponseDTO>(
        CONSTANTS.CORE_BASE_URL + `viacep/${cep}`
      )
    ).data;
  } catch (e) {
    const error = e as AxiosError;

    let customError: CustomError = {
      msg: "Erro ao consultar CEP.",
      httpStatus: error.status,
      apiMessage: error.message,
    };

    throw customError;
  }
};

export default findCepRequest;
