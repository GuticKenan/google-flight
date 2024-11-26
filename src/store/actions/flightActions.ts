export const FETCH_AIRPORTS_REQUEST = "FETCH_AIRPORTS_REQUEST";
export const FETCH_AIRPORTS_SUCCESS = "FETCH_AIRPORTS_SUCCESS";
export const FETCH_AIRPORTS_FAILURE = "FETCH_AIRPORTS_FAILURE";

export const FETCH_FLIGHTS_REQUEST = "FETCH_FLIGHTS_REQUEST";
export const FETCH_FLIGHTS_SUCCESS = "FETCH_FLIGHTS_SUCCESS";
export const FETCH_FLIGHTS_FAILURE = "FETCH_FLIGHTS_FAILURE";

export const fetchAirportsRequest = () => ({
  type: FETCH_AIRPORTS_REQUEST,
});

export const fetchAirportsSuccess = (payload: any) => ({
  type: FETCH_AIRPORTS_SUCCESS,
  payload,
});

export const fetchAirportsFailure = (error: string) => ({
  type: FETCH_AIRPORTS_FAILURE,
  payload: error,
});

export const fetchFlightsRequest = () => ({
  type: FETCH_FLIGHTS_REQUEST,
});

export const fetchFlightsSuccess = (payload: any) => ({
  type: FETCH_FLIGHTS_SUCCESS,
  payload,
});

export const fetchFlightsFailure = (error: string) => ({
  type: FETCH_FLIGHTS_FAILURE,
  payload: error,
});
