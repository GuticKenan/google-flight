import {
  Box,
  Typography,
  Divider,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckIcon from "@mui/icons-material/Check";
import { useSelector } from "react-redux";
import { selectError, selectFlightList, selectLoading } from "../store/selectors/flightsSelector";
import { Leg } from "../models/flight";
import { SortBy } from "../models/sortBy";

const FlightList = ({
  initialSort,
  setSortByFilter,
}: {
  initialSort: SortBy;
  setSortByFilter: (value: SortBy) => void;
}) => {
  const loading = useSelector(selectLoading);
  const fightLists = useSelector(selectFlightList);
  const error = useSelector(selectError);

  return (
    <Box sx={{ padding: 2 }}>
      {/* Sort and Info Section */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{ marginBottom: 2 }}
      >
        <Box>
          <Typography variant="h6">Top departing flights</Typography>
        </Box>
        <Select
          value={initialSort}
          onChange={(event) => {
            setSortByFilter(event.target.value as SortBy);
          }}
          displayEmpty
          inputProps={{ "aria-label": "Flight Type" }}
          sx={{
            textTransform: "none",
            color: "primary.main",
            "& .MuiOutlinedInput-notchedOutline": { border: "none" },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#666",
            },
            "& .MuiSvgIcon-root": {
              color: "primary.main",
            },
          }}
          renderValue={(selected) => (
            <Typography>Sorted by {selected}</Typography>
          )}
        >
          <MenuItem value={SortBy.best}>
            {initialSort === "best" && <CheckIcon />}
            <Typography>
              <span>Round trip</span>
            </Typography>
          </MenuItem>
          <MenuItem value={SortBy.price_high}>
            {initialSort === "price_high" && <CheckIcon />}
            <Typography>
              <span>Price high</span>
            </Typography>
          </MenuItem>
          <MenuItem value={SortBy.fastest}>
            {initialSort === "fastest" && <CheckIcon />}
            <Typography>
              <span>Fastest</span>
            </Typography>
          </MenuItem>
          <MenuItem value={SortBy.outbound_take_off_time}>
            {initialSort === "outbound_take_off_time" && <CheckIcon />}
            <Typography>
              <span>Take off time</span>
            </Typography>
          </MenuItem>
          <MenuItem value={SortBy.outbound_landing_time}>
            {initialSort === "outbound_landing_time" && <CheckIcon />}
            <Typography>
              <span>Landing time</span>
            </Typography>
          </MenuItem>
          <MenuItem value={SortBy.return_take_off_time}>
            {initialSort === "return_take_off_time" && <CheckIcon />}
            <Typography>
              <span>Return take off time</span>
            </Typography>
          </MenuItem>
          <MenuItem value={SortBy.return_landing_time}>
            {initialSort === "return_landing_time" && <CheckIcon />}
            <Typography>
              <span>Return landing time</span>
            </Typography>
          </MenuItem>
        </Select>
      </Box>
      {/* Flight Cards */}
      <Box sx={{ padding: 2, display: "flex" }}>
        {loading && (
          <Box margin="0 auto">
            <CircularProgress />
          </Box>
        )}
        {error && <Box> {error}</Box>}
        {fightLists.length > 0 && (
          <Box
            sx={{
              width: "100%",
            }}
          >
            {fightLists.map((flight, index) => (
              <Accordion
                key={flight.id}
                sx={{ marginBottom: 2, width: "100%" }}
              >
                {/* Collapsed Header */}
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "#fff",
                    borderBottom: "1px solid #ddd",
                    padding: 2,
                  }}
                >
                  <Box
                    alignItems="center"
                    display="flex"
                    width="100%"
                    justifyContent="space-between"
                  >
                    {/* Airline Logo */}
                    <Box
                      sx={{
                        width: "35px",
                        height: "35px",
                        padding: "20px",
                      }}
                    >
                      <img
                        src="https://www.gstatic.com/flights/airline_logos/70px/multi.png"
                        style={{ width: "100%" }}
                        alt="Airline"
                      />
                    </Box>
                    {/* Flight Times and Airline */}
                    <Box>
                      <Typography variant="body1" fontWeight="bold">
                        {flight.departureTime} – {flight.arrivalTime}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {flight.carriers}
                      </Typography>
                    </Box>
                    {/* Duration and Stops */}
                    <Box>
                      <Typography variant="body1" fontWeight="bold">
                        {flight.totalDurationFormatted}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {flight.route}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="textSecondary">
                        {flight.stopCount}
                      </Typography>
                    </Box>

                    {/* Price and Select Button */}
                    <Box>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="green"
                      >
                        {flight.price.formatted}
                      </Typography>
                    </Box>
                  </Box>
                </AccordionSummary>

                {/* Expanded Content */}
                <AccordionDetails sx={{ padding: 2, backgroundColor: "#fff" }}>
                  {flight.legs.map((leg: Leg, idx: number) => (
                    <Box>
                      {leg.segments.map((segment) => (
                        <Box>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <Box display="flex" alignItems="center">
                              <Box
                                sx={{
                                  width: "35px",
                                  height: "35px",
                                  display: "flex",
                                  alignContent: "center",
                                  justifyContent: "center",
                                  padding: "20px",
                                }}
                              >
                                <img
                                  src={leg.carriers.marketing[0].logoUrl}
                                  alt="Airline"
                                />
                              </Box>
                              <Box key={idx} sx={{ marginBottom: 2 }}>
                                <Typography variant="body1" fontWeight="bold">
                                  {segment.departureTime} {segment.origin.name}{" "}
                                  {segment.origin.type} (
                                  {segment.origin.displayCode})
                                </Typography>
                                <Typography
                                  variant="body2"
                                  sx={{ marginTop: 1, marginBottom: 1 }}
                                >
                                  Travel time: {segment.durationFormatted}
                                </Typography>
                                <Typography variant="body1" fontWeight="bold">
                                  {segment.arrivalTime}{" "}
                                  {segment.destination.name}{" "}
                                  {segment.destination.type} (
                                  {segment.destination.displayCode})
                                </Typography>
                              </Box>
                            </Box>
                            <Box>
                              {segment.amenities.map(
                                (amenity: string, idx: number) => (
                                  <Typography
                                    key={idx}
                                    variant="body2"
                                    color="textSecondary"
                                    sx={{ marginBottom: 1 }}
                                  >
                                    {amenity}
                                  </Typography>
                                )
                              )}
                            </Box>
                          </Box>
                          <Divider sx={{ marginY: 2 }} />
                        </Box>
                      ))}
                      <Box>
                        {leg.layover?.map((l) => (
                          <Box display="flex">
                            <Box sx={{ width: "75px" }}></Box>
                            <Typography
                              variant="body2"
                              sx={{ marginTop: 1, marginBottom: 1 }}
                            >
                              {l.duration} layover - {l.location}
                            </Typography>
                          </Box>
                        ))}
                        <Divider sx={{ marginY: 2 }} />
                      </Box>
                    </Box>
                  ))}
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default FlightList;
