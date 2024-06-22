export type StationName = {
  pinyinCode: string,
  name: string,
  code: string,
  pinyin: string,
  pinyinInitials: string,
  stationCode: string,
  cityCode: string,
  city: string,
  countryCode: string,
  country: string,
  cityEn: string,
}

export type StationNames = StationName[];

export type Route = {
  fromStation: string,
  fromStationCode?: string,
  toStation: string,
  toStationCode?: string,
  bothWays: boolean,
}

export type DatedRoute = Route & {
  date: string,
}

export type Routes = Route[];

export type TrainStop = {
  arrive_time: string,
  station_name: string,
  isChina: string,
  start_time: string,
  stopover_time: string,
  station_no: string,
  country_code: string,
  country_name: string,
  isEnabled: boolean,
}

export type TrainStops = TrainStop[];

export type Trains = TrainStops[];
