"use client";

import {ChangeEvent, useEffect, useState} from "react";
import RouteEntry from "@/components/route-entry";
import {DatedRoute, RoutesToSearch, RouteToSearch, StationNames} from "@/types";

export default function Timetable() {
  const [stationNames, setStationNames] = useState<StationNames>([]);
  useEffect(() => {
    async function fetchStationNames() {
      const stationNamesResponse = await fetch("/china-railway/station-names");
      setStationNames(await stationNamesResponse.json());
    }

    // noinspection JSIgnoredPromiseFromCall
    fetchStationNames();
  }, []);

  const [timetableRoute, setTimetableRoute] = useState<DatedRoute>({date: new Date().toISOString().split('T')[0]} as DatedRoute);
  const [routesToSearch, setRoutesToSearch] = useState<RoutesToSearch>([{bothWays: true} as RouteToSearch]);

  function getStationCode(stationName: string) {
    return stationNames.find(station => station.name === stationName || station.pinyinCode === stationName || station.pinyin === stationName || station.pinyinInitials === stationName)?.code;
  }

  function getStationName(stationCode?: string) {
    return stationNames.find(station => station.code === stationCode)?.name;
  }

  function getStationTextCallback(toStation: boolean, index: number) {
    return (e: ChangeEvent<HTMLInputElement>) => {
      const stationName = e.target.value;
      const stationCode = getStationCode(stationName);
      if (index < 0) {
        if (!toStation) {
          setTimetableRoute({...timetableRoute, fromStation: stationName, fromStationCode: stationCode});
        } else {
          setTimetableRoute({...timetableRoute, toStation: stationName, toStationCode: stationCode});
        }
      } else {
        const newRoutesToSearch = [...routesToSearch];
        if (!toStation) {
          newRoutesToSearch[index].fromStation = stationName;
          newRoutesToSearch[index].fromStationCode = stationCode;
        } else {
          newRoutesToSearch[index].toStation = stationName;
          newRoutesToSearch[index].toStationCode = stationCode;
        }
        setRoutesToSearch(newRoutesToSearch);
      }
    }
  }

  function dateCallback(e: ChangeEvent<HTMLInputElement>) {
    setTimetableRoute({...timetableRoute, date: e.target.value});
  }

  function newRouteToSearch() {
    setRoutesToSearch([...routesToSearch, {bothWays: true} as RouteToSearch])
  }

  function getBothWaysCallback(index: number) {
    return (e: ChangeEvent<HTMLInputElement>) => {
      const newRoutesToSearch = [...routesToSearch];
      newRoutesToSearch[index].bothWays = e.target.checked;
      setRoutesToSearch(newRoutesToSearch);
    }
  }

  return (
    <main className="h-dvh bg-sky-50">
      <div className="flex flex-col items-stretch justify-between p-4">
        <div className="m-4 p-4 rounded-3xl bg-sky-100">
          <RouteEntry
            fromStationText={timetableRoute.fromStation} fromStationTextCallback={getStationTextCallback(false, -1)} fromStationName={getStationName(timetableRoute.fromStationCode)}
            toStationText={timetableRoute.toStation} toStationTextCallback={getStationTextCallback(true, -1)} toStationName={getStationName(timetableRoute.toStationCode)}
            date={timetableRoute.date} dateCallback={dateCallback}/>
        </div>
        <ul className="m-4 px-4 divide-y rounded-3xl bg-sky-100 divide-blue-200">
          <li className="py-4 flex items-center">
            <div className="grow basis-0"></div>
            <div className="text-xl">路径</div>
            <div className="grow basis-0 flex justify-end">
              <button onClick={newRouteToSearch} className="w-8 h-8 rounded-full text-lg bg-sky-200">⊕</button>
            </div>
          </li>
          {routesToSearch.map((route, index) =>
            <li key={index} className="py-2"><RouteEntry
              fromStationText={route.fromStation} fromStationTextCallback={getStationTextCallback(false, index)} fromStationName={getStationName(route.fromStationCode)}
              toStationText={route.toStation} toStationTextCallback={getStationTextCallback(true, index)} toStationName={getStationName(route.toStationCode)}
              bothWaysOption={true} bothWays={route.bothWays} bothWaysCallback={getBothWaysCallback(index)}
            /></li>
          )}
        </ul>
      </div>
    </main>
  )
}
