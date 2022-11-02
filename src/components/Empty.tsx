import React from "react";
import { Typography } from "@mui/material";
import { Stack } from "@mui/system";

const Empty = () => {
  return (
    <Stack width={"full"} alignItems={"center"} pt={3}>
      <Typography variant="body1">Add a new task!</Typography>
      <Typography variant="body2" mt={3}>
        Create a new task and it will show up here.
      </Typography>
    </Stack>
  );
};
export default Empty;
