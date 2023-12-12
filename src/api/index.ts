import { PersonResponse } from "./types";

const BASE_URL = 'https://swapi.dev/api/people/';


export const peopleSearch = async (term?: string): Promise<PersonResponse> => {
  const url = BASE_URL + (term && `?search=${term}`);
  const response = await fetch(url);
  return await response.json()
}