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

  const result = await new Promise((resolve, reject) => {
    rail.getDepartureBoardWithDetails("SRU", {}, function (err, result) {
      if (err) {
        reject(err);
      } else {
        const modifiedResult = result.trainServices.map((train) => ({
          ...train,
          departingStation: {
            name: "South Ruislip",
            crs: "SRU",
            time: train.std,
          },
        }));
        resolve(modifiedResult);
      }
    });
  });

  const nextTrain = sortByTime(
    result.filter((service) =>
      service.subsequentCallingPoints.some((stop) => stop.crs === "BCF")
    )
  )[0];

  return <Main data={result} nextTrain={nextTrain} />;
}
