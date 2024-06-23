import {StationNames, TrainSummary} from "@/types";
import {TrainSummaryCard} from "@/components/train-summary-card";

export function TrainSummaries({stationNames, trainSummaries, generateTimetable}: { stationNames: StationNames, trainSummaries: TrainSummary[], generateTimetable: () => void }) {
  return (
    <div className="h-dvh flex flex-col items-center p-4 gap-4">
      <div className="text-xl">列车（{trainSummaries.length}列）</div>
      <div className="grow overflow-auto scrollbar-hide grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
        {trainSummaries.map((trainSummary, index) =>
          <div key={index} className="px-2 rounded-xl bg-sky-100">
            <TrainSummaryCard stationNames={stationNames} trainSummary={trainSummary}/>
          </div>
        )}
      </div>
      <button onClick={generateTimetable} className="px-6 py-2 rounded-full text-lg bg-sky-200">生成时刻表</button>
    </div>
  )
}
