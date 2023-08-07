var Rail = require("national-rail-darwin");
import Main from "./components/Main";

function sortByTime(data) {
  return data.sort((a, b) => {
    const timeA = a.std.split(":").map(Number);
    const timeB = b.std.split(":").map(Number);

    if (timeA[0] !== timeB[0]) {
      return timeA[0] - timeB[0];
    } else {
      return timeA[1] - timeB[1];
    }
  });
}

export const dynamic = "force-dynamic";

export default async function Home() {
  var rail = new Rail(process.env.OPEN_LDBWS_TOKEN);

  async function getServiceDetail(serviceId) {
    return await new Promise((resolve, reject) => {
      rail.getServiceDetails(serviceId, function (err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(result.serviceDetails.previousCallingPoints);
        }
      });
    });
  }

  const southRuislip = await new Promise((resolve, reject) => {
    rail.getDepartureBoardWithDetails("SRU", {}, async function (err, result) {
      if (err) {
        reject(err);
      } else {
        const modifiedResultPromises = result.trainServices.map(
          async (train) => ({
            ...train,
            departingStation: {
              name: "South Ruislip",
              crs: "SRU",
              time: train.std,
            },
            previousCallingPoints: await getServiceDetail(train.serviceId),
          })
        );

        const modifiedResult = await Promise.all(modifiedResultPromises);

        resolve(modifiedResult);
      }
    });
  });

  const westRuislip = await new Promise((resolve, reject) => {
    rail.getDepartureBoardWithDetails("WRU", {}, async function (err, result) {
      if (err) {
        reject(err);
      } else {
        const modifiedResultPromises = result.trainServices.map(
          async (train) => ({
            ...train,
            departingStation: {
              name: "West Ruislip",
              crs: "WRU",
              time: train.std,
            },
            previousCallingPoints: await getServiceDetail(train.serviceId),
          })
        );

        const modifiedResult = await Promise.all(modifiedResultPromises);

        resolve(modifiedResult);
      }
    });
  });

  const beaconsfield = await new Promise((resolve, reject) => {
    rail.getDepartureBoardWithDetails("BCF", {}, async function (err, result) {
      if (err) {
        reject(err);
      } else {
        const modifiedResultPromises = result.trainServices.map(
          async (train) => ({
            ...train,
            departingStation: {
              name: "Beaconsfield",
              crs: "BCF",
              time: train.std,
            },
            previousCallingPoints: await getServiceDetail(train.serviceId),
          })
        );

        const modifiedResult = await Promise.all(modifiedResultPromises);

        resolve(modifiedResult);
      }
    });
  });

  const allOutwardTrains = [...southRuislip, ...westRuislip];

  const nextOutwardTrain = sortByTime(
    allOutwardTrains.filter((service) =>
      service.subsequentCallingPoints.some((stop) => stop.crs === "BCF")
    )
  )[0];

  const nextReturningTrain = sortByTime(
    beaconsfield.filter((service) =>
      service.subsequentCallingPoints.some((stop) => stop.crs === "SRU")
    )
  )[0];

  return (
    <Main
      outwardTrains={allOutwardTrains}
      returningTrains={beaconsfield}
      nextOutwardTrain={nextOutwardTrain}
      nextReturningTrain={nextReturningTrain}
    />
  );
}
