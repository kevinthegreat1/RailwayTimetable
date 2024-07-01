"use client";

import {useEffect, useState} from "react";
import {StationNames, Trains} from "@/types";
import {RoutesForm} from "@/components/routes-form";
import {Timetable} from "@/components/timetable";
import {TrainSummaries} from "@/components/train-summaries";
import {Loading} from "@/components/loading";
import {isLoaded} from "@/utils/train";

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

  const [trains, setTrains] = useState<Trains>([]);
  const [loadTrainSummaries, setLoadTrainSummaries] = useState<boolean>(false);
  const [generateTimetable, setGenerateTimetable] = useState<boolean>(false);

  if (generateTimetable) {
    if (trains && trains.every(isLoaded)) {
      return (
        <main className="min-h-screen bg-sky-50">
          <Timetable trains={trains}/>
        </main>
      )
    } else {
      return <Loading/>
    }
  } else if (loadTrainSummaries) {
    if (trains && trains.length) {
      return (
        <main className="min-h-screen bg-sky-50">
          <TrainSummaries stationNames={stationNames} trains={trains} generateTimetable={() => setGenerateTimetable(true)}/>
        </main>
      )
    } else {
      return <Loading/>
    }
  } else {
    return (
      <main className="min-h-screen bg-sky-50">
        <RoutesForm setLoadTrainSummaries={setLoadTrainSummaries} stationNames={stationNames} setTrains={setTrains}/>
      </main>
    )
  }
}
