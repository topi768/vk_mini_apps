import axios from "axios";

const API_URL = "https://showtime.app-dich.com/api";

export const getFindCat = async () => {
  const searchParams = window.location.search;
  const url = `${API_URL}/findcat${searchParams}`;

  return axios.get(url);
};

export const getHealth = async () => {
  const searchParams = window.location.search;
  const url = `${API_URL}/health${searchParams}`;

  return axios.get(url);
};
