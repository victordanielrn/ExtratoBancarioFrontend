import axios from "axios";

const apiConta = axios.create({
  baseURL: "http://localhost:8080/contas/"
});

const apiTransferencia = axios.create({
  baseURL: "http://localhost:8080/transferencias/"
});

export { apiConta, apiTransferencia };
export default apiConta;
