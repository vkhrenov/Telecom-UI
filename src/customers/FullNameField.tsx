import { SxProps, Typography } from "@mui/material";
import { memo } from "react";

import { FieldProps, useRecordContext } from "react-admin";
import { Customer } from "../types";

interface Props extends FieldProps<Customer> {
  size?: string;
  sx?: SxProps;
}

// Component for rendering the full name field of a customer
const FullNameField = (props: Props) => {
  const record = useRecordContext<Customer>();
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
      {record.name}
    </Typography>
  ) : null;
};

export default memo<Props>(FullNameField);
