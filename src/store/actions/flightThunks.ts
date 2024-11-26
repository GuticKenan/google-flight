import {
  fetchAirportsFailure,
  fetchAirportsRequest,
  fetchAirportsSuccess,
  fetchFlightsFailure,
  fetchFlightsRequest,
  fetchFlightsSuccess,
} from "./flightActions";
import { SearchFlightParams } from "../../models/flight";
import { AppDispatch } from "../store";
import {
  searchAirportsApi,
  searchFlightsApi,
} from "../../services/flights.service";
import { formatData, formatFlightList } from "../../services/flight.utils";

export const fetchAirports =
  (query: string, from: boolean = false) =>
  async (dispatch: AppDispatch) => {
    dispatch(fetchAirportsRequest());
    try {
      const resp = await searchAirportsApi(query);

      const data = {
        data: formatData(resp.data),
        from,
      };

      dispatch(fetchAirportsSuccess(data));
    } catch (error: any) {
      dispatch(fetchAirportsFailure(error.message));
    }
  };

export const fetchSearchFlights =
  (filters: SearchFlightParams) => async (dispatch: AppDispatch) => {
    dispatch(fetchFlightsRequest());
    try {
      const resp = await searchFlightsApi(filters);
      const data = formatFlightList(resp.data.itineraries);

      if (resp.data.context.status === 'failure') {
        dispatch(fetchFlightsFailure("Error occured"));
        return;
    }

      dispatch(fetchFlightsSuccess(data.slice(0, 20)));
    } catch (error: any) {
      console.log(error);
      dispatch(fetchFlightsFailure(error.message));
    }
  };
