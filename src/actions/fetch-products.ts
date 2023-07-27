"use server";
import { Beer } from "@/types";

export async function fetchBeers(page: number) {
  const perPage = 24;
  const apiUrl = `https://api.punkapi.com/v2/beers?page=${page}&per_page=${perPage}`;
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data as Beer[];
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}
