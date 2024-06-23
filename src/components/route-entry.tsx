import {ChangeEventHandler} from "react";

export type RouteEntryProps = {
  fromStationLabel?: string,
  fromStationText?: string,
  fromStationTextCallback: ChangeEventHandler<HTMLInputElement>,
  fromStationName?: string,
  toStationLabel?: string,
  toStationText?: string,
  toStationTextCallback: ChangeEventHandler<HTMLInputElement>,
  toStationName?: string,
  date?: string
  dateCallback?: ChangeEventHandler<HTMLInputElement>,
  bothWaysOption?: boolean,
  bothWays?: boolean,
  bothWaysCallback?: ChangeEventHandler<HTMLInputElement>,
};

export default function RouteEntry({fromStationLabel = "出发地", fromStationText = "", fromStationTextCallback, fromStationName, toStationLabel = "目的地", toStationText = "", toStationTextCallback, toStationName, date, dateCallback = () => {}, bothWaysOption = true, bothWays = true, bothWaysCallback = () => {}}: RouteEntryProps) {
  return (
    <div className="flex justify-around flex-wrap gap-2">
      <div className="flex flex-col items-center">
        <label htmlFor="fromStation">{fromStationLabel}</label>
        <input id="fromStation" value={fromStationText} onChange={fromStationTextCallback} className="px-1 rounded-lg"></input>
        <div>{fromStationName}</div>
      </div>
      <div className="flex flex-col items-center">
        <label htmlFor="toStation">{toStationLabel}</label>
        <input id="toStation" value={toStationText} onChange={toStationTextCallback} className="px-1 rounded-lg"></input>
        <div>{toStationName}</div>
      </div>
      {date && <div className="flex flex-col items-center">
          <label htmlFor="date">日期</label>
          <input id="date" value={date} onChange={dateCallback} className="px-1 rounded-lg" placeholder={new Date().toISOString().split('T')[0]}></input>
      </div>}
      {bothWaysOption && <div className="flex flex-col items-center">
          <label htmlFor="bothWay">双向</label>
          <input id="bothWay" type="checkbox" checked={bothWays} onChange={bothWaysCallback} className="m-2"/>
      </div>}
    </div>
  )
}
