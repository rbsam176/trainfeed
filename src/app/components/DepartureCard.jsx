"use client";
import { FaTrainSubway } from "react-icons/fa6";
import { BsArrowDownShort } from "react-icons/bs";
import Link from "next/link";
import isAfternoon from "../isAfternoon";

function calculateTimeDifference(timeStr1, timeStr2) {
  const [hours1, minutes1] = timeStr1.split(":").map(Number);
  const [hours2, minutes2] = timeStr2.split(":").map(Number);

  const totalMinutes1 = hours1 * 60 + minutes1;
  const totalMinutes2 = hours2 * 60 + minutes2;

  const differenceInMinutes = totalMinutes2 - totalMinutes1;

  return differenceInMinutes;
}

export default function DepartureCard(props) {
  return props.trainData.map((item, index) => (
    <div
      key={item.serviceId}
      onClick={() => {
        props.setPanelOpen(!props.panelOpen);
        props.setActiveTrain(item);
      }}
      className={`bg-white rounded-lg p-6 last:mb-[100px] relative mb-3 border-4 ${
        index === 0 ? "border-[#EBD494]" : "border-white"
      }`}
    >
      {item.etd !== "On time" && (
        <Link
          target="_blank"
          href="https://www.nationalrail.co.uk/status-and-disruptions/"
          className="absolute top-0 right-0 bg-red-500 text-white text-sm rounded-md p-1"
        >
          Possible delays
        </Link>
      )}
      <div className="relative">
        <div className="flex items-center">
          <div className="bg-[#48A7E9] w-[40px] h-[40px] rounded-lg p-2">
            <FaTrainSubway className="fill-white w-full h-full" />
          </div>
          <Link
            className="ml-auto"
            target="_blank"
            href={`https://ojp.nationalrail.co.uk/service/ldbdetails/${item.serviceId}`}
          >
            <img src="/nationalraillogo.png" className="w-[25px] h-[25px]" />
          </Link>
        </div>
        <div className="leading-5 my-3">
          <div className="text-[24px] font-bold">
            {item.departingStation.name}
          </div>
          <small className="text-[12px]">
            {item.std} - Platform {item.platform}
          </small>
          <div className="my-2 flex items-center">
            <BsArrowDownShort className="w-[25px] h-[25px]" />
            <small>
              {isAfternoon()
                ? calculateTimeDifference(
                    item.std,
                    item.subsequentCallingPoints.find(
                      (stop) => stop.crs === "SRU"
                    ).st
                  )
                : calculateTimeDifference(
                    item.std,
                    item.subsequentCallingPoints.find(
                      (stop) => stop.crs === "BCF"
                    ).st
                  )}{" "}
              min
            </small>
          </div>
          <div className="text-[24px] font-bold">
            {isAfternoon() ? "South Ruislip" : "Beaconsfield"}
          </div>
          <small>
            {isAfternoon()
              ? item.subsequentCallingPoints.find((stop) => stop.crs === "SRU")
                  .st
              : item.subsequentCallingPoints.find((stop) => stop.crs === "BCF")
                  .st}
          </small>
        </div>
      </div>
      <span className="absolute -bottom-[4px] -right-[4px] text-white p-3 rounded-tl-lg rounded-br-lg text-[14px] bg-[#EBD494]">
        GO
      </span>
    </div>
  ));
}
