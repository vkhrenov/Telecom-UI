import { SxProps, Typography } from "@mui/material";
import { memo } from "react";

import { FieldProps, useRecordContext } from "react-admin";
import { Endpoint } from "../types";

interface Props extends FieldProps<Endpoint> {
  size?: string;
  sx?: SxProps;
}

// Component for rendering the full name field of an endpoint
const FullNameField = (props: Props) => {
  const record = useRecordContext<Endpoint>();
  return record ? (
    <Typography
      variant="body2"
      component="div"
      sx={[
        {
          display: "flex",
          flexWrap: "nowrap",
          alignItems: "center",
        },
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
      ]}
    >
      {record.endpoint}
    </Typography>
  ) : null;
};

export default memo<Props>(FullNameField);
