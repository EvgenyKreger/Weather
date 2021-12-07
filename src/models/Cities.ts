export interface Cities {
    country: string,
    english: string,
    full_name: string,
    geonameid: null,
    id: number,
    iso: null,
    latitude: number,
    level: number,
    longitude: number,
    name: string,
    post: number,
    rajon: number,
    sound: string,
    sub_rajon: number,
    telcod: number,
    time_zone: number,
    tz: null,
    vid: number,
    wiki: null,
}

export interface General {
    time: string,
    base: string,
    clouds: cloudsType,
    cod: string,
    coord: coordType,
    dt: number,
    id: number,
    main: mainType,
    name: string,
    sys: sysType,
    timezone: number,
    visibility: number,
    weather: weatherSetType[],
    wind: windType

}

interface cloudsType {
    all: number
}

interface coordType {
    lat: number,
    lon: number
}

interface mainType {
    temp: number,
    feels_like: number,
    temp_min: number,
    temp_max: number,
    pressure: number,
    humidity: number,
    sea_level: number,
    //grnd_level: number
}

interface sysType {
    type: number,
    id: number,
    country: string,
    sunrise: number,
    sunset: number
}

interface weatherSetType {
    id: number,
    main: string,
    description: string,
    icon: string
}

interface windType {
    speed: number,
    deg: number,
    gust: number
}

export interface Values {
    time: string,
    base: string,
    clouds: cloudsType,
    cod: string,
    coord: coordType,
    dt: number,
    id: number,
    main: mainType,
    name: string,
    sys: sysType,
    timezone: number,
    visibility: number,
    weather: weatherSetType[],
    wind: windType
}