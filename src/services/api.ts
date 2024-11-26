import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_RAPID_URL,
  headers: {
    "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API,
    "X-RapidAPI-Host": process.env.REACT_APP_RAPID_HOST,
  },
});
