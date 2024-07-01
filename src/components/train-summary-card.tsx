import {StationNames, Train} from "@/types";
import {getStationName} from "@/utils/station-names";

export function TrainSummaryCard({stationNames, train}: { stationNames: StationNames, train: Train }) {
  const {trainSummary, trainStops} = train;

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
      <div className="py-2">
        {trainStops.map((trainStop, index) =>
          <div key={index} className="flex justify-between items-center">
            <div>{trainStop.station_no}. {trainStop.station_name}</div>
            <div>{trainStop.arrive_time} - {trainStop.start_time}</div>
            <div>{trainStop.stopover_time.endsWith("分钟") ? trainStop.stopover_time.substring(0, trainStop.stopover_time.length - 1) : trainStop.stopover_time}</div>
          </div>
        )}
      </div>
    </div>
  )
}
