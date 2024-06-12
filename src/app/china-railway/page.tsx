export default function Timetable() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-12 bg-sky-100">
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
    </main>
  )
}
