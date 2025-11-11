import { FC, createElement, ReactNode } from "react";
import { Card, Box, Typography, Divider } from "@mui/material";
import { Link, To } from "react-router-dom";

interface Props {
  icon: FC<any>;
  to: To;
  title?: string;
  subtitle?: ReactNode;
  children?: ReactNode;
  alert?: boolean;
}

// Component for rendering a dashboard card with an icon, title, subtitle, and optional link
const CardWithIcon = ({
  icon,
  title,
  subtitle,
  to,
  children,
  alert,
}: Props) => (
  <Card
    sx={{
      minHeight: 52,
      display: "flex",
      flexDirection: "column",
      flex: "1",
      "& a": {
        textDecoration: "none",
        color: "inherit",
      },
    }}
  >
    {/^https?:\/\//i.test(String(to || "")) ? (
      <a href={String(to)} target="_blank" rel="noopener noreferrer">
        <Box
          sx={{
            position: "relative",
            overflow: "hidden",
            padding: "16px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            "& .icon": {
              color: "secondary.main",
            },
            "&:before": {
              position: "absolute",
              top: "50%",
              left: 0,
              display: "block",
              content: `''`,
              height: "200%",
              aspectRatio: "1",
              transform: "translate(-30%, -60%)",
              borderRadius: "50%",
              backgroundColor: "secondary.main",
              opacity: 0.15,
            },
          }}
        >
          <Box
            className="icon"
            sx={{
              width: "3em",
            }}
          >
            {createElement(icon, { fontSize: "large" })}
          </Box>
          <Box
            sx={{
              textAlign: "right",
            }}
          >
            <Typography color="textSecondary">{title}</Typography>
            <Typography
              variant="h5"
              component="h2"
              sx={alert ? { color: "red" } : undefined}
            >
              {subtitle || " "}
            </Typography>
          </Box>
        </Box>
      </a>
    ) : (
      <Link to={to}>
        <Box
          sx={{
            position: "relative",
            overflow: "hidden",
            padding: "16px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            "& .icon": {
              color: "secondary.main",
            },
            "&:before": {
              position: "absolute",
              top: "50%",
              left: 0,
              display: "block",
              content: `''`,
              height: "200%",
              aspectRatio: "1",
              transform: "translate(-30%, -60%)",
              borderRadius: "50%",
              backgroundColor: "secondary.main",
              opacity: 0.15,
            },
          }}
        >
          <Box
            className="icon"
            sx={{
              width: "3em",
            }}
          >
            {createElement(icon, { fontSize: "large" })}
          </Box>
          <Box
            sx={{
              textAlign: "right",
            }}
          >
            <Typography color="textSecondary">{title}</Typography>
            <Typography
              variant="h5"
              component="h2"
              sx={alert ? { color: "red" } : undefined}
            >
              {subtitle || " "}
            </Typography>
          </Box>
        </Box>
      </Link>
    )}
    {children && <Divider />}
    {children}
  </Card>
);

export default CardWithIcon;
