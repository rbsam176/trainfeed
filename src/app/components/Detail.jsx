"use client";
import { Steps } from "antd-mobile";

function hasTimePassed(targetTime) {
  const currentTime = new Date();
  const [targetHours, targetMinutes] = targetTime.split(":").map(Number);
  const currentHours = currentTime.getHours();
  const currentMinutes = currentTime.getMinutes();

  if (currentHours > targetHours) {
    return true;
  } else if (currentHours === targetHours && currentMinutes >= targetMinutes) {
    return true;
  }

  return false;
}

export default function Detail(props) {
  const { Step } = Steps;
  if (!props.data) return false;

  return (
    <Steps current={1} direction="vertical">
      {props.data.previousCallingPoints.map((stop, index) => (
        <Step
          key={index}
          title={stop.locationName}
          description={stop.st}
          status={hasTimePassed(stop.st) ? "process" : "wait"}
        />
      ))}
      <Step
        title={props.data.departingStation.name}
        description={props.data.departingStation.time}
        status={
          hasTimePassed(props.data.departingStation.time) ? "process" : "wait"
        }
      />
      {props.data.subsequentCallingPoints.map((stop, index) => (
        <Step
          key={index}
          title={stop.locationName}
          description={stop.st}
          status={hasTimePassed(stop.st) ? "process" : "wait"}
        />
      ))}
    </Steps>
  );
}
