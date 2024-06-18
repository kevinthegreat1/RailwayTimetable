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
}

export type DatedRoute = Route & {
  date: string,
}

export type RouteToSearch = Route & {
  bothWays: boolean,
}

export type RoutesToSearch = RouteToSearch[];
