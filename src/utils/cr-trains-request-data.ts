export type RequestDataTrains = [{
  train_date: string,
  from_station: string,
  to_station: string,
}]

export type RequestDataTrainsToday = RequestDataTrains & [{
  baseDTO: {
    time_str: string
  }
}];

export const requestDataTrainsToday: RequestDataTrainsToday = [{
  train_date: "",
  from_station: "",
  to_station: "",
  baseDTO: {
    time_str: ""
  }
}]

export type RequestDataTrainsOtherDay = RequestDataTrains & [{
  purpose_codes: string,
  station_train_code: string,
  start_time_begin: string,
  start_time_end: string,
  train_headers: string,
  train_flag: string,
  seat_type: string,
  seatBack_Type: string,
  ticket_num: string,
  dfpStr: string,
  baseDTO: {
    time_str: string,
    os_type: string,
    device_no: string,
    user_name: string,
    check_code: string,
    version_no: string,
  }
}];

export const requestDataTrainsOtherDay: RequestDataTrainsOtherDay = [{
  train_date: "",
  purpose_codes: "00",
  from_station: "",
  to_station: "",
  station_train_code: "",
  start_time_begin: "",
  start_time_end: "",
  train_headers: "QB#",
  train_flag: "",
  seat_type: "",
  seatBack_Type: "",
  ticket_num: "",
  dfpStr: "",
  baseDTO: {
    time_str: "",
    os_type: "",
    device_no: "",
    user_name: crypto.randomUUID(),
    check_code: "",
    version_no: "",
  }
}];
