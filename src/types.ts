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

export type TrainSummary = {
  arrive_time: string,
  controlled_train_flag: string,
  controlled_train_message: string,
  day_difference: string,
  end_station_telecode: string,
  exchange_train_flag: string,
  flag: string,
  from_station_name: string,
  from_station_telecode: string,
  houbu_train_flag: string,
  is_support_card: string,
  lishi: string,
  location_code: string,
  message: string,
  start_station_telecode: string,
  start_time: string,
  start_train_date: string,
  station_train_code: string,
  to_station_name: string,
  to_station_telecode: string,
  train_no: string,
  yp_ex: string,
  yp_info: string,
  yp_info_cover: string,
  yp_info_coverFlag: string,
}

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

export type Train = {
  trainSummary: TrainSummary,
  trainStops: TrainStops,
  enabled: boolean
}

export type Trains = Train[];

export type Station = {
  stationName: string,
  enabled: boolean
}
