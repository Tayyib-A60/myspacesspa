export interface Space {
    id: number;
    name: string;
    locationAddress: string;
    long: string;
    lat: string;
    price: number;
    discount: number;
    selectedPricingOption: PricingOption;
    minimumTerm: string;
    description: string;
    size: number;
    typeId: number;
    userId: number;
    amenities: Amenity[];
    photos: any[]
}
export interface Location {
    id: number;
    locationAddress: string;
    long: string;
    lat: string;
}
export interface Pricing {
    id: number;
    price: string;
    discount: number;
}

export interface Amenity {
    name: string;
    price: number;
}

// export interface PricingOption {
//     id: number;
//     option: string;
//     description: string;
// }

export interface Type {
    type: string;
    id: number;
}

export interface LocationDetails {
    locationName: string;
    lat: string;
    long: string;
}

export enum PricingOption {
    Hourly,
    Daily
}
export enum BookingStatus {
    Reserved,
    Booked,
    Done
}