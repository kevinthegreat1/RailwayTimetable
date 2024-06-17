"use client";

import {useEffect, useState} from "react";
import RouteEntry from "@/components/route-entry";
import {StationNames} from "@/types";

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

  return (
    <main className="h-dvh bg-sky-50">
      <div className="flex flex-col items-stretch justify-between p-4">
        <div className="m-4 p-4 rounded-3xl bg-sky-100">
          <RouteEntry date={true}/>
        </div>
        <ul className="m-4 px-4 divide-y rounded-3xl bg-sky-100 divide-blue-200">
          <li className="py-4 flex items-center">
            <div className="grow basis-0"></div>
            <div className="text-xl">路径</div>
            <div className="grow basis-0 flex justify-end">
              <button className="w-8 h-8 rounded-full text-lg bg-sky-200">⊕</button>
            </div>
          </li>
          <li className="py-2"><RouteEntry bothWayOption={true}/></li>
          <li className="py-2"><RouteEntry bothWayOption={true}/></li>
        </ul>
      </div>
    </main>
  )
}
