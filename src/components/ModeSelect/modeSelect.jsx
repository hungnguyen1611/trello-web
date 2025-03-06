import { DarkMode, LightMode, SettingsBrightness } from "@mui/icons-material";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  useColorScheme,
} from "@mui/material";

function ModeSelect() {
  const { mode, setMode } = useColorScheme();
  if (!mode) {
    return null;
  }

  const handleMode = (e) => {
    setMode(e.target.value);
  };
  return (
    <>
      <FormControl sx={{ m: 1, minWidth: 100 }} size="small">
        <InputLabel
          sx={{
            color: "white",
            "&.Mui-focused": {
              color: "white",
            },
          }}
        >
          Mode
        </InputLabel>
        <Select
          label="Mode"
          onChange={handleMode}
          value={mode}
          sx={{
            color: "white",
            ".MuiOutlinedInput-notchedOutline": {
              borderColor: "white",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "white",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "white",
            },

            ".MuiSvgIcon-root": {
              color: "white",
            },
          }}
        >
          <MenuItem value="light">
            <Box display="flex" alignItems="center" gap={1}>
              <LightMode fontSize="small" />
              Light
            </Box>
          </MenuItem>
          <MenuItem value="dark">
            <Box display="flex" alignItems="center" gap={1}>
              <DarkMode fontSize="small" />
              Dark
            </Box>
          </MenuItem>
          <MenuItem value="system">
            <Box display="flex" alignItems="center" gap={1}>
              <SettingsBrightness fontSize="small" />
              System
            </Box>
          </MenuItem>
        </Select>
      </FormControl>
    </>
  );
}

export default ModeSelect;
