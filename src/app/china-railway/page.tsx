"use client";

import {useEffect, useState} from "react";
import {DatedRoute, StationNames, Trains} from "@/types";
import {RoutesForm} from "@/components/routes-form";
import {Timetable} from "@/components/timetable";
import {TrainSummaries} from "@/components/train-summaries";
import {Loading} from "@/components/loading";
import {isLoaded} from "@/utils/train";
import {sortStations} from "@/utils/sort-stations";

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

  const [timetableRoute, setTimetableRoute] = useState<DatedRoute>({bothWays: true, date: new Date().toISOString().split('T')[0]} as DatedRoute);

  const [trains, setTrains] = useState<Trains>([]);
  const [loadTrainSummaries, setLoadTrainSummaries] = useState<boolean>(false);
  const [generateTimetable, setGenerateTimetable] = useState<boolean>(false);

  const sortedStations = sortStations(stationNames, timetableRoute, trains);
  console.log("Sorted Stations:", sortedStations); // todo: test

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
        <RoutesForm timetableRoute={timetableRoute} setTimetableRoute={setTimetableRoute} setLoadTrainSummaries={setLoadTrainSummaries} stationNames={stationNames} setTrains={setTrains}/>
      </main>
    )
  }
}
