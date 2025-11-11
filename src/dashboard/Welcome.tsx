import { Box, Card, CardActions, Typography } from "@mui/material";
import { useTranslate } from "react-admin";

// Component for displaying a welcome message in the dashboard
const Welcome = () => {
  const translate = useTranslate();
  return (
    <Card
      sx={{
        background: (theme) =>
          `linear-gradient(45deg, ${theme.palette.secondary.dark} 0%, ${theme.palette.secondary.light} 50%, ${theme.palette.primary.dark} 100%)`,
        color: (theme) => theme.palette.primary.contrastText,
        padding: "20px",
        marginTop: 2,
        marginBottom: "1em",
      }}
    >
      <Box
        sx={{
          display: "flex",
        }}
      >
        <Box
          sx={{
            flex: "1",
          }}
        >
          <Typography variant="h5" component="h2" gutterBottom>
            {translate("pos.dashboard.welcome.title")}
          </Typography>

          <Box
            sx={{
              maxWidth: "40em",
            }}
          ></Box>
          <CardActions
            sx={{
              padding: { xs: 0, xl: null },
              flexWrap: { xs: "wrap", xl: null },
              "& a": {
                marginTop: { xs: "1em", xl: null },
                marginLeft: { xs: "0!important", xl: null },
                marginRight: { xs: "1em", xl: null },
              },
            }}
          ></CardActions>
        </Box>
        <Box
          sx={{
            display: { xs: "none", sm: "none", md: "block" },
            width: "16em",
            height: "2em",
            overflow: "hidden",
            marginLeft: "auto",
          }}
        />
      </Box>
    </Card>
  );
};

export default Welcome;
