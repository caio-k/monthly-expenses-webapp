import React from "react";
import { DefaultToast } from 'react-toast-notifications';

export const CustomToast = ({ children, ...props }) => (
  <DefaultToast {...props} style={{maxWidth: "300px"}}>
    <div>{children}</div>
  </DefaultToast>
);
