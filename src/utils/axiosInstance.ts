import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: 'http://192.168.100.80:3000',
  timeout: 70000,
  timeoutErrorMessage: 'Connection time out'
})

// middleware