import {ChangeEventHandler, useState} from "react";
import {Station, StationNames, Trains} from "@/types";
import {TrainSummaryCard} from "@/components/train-summary-card";
import {isEnabled} from "@/utils/train";
import {CategoryScale, Chart, ChartData, ChartOptions, LineElement, PointElement, TimeScale} from "chart.js";
import {Line} from "react-chartjs-2";
import "chartjs-adapter-dayjs-4/dist/chartjs-adapter-dayjs-4.esm"

type TimetableProps = {
  stationNames: StationNames,
  date: string,
  trains: Trains,
  setTrains: (trains: Trains) => void,
  sortedStations: string[]
};
type TrainStopData = { stationName: string, time: string };

export function Timetable({stationNames, date, trains, setTrains, sortedStations}: TimetableProps) {
  Chart.register(CategoryScale, LineElement, PointElement, TimeScale);

  const [stations, setStations] = useState<Station[]>(sortedStations.map(stationName => ({stationName, enabled: true})));

  const data: ChartData<"line", TrainStopData[]> = {
    datasets: trains.filter(isEnabled).map(train => {
      return {
        label: train.trainSummary.station_train_code,
        data: train.trainStops.filter(stop => stations.find(({stationName}) => stationName == stop.station_name)?.enabled).flatMap(stop => {
          const times: TrainStopData[] = [];
          if (!stop) {
            return times;
          }
          if (stop.arrive_time && stop.arrive_time.match("\\d+:\\d+")) {
            times.push({stationName: stop.station_name, time: stop.arrive_time});
          }
          if (stop.start_time && stop.start_time.match("\\d+:\\d+")) {
            times.push({stationName: stop.station_name, time: stop.start_time});
          }
          return times;
        }),
        borderColor: "rgb(64,64,64)",
        borderWidth: 1,
        pointRadius: 0,
      }
    })
  }
  const options: ChartOptions<"line"> = {
    scales: {
      x: {
        type: "time",
        time: {
          parser: "HH:mm",
          unit: "minute",
          displayFormats: {
            minute: "HH:mm"
          }
        }
      },
      y: {
        type: "category",
        labels: stations.filter(({enabled}) => enabled).map(({stationName}) => stationName)
      }
    },
    parsing: {
      xAxisKey: "time",
      yAxisKey: "stationName"
    }
  };

  function getEnabledCallback(index: number): ChangeEventHandler<HTMLInputElement> {
    return e => {
      const newTrains = [...trains];
      newTrains[index].enabled = e.target.checked;
      setTrains(newTrains);
    }
  }

  return (
    <div className="flex flex-col items-center p-4 gap-4">
      <div className="text-xl">{date}</div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
        {trains.map((train, index) =>
          <div key={index} className="px-2 rounded-xl bg-sky-100">
            <TrainSummaryCard stationNames={stationNames} train={train} showDetail={false} enabledOption={true} enabledOptionCallback={getEnabledCallback(index)}/>
          </div>
        )}
      </div>
      <Line data={data} options={options}></Line>
    </div>
  )
}
