import React, { useCallback, useEffect, useState } from "react";
import FlightSearch from "../components/FlightSearchForm";
import FlightList from "../components/FlightContent";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { fetchSearchFlights } from "../store/actions/flightThunks";
import { SearchFlightParams } from "../models/flight";
import { SortBy } from "../models/sortBy";

const Home: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const [sortBy, setSortBy] = useState<SortBy>(SortBy.best);
  const [lastFilterObj, setLastFilterObj] = useState<SearchFlightParams>();

  useEffect(() => {
    if (lastFilterObj) {
        dispatch(fetchSearchFlights(lastFilterObj));
    }
  }, [sortBy, lastFilterObj, dispatch]);

  const onFilterTrigger = useCallback((params: SearchFlightParams) => {
    // check validation
    if (
      params.originEntityId &&
      params.originEntityId &&
      params.destinationEntityId &&
      params.destinationSkyId &&
      params.date &&
      params.returnDate
    ) {
      const formattedDate = (params.date as Date).toISOString().split("T")[0];
      let formattedReturnDate = "";

      if (params.returnDate) {
        formattedReturnDate = (params.returnDate as Date)
          .toISOString()
          .split("T")[0];
      }
      setLastFilterObj({
        ...params,
        date: formattedDate,
        returnDate: formattedReturnDate,
        sortBy,
      });
    }
  }, [sortBy]);

  return (
    <div style={{ margin: "0 auto", maxWidth: "1024px" }}>
      <FlightSearch onFilterTrigger={onFilterTrigger} />
      <FlightList
        initialSort={sortBy}
        setSortByFilter={(value: SortBy) => setSortBy(value)}
      />
    </div>
  );
};

export default Home;
