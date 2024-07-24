import {useState} from "react";
import {Station, Trains} from "@/types";
import {CategoryScale, Chart, ChartData, ChartOptions, LineElement, PointElement, TimeScale} from "chart.js";
import {Line} from "react-chartjs-2";
import "chartjs-adapter-dayjs-4/dist/chartjs-adapter-dayjs-4.esm"

type TimetableProps = { trains: Trains, sortedStations: string[] };
type TrainStopData = { stationName: string, time: string };

export function Timetable({trains, sortedStations}: TimetableProps) {
  Chart.register(CategoryScale, LineElement, PointElement, TimeScale);

  const [stations, setStations] = useState<Station[]>(sortedStations.map(stationName => ({stationName, enabled: true})));

  const data: ChartData<"line", TrainStopData[]> = {
    datasets: trains.map(train => {
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

  return (
    <Line data={data} options={options}></Line>
  )
}
