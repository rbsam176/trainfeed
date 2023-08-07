"use client";
import { Steps } from "antd-mobile";

function getCurrentTime() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}

export default function Detail(props) {
  const { Step } = Steps;
  if (!props.data) return false;
  const currentTime = getCurrentTime();

  return (
    <Steps current={1} direction="vertical">
      {props.data.previousCallingPoints.map((stop, index) => (
        <Step
          key={index}
          title={stop.locationName}
          description={stop.st}
          status="process"
        />
      ))}
      <Step
        title={props.data.departingStation.name}
        description={props.data.departingStation.time}
        status={
          currentTime >= props.data.departingStation.time ? "process" : "wait"
        }
      />
      {props.data.subsequentCallingPoints.map((stop, index) => (
        <Step
          key={index}
          title={stop.locationName}
          description={stop.st}
          status={currentTime >= stop.st ? "process" : "wait"}
        />
      ))}
    </Steps>
  );
}
