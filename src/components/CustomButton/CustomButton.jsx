import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

export const CustomButton = styled(Button)(({ theme }) => ({
  borderRadius: "8px",
  padding: "8px 16px",

  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  "&:hover": {
    backgroundColor:
      theme.palette.mode === "dark" ? "#33485D" : theme.palette.grey[300],
  },
}));
