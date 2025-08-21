export interface LocationDetails {

    location: Location
  }
  
  export interface Location {
    address: string[]
    adminDistrict: string | undefined[]
    adminDistrictCode: string | undefined[]
    city: string[]
    country: string[]
    countryCode: string[]
    displayName: string[]
    displayContext: string[]
    ianaTimeZone: string[]
    latitude: number[]
    locale: Locale[]
    longitude: number[]
    neighborhood: any[]
    placeId: string[]
    postalCode: string[]
    postalKey: string[]
    disputedArea: boolean[]
    disputedCountries: any[]
    disputedCountryCodes: any[]
    disputedCustomers: any[]
    disputedShowCountry: boolean[][]
    iataCode: string[]
    icaoCode: string[]
    locId: string[]
    locationCategory: any[]
    pwsId: string[]
    type: string[]
  }
  
  export interface Locale {
    locale1?: string
    locale2: string
    locale3?: string
    locale4: any
  }
  