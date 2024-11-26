import React, { useCallback, useState } from "react";
import { Box, Button, Select, Typography } from "@mui/material";
import { SupervisedUserCircle } from "@mui/icons-material";

type FlightPassengersProps = {
  passengers: Record<string, number>;
  onFilter: (passengers: Record<string, number>) => void;
};

export const FlightPassengers: React.FC<FlightPassengersProps> = ({
  passengers,
  onFilter,
}) => {
  const [value, setValue] = useState<Record<string, number>>(passengers);
  const [openPass, setOpenPass] = useState<boolean>(false);

  const handleIncrement = useCallback((type: string) => {
    setValue((prev) => ({
      ...prev,
      [type]: prev[type] + 1,
    }));
  }, []);

  const handleDecrement = useCallback((type: string) => {
    setValue((prev: Record<string, number>) => ({
      ...prev,
      [type]: prev[type] > 0 ? prev[type] - 1 : 0,
    }));
  }, []);

  const cancelPass = useCallback(() => {
    setValue(passengers);
    setOpenPass(false);
  }, [passengers]);

  return (
    <Select
      open={openPass}
      onOpen={() => setOpenPass(true)}
      displayEmpty
      renderValue={() => (
        <Box display="flex">
          <SupervisedUserCircle />
          <Typography>
            {Object.values(passengers).reduce(
              (acc: number, value: number) => acc + value,
              0
            )}
          </Typography>
        </Box>
      )}
      sx={{
        "& .MuiOutlinedInput-notchedOutline": { border: "none" },
        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: "#666",
        },
      }}
    >
      <Box>
        {[
          { label: "Adults", description: "", key: "adults" },
          {
            label: "Children",
            description: "Aged 2-11",
            key: "childrens",
          },
          {
            label: "Infants",
            description: "In seat",
            key: "infants",
          },
        ].map((passenger, index) => (
          <Box
            key={index}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            sx={{ marginBottom: 2, padding: 2, minWidth: "200px" }}
          >
            <Box>
              <Typography variant="body1">{passenger.label}</Typography>
              {passenger.description && (
                <Typography variant="body2" color="gray">
                  {passenger.description}
                </Typography>
              )}
            </Box>
            <Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <Button
                  onClick={() => handleDecrement(passenger.key)}
                  disabled={value[passenger.key] === 0}
                  sx={{
                    minWidth: "30px",
                    height: "30px",
                    color: value[passenger.key] === 0 ? "gray" : "#3A86FF",
                    border: "1px solid",
                    borderColor:
                      value[passenger.key] === 0 ? "gray" : "#3A86FF",
                  }}
                >
                  -
                </Button>
                <Typography>{value[passenger.key]}</Typography>
                <Button
                  onClick={() => handleIncrement(passenger.key)}
                  sx={{
                    minWidth: "30px",
                    height: "30px",
                    color: "#3A86FF",
                    border: "1px solid #3A86FF",
                  }}
                >
                  +
                </Button>
              </Box>
            </Box>
          </Box>
        ))}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 2,
          }}
        >
          <Button
            sx={{
              textTransform: "none",
              color: "#3A86FF",
            }}
            onClick={cancelPass}
          >
            Cancel
          </Button>
          <Button
            sx={{
              textTransform: "none",
              color: "#3A86FF",
            }}
            onClick={() => {
              setOpenPass(false);
              onFilter(value);
            }}
          >
            Done
          </Button>
        </Box>
      </Box>
    </Select>
  );
};

export default FlightPassengers;
