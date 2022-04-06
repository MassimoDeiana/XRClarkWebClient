import React from "react";
import { MdDangerous } from "react-icons/md";
import { AiFillWarning, AiFillInfoCircle } from "react-icons/ai";
import { FcHighPriority, FcInfo, FcDisapprove } from "react-icons/fc";

const LogError = (props: any) => {
  // console.log(props.logs);

  const DisplayLogs = (log: any) => {
    // console.log(log.severity);

    var icon = "";

    return (
      <div>
        {DisplayIcon(log.severity)}
        {log.message}
      </div>
    );
  };

  const DisplayIcon = (severity: number) => {
    switch (severity) {
      case 0:
        return <FcDisapprove />;
        break;
      case 1:
        return <FcHighPriority />;
        break;
      case 2:
        return <FcInfo />;
        break;

      default:
        break;
    }
  };

  return (
    <div>
      {props.logs.map((log: any, index: number) => (
        <div key={index}>{DisplayLogs(log)}</div>
      ))}
    </div>
  );
};

export default LogError;
