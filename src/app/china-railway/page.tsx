"use client";

import {useEffect, useState} from "react";
import {StationNames, Trains, TrainSummary} from "@/types";
import {RoutesForm} from "@/components/routes-form";
import {Timetable} from "@/components/timetable";
import {TrainSummaries} from "@/components/train-summaries";
import {Loading} from "@/components/loading";

export default function TimetablePage() {
  const [stationNames, setStationNames] = useState<StationNames>([]);
  useEffect(() => {
    async function fetchStationNames() {
      const stationNamesResponse = await fetch("/china-railway/station-names");
      setStationNames(await stationNamesResponse.json());
    }

    // noinspection JSIgnoredPromiseFromCall
    fetchStationNames();
  }, []);

  const [trainSummaries, setTrainSummaries] = useState<TrainSummary[]>([]);
  const [loadTrainSummaries, setLoadTrainSummaries] = useState<boolean>(false);
  const [trains, setTrains] = useState<Trains>([]);
  const [generateTimetable, setGenerateTimetable] = useState<boolean>(false);
  if (generateTimetable) {
    if (trains && trains.length) {
      return (
        <main className="min-h-screen bg-sky-50">
          <Timetable trains={trains}/>
        </main>
      )
    } else {
      return <Loading/>
    }
  } else if (loadTrainSummaries) {
    if (trainSummaries && trainSummaries.length) {
      return (
        <main className="min-h-screen bg-sky-50">
          <TrainSummaries stationNames={stationNames} trainSummaries={trainSummaries} generateTimetable={() => setGenerateTimetable(true)}/>
        </main>
      )
    } else {
      return <Loading/>
    }
  } else {
    return (
      <main className="min-h-screen bg-sky-50">
        <RoutesForm setLoadingTrainSummaries={setLoadTrainSummaries} stationNames={stationNames} setTrainSummaries={setTrainSummaries} setTrains={setTrains}/>
      </main>
    )
  }
}
