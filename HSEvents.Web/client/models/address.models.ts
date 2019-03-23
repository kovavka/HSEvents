export class Address {
    id: number;
    caption: string;
    shortName: string;
    house: string;
    streetId: number;
}

export class Street {
    id: number;
    name: string;
    city: City;
    areaName: string;
}

export class City {
    id: number;
    name: string;
    cityType: CityType;
    region: Region;
    areaName: string;
}

export class CityType {
    id: number;
    name: string;
    shortName: string;
}

export class Region {
    id: number;
    name: string;
    country: Country;
}

export class Country {
    id: number;
    name: string;
}
