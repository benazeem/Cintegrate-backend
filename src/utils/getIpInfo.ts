import { fetch } from 'undici';

interface IpInfo {
  ipVersion: number;
  ipAddress: string;
  latitude: number;
  longitude: number;
  countryName: string;
  countryCode: string;
  capital: string;
  phoneCodes: number[];
  timeZones: string[];
  zipCode: string;
  cityName: string;
  regionName: string;
  continent: string;
  continentCode: string;
  currencies: string[];
  languages: string[];
  asn: string;
  asnOrganization: string;
  isProxy: boolean;
}

export async function getIpInfo(ip: string) {
  try {
    const res = await fetch(`https://free.freeipapi.com/api/json/${ip}`);
    const data = (await res.json()) as IpInfo;
    return { success: true, ...data };
  } catch (e) {
    console.error('Error fetching IP info:', e);
    return { success: false, message: 'Failed to fetch IP info' };
  }
}
