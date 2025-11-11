import { SxProps, Typography } from "@mui/material";
import { memo } from "react";

import { FieldProps, useRecordContext } from "react-admin";
import { Product } from "../types";

interface Props extends FieldProps<Product> {
  size?: string;
  sx?: SxProps;
}

// Component for rendering the full name field of a product
const FullNameField = (props: Props) => {
  const record = useRecordContext<Product>();
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
      {record.productname}
    </Typography>
  ) : null;
};

export default memo<Props>(FullNameField);
