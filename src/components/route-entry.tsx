export default function RouteEntry() {
  return (
    <div className="flex min-w-full justify-around">
      <div className="flex flex-col items-center">
        <label htmlFor="fromStation">出发地</label>
        <input id="fromStation"></input>
      </div>
      <div className="flex flex-col items-center">
        <label htmlFor="toStation">目的地</label>
        <input id="toStation"></input>
      </div>
      <div className="flex flex-col items-center">
        <label htmlFor="date">日期</label>
        <input id="date" placeholder={new Date().toISOString().split('T')[0]}></input>
      </div>
    </div>
  )
}
