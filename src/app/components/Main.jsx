"use client";
import React, { useState, useEffect, useRef } from "react";
import { FloatingPanel } from "antd-mobile";
import { AiFillCloseCircle } from "react-icons/ai";
import DepartureCard from "./DepartureCard";
import Detail from "./Detail";
import isAfternoon from "../isAfternoon";

export function Main(props) {
  const targetRef = useRef(null);
  const parentRef = useRef(null);

  const onHeightChange = (height) => {
    const target = targetRef.current;
    if (!target) return;
    target.style.height = "100%";
    height > 0 ? setPanelOpen(true) : setPanelOpen(false);
  };

  const [panelOpen, setPanelOpen] = useState(false);
  const [anchors, setAnchors] = useState([0]);
  const [activeTrain, setActiveTrain] = useState(null);

  panelOpen
    ? parentRef?.current?.setHeight(window.innerHeight * 0.8)
    : parentRef?.current?.setHeight(0);

  useEffect(() => {
    setAnchors([0, window.innerHeight * 0.8], window.innerHeight);
    onHeightChange(0);
  }, []);

  if (props.outwardTrains.length === 0 && props.returningTrains.length === 0) {
    return <div>No trains available.</div>;
  } else {
    const nextTrain = isAfternoon()
      ? props.nextReturningTrain
      : props.nextOutwardTrain;

    const trainData = isAfternoon()
      ? props.returningTrains.filter((service) =>
          service.subsequentCallingPoints.some((stop) => stop.crs === "SRU")
        )
      : props.outwardTrains.filter((service) =>
          service.subsequentCallingPoints.some((stop) => stop.crs === "BCF")
        );

    if (trainData.length === 0) {
      return <div>No trains available.</div>;
    } else {
      return (
        <div>
          <div
            onClick={() => {
              panelOpen && parentRef?.current?.setHeight(0);
            }}
            className="relative h-screen overflow-scroll"
          >
            <div
              className={`absolute z-[50] bg-black ${
                panelOpen ? "opacity-50 w-full h-full" : "opacity-0 w-0 h-0"
              } transition-opacity duration-300`}
            />

            <div className="h-[15vh] bg-white text-white bg-[url('/cloud-bg.svg')] bg-no-repeat bg-bottom	bg-cover"></div>
            <div className="bg-[#48A7E9] min-h-[10vh] text-white px-6 leading-8">
              <p className="text-[24px]">The next train is...</p>
              <button
                onClick={() => {
                  setPanelOpen(!props.panelOpen);
                  setActiveTrain(nextTrain);
                }}
                className="flex items-center"
              >
                <span className="text-[32px]">
                  {nextTrain.departingStation.name}: {nextTrain.std}
                </span>
                <img src="/chevron-right.svg" className="inline ml-2" />
              </button>
            </div>

            <div className="p-6 bg-[#48A7E9] min-h-[75vh]">
              <DepartureCard
                trainData={trainData}
                panelOpen={panelOpen}
                setPanelOpen={setPanelOpen}
                setActiveTrain={setActiveTrain}
              />
            </div>
          </div>

          <FloatingPanel
            ref={parentRef}
            anchors={anchors}
            onHeightChange={onHeightChange}
          >
            <div className="p-6 relative" ref={targetRef}>
              <AiFillCloseCircle
                className="w-[30px] h-[30px] absolute top-0 right-[10px] fill-gray-400"
                onClick={() => parentRef?.current?.setHeight(0)}
              />
              <Detail data={activeTrain} />
            </div>
          </FloatingPanel>
        </div>
      );
    }
  }
}

export default Main;
