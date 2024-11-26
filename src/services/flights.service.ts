import { SearchFlightParams } from "../models/flight";
import { axiosInstance } from "./api";

export const searchFlightsApi = async (filters: SearchFlightParams) => {
  const response = await axiosInstance.get(`/searchFlights`, {
    params: filters,
  });

  return response.data;
};

export const searchAirportsApi = async (query: string) => {
  const response = await axiosInstance.get(`/searchAirport`, {
    params: { query },
  });

  return response.data;
};
