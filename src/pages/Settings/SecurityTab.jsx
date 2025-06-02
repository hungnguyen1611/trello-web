import LockIcon from "@mui/icons-material/Lock";
import LockResetIcon from "@mui/icons-material/LockReset";
import LogoutIcon from "@mui/icons-material/Logout";
import PasswordIcon from "@mui/icons-material/Password";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { useConfirm } from "material-ui-confirm";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import FieldErrorAlert from "~/components/Form/FieldErrorAlert";
import { logoutUserAPI, updateAPI } from "~/redux/user/userSlice";
import {
  FIELD_REQUIRED_MESSAGE,
  PASSWORD_RULE,
  PASSWORD_RULE_MESSAGE,
} from "~/utils/validators";

function SecurityTab() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // Ôn lại: https://www.npmjs.com/package/material-ui-confirm
  const confirmChangePassword = useConfirm();
  const submitChangePassword = async (data) => {
    const { confirmed } = await confirmChangePassword({
      // Title, Description, Content...vv của gói material-ui-confirm đều có type là ReactNode nên có thể thoải sử dụng MUI components, rất tiện lợi khi cần custom styles
      title: (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <LogoutIcon sx={{ color: "warning.dark" }} /> Change Password
        </Box>
      ),
      description:
        "You have to login again after successfully changing your password. Continue?",
      confirmationText: "Confirm",
      cancellationText: "Cancel",
    });
    if (confirmed) {
      const { current_password, new_password } = data;
      toast
        .promise(
          dispatch(
            updateAPI({
              current_password,
              new_password,
            })
          ),
          {
            pending: "Updating passsword...",
          }
        )
        .then((res) => {
          if (!res.error) {
            toast.success("Successfully changed password, please login again!");
            dispatch(logoutUserAPI(false));
          }
        });
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          maxWidth: "1200px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 3,
        }}
      >
        <Box>
          <Typography variant="h5">Security Dashboard</Typography>
        </Box>
        <form onSubmit={handleSubmit(submitChangePassword)}>
          <Box
            sx={{
              width: "400px",
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Box>
              <TextField
                fullWidth
                label="Current Password"
                type="password"
                variant="outlined"
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <PasswordIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  },
                }}
                {...register("current_password", {
                  required: FIELD_REQUIRED_MESSAGE,
                  pattern: {
                    value: PASSWORD_RULE,
                    message: PASSWORD_RULE_MESSAGE,
                  },
                })}
                error={!!errors["current_password"]}
              />
              <FieldErrorAlert errors={errors} fieldName={"current_password"} />
            </Box>

            <Box>
              <TextField
                fullWidth
                label="New Password"
                type="password"
                variant="outlined"
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  },
                }}
                {...register("new_password", {
                  required: FIELD_REQUIRED_MESSAGE,
                  pattern: {
                    value: PASSWORD_RULE,
                    message: PASSWORD_RULE_MESSAGE,
                  },
                  validate: (value) => {
                    if (value !== watch("current_password")) return true;
                    return "New password must be different from current password";
                  },
                })}
                error={!!errors["new_password"]}
              />
              <FieldErrorAlert errors={errors} fieldName={"new_password"} />
            </Box>

            <Box>
              <TextField
                fullWidth
                label="New Password Confirmation"
                type="password"
                variant="outlined"
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockResetIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  },
                }}
                {...register("new_password_confirmation", {
                  validate: (value) => {
                    if (value === watch("new_password")) return true;
                    return "Password confirmation does not match.";
                  },
                })}
                error={!!errors["new_password_confirmation"]}
              />
              <FieldErrorAlert
                errors={errors}
                fieldName={"new_password_confirmation"}
              />
            </Box>

            <Box>
              <Button
                className="interceptor-loading"
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Change
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    </Box>
  );
}

export default SecurityTab;
