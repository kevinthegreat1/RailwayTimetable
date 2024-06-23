import {StationNames, TrainSummary} from "@/types";
import {getStationName} from "@/utils/station-names";

export function TrainSummaryCard({stationNames, trainSummary}: { stationNames: StationNames, trainSummary: TrainSummary }) {
  return (
    <div className="divide-y text-center divide-blue-200">
      <div className="py-2">{trainSummary.station_train_code}</div>
      <div className="py-2 flex justify-evenly items-center">
        <div>
          <div>{trainSummary.start_time}</div>
          <div>{trainSummary.from_station_name} ({trainSummary.from_station_telecode})</div>
          <div>始：{getStationName(stationNames, trainSummary.start_station_telecode)} ({trainSummary.start_station_telecode})</div>
        </div>
        <div>→</div>
        <div>
          <div>{trainSummary.arrive_time}</div>
          <div>{trainSummary.to_station_name} ({trainSummary.to_station_telecode})</div>
          <div>终：{getStationName(stationNames, trainSummary.end_station_telecode)} ({trainSummary.end_station_telecode})</div>
        </div>
      </div>
    </div>
  )
}
