import axios, {AxiosInstance} from "axios";

//criando um cliente HTTP com axios
const instance: AxiosInstance = axios.create({
    // servidor (baseURL)
    baseURL: "http://localhost:8080",
    //enviar dados em JSON.
    headers: {
        "Content-Type": "application/json",
    }
})

export default instance