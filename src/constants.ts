export const CONSTANTS = {
  CORE_BASE_URL: "http://localhost:8080/",
  ERROR_MESSAGES: {
    MIN_VALUE: (value: string | number) => `Mínimo aceitável é de ${value}`,
    MAX_VALUE: (value: string | number) => `Máximo aceitável é de ${value}`,
    REQUIRED: () => "Campo obrigatório.",
    INVALID: () => "Campo inválido.",
  },
};
