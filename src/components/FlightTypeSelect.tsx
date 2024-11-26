import React from "react";
import { Box, MenuItem, Select, Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

export enum FlightTypeEnum {
  economy = "economy",
  premium_economy = "premium_economy",
  business = "business",
  first = "first",
}

type FlightTypeProps = {
  flightLuxury: FlightTypeEnum;
  onFlightTypeChange: (value: FlightTypeEnum) => void;
};

export const FlightTypeSelect: React.FC<FlightTypeProps> = ({
  flightLuxury,
  onFlightTypeChange,
}) => {
  return (
    <Select
      value={flightLuxury}
      onChange={(event) =>
        onFlightTypeChange(event?.target.value as FlightTypeEnum)
      }
      displayEmpty
      inputProps={{ "aria-label": "Flight Type" }}
      sx={{
        "& .MuiOutlinedInput-notchedOutline": { border: "none" },
        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: "#666",
        },
      }}
      renderValue={(selected) => (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {selected === FlightTypeEnum.economy && (
            <Typography>Economy</Typography>
          )}
          {selected === FlightTypeEnum.premium_economy && (
            <Typography>Premium Economy</Typography>
          )}
          {selected === FlightTypeEnum.business && (
            <Typography>Business</Typography>
          )}
          {selected === FlightTypeEnum.first && <Typography>First</Typography>}
        </Box>
      )}
    >
      <MenuItem value="economy">
        {flightLuxury === "economy" && <CheckIcon />}
        <Typography>
          <span>Economy</span>
        </Typography>
      </MenuItem>
      <MenuItem value="premium_economy">
        {flightLuxury === "premium_economy" && <CheckIcon />}
        <Typography>
          <span>Premium economy</span>
        </Typography>
      </MenuItem>
      <MenuItem value="business">
        {flightLuxury === "business" && <CheckIcon />}
        <Typography>
          <span>Business</span>
        </Typography>
      </MenuItem>
      <MenuItem value="first">
        {flightLuxury === "first" && <CheckIcon />}
        <Typography>
          <span>First</span>
        </Typography>
      </MenuItem>
    </Select>
  );
};

export default FlightTypeSelect;
