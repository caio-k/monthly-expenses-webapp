import React from "react";
import "./verticallyResponsiveTable.css";

function VerticallyResponsiveTable(props) {
  return (
    <table className="content-table" style={{maxWidth: props.maxWidth}}>
      {props.children}
    </table>
  )
}

export default VerticallyResponsiveTable;
