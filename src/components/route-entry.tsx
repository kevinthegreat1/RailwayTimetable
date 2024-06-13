export type RouteEntryProps = {
  fromStationText?: string,
  toStationText?: string,
  date?: boolean
  bothWayOption?: boolean
};

export default function RouteEntry({fromStationText = "出发地", toStationText = "目的地", date = false, bothWayOption = false}: RouteEntryProps) {
  return (
    <div className="flex justify-around">
      <div className="flex flex-col items-center">
        <label htmlFor="fromStation">{fromStationText}</label>
        <input id="fromStation" className="px-1 rounded-lg"></input>
      </div>
      <div className="flex flex-col items-center">
        <label htmlFor="toStation">{toStationText}</label>
        <input id="toStation" className="px-1 rounded-lg"></input>
      </div>
      {date && <div className="flex flex-col items-center">
        <label htmlFor="date">日期</label>
        <input id="date" className="px-1 rounded-lg" placeholder={new Date().toISOString().split('T')[0]}></input>
      </div>}
      {bothWayOption && <div className="flex flex-col items-center">
        <label htmlFor="bothWay">双向</label>
        <input id="bothWay" type="checkbox" checked={true} className="m-2"/>
      </div>}
    </div>
  )
}
