import React, {  useCallback, useEffect, useMemo, useState } from "react";
import {
  Box,
  debounce,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { useDispatch, useSelector } from "react-redux";
import { fetchAirports } from "../store/actions/flightThunks";
import { AppDispatch } from "../store/store";
import {
  selectAirportFromList,
  selectAirportToList,
} from "../store/selectors/flightsSelector";
import { AirportFormattedData } from "../models/airport";
import FlightPassengers from "./FlightPassengers";
import { SingleInputDateRangeField } from "@mui/x-date-pickers-pro";
import FlightTypeSelect, { FlightTypeEnum } from "./FlightTypeSelect";
import FlightAutocomplete from "./FlightAutocomplete";
import { SearchFlightParams } from "../models/flight";

type FlightSearchProps = {
  onFilterTrigger: (params: SearchFlightParams) => void;
}
function FlightSearch({
  onFilterTrigger,
}: FlightSearchProps) {
  const dispatch: AppDispatch = useDispatch();
  const airportsFromList = useSelector(selectAirportFromList);
  const airportsToList = useSelector(selectAirportToList);
  const [selectedAirportFromOption, setSelectedAirportFromOption] =
    useState<AirportFormattedData | null>(null);
  const [selectedAirportToOption, setSelectedAirportToOption] =
    useState<AirportFormattedData | null>(null);
  const [flightLuxury, setFlightLuxury] = useState<FlightTypeEnum>(
    FlightTypeEnum.economy
  );
  const [passengers, setPassengers] = useState<Record<string, number>>({
    adults: 1,
    childrens: 0,
    infants: 0,
  });
  const [dateValue, setDateValue] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);

  useEffect(() => {
    onFilterTrigger({
      originSkyId: selectedAirportFromOption?.skyId,
      destinationSkyId: selectedAirportToOption?.skyId,
      originEntityId: selectedAirportFromOption?.entityId,
      destinationEntityId: selectedAirportToOption?.entityId,
      date: dateValue[0] as Date,
      returnDate: dateValue[1] as Date,
      cabinClass: flightLuxury,
      ...passengers,
    });
  }, [selectedAirportToOption, selectedAirportFromOption, dateValue, flightLuxury, passengers, onFilterTrigger]);

  const handleDateChange = useCallback(
    (newValue: [Date | null, Date | null]) => {
      setDateValue(newValue);
    },
    []
  );

  const debouncedFromFetch = useMemo(
    () =>
      debounce((value, from = false) => {
        dispatch(fetchAirports(value, from));
      }, 400),
    [dispatch]
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "start",
          alignItems: "start",
          flexDirection: "column",
          width: '100%'
        }}
      >
        <Box display="flex">
          <FlightPassengers
            passengers={passengers}
            onFilter={(value) => {
              setPassengers({...value});
            }}
          />

          <FlightTypeSelect
            flightLuxury={flightLuxury}
            onFlightTypeChange={(value: FlightTypeEnum) => {
              setFlightLuxury(value);
            }}
          />
        </Box>

        <Box sx={{ width: '100%'}}>
          <Box
            sx={{
              padding: 2,
              borderRadius: 2,
              display: "flex",
              gap: 2,
              alignItems: "center",
              flexWrap: "wrap",
              position: "relative",
              flexDirection: {
                xs: 'column', // 100% width for extra-small screens
                sm: 'row',  // 75% width for small screens
                md: 'row',  // 50% width for medium screens
                lg: 'row', 
              }
            }}
          >
            <FlightAutocomplete
              options={airportsFromList}
              selectedOption={selectedAirportFromOption}
              fetchValue={debouncedFromFetch}
              from
              setSelectedOption={setSelectedAirportFromOption}
            />
            <FlightAutocomplete
              options={airportsToList}
              selectedOption={selectedAirportToOption}
              fetchValue={debouncedFromFetch}
              setSelectedOption={setSelectedAirportToOption}
            />

            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateRangePicker
                slots={{ field: SingleInputDateRangeField }}
                name="allowedRange"
                value={dateValue}
                onChange={handleDateChange}
                sx={{ flex: 1, width: "100%"}}
              />
            </LocalizationProvider>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default FlightSearch;
