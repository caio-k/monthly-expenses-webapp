import React from "react";
import "./fullyResponsiveTable.css";

function FullyResponsiveTable(props) {
  return (
    <div className="fully-responsive-table">
      <table style={{minWidth: props.minWidth}}>
        {props.children}
      </table>
    </div>
  )
}

export default FullyResponsiveTable;
