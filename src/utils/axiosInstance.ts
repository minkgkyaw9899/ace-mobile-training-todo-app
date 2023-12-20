import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: 'http://10.1.40.240:3000',
  timeout: 70000,
  timeoutErrorMessage: 'Connection time out'
})

// middleware