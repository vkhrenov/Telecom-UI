import { Typography } from "@mui/material";
import { Login as RaLogin, LoginForm } from "react-admin";

// Custom Login component for the admin interface
const Login = () => (
  <RaLogin sx={{ background: "none" }}>
    <Typography
      sx={{
        color: "text.disabled",
        textAlign: "center",
      }}
    >
      Please, use your credentials to log in
    </Typography>
    <LoginForm />
  </RaLogin>
);

export default Login;
