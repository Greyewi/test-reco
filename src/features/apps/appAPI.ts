import axios, {AxiosResponse} from "axios";
import {AppsData, AppUsers} from './appSlice'

const BASE_URL = 'https://79c8-37-214-70-154.ngrok-free.app/api/v1/app-service'

export const fetchApps = async (pageNumber: number, pageSize: number) => {
  const response: AxiosResponse<AppsData> = await axios.put(`${BASE_URL}/get-apps`, {
    pageNumber,
    pageSize
  });
  return response.data;
}

export const fetchAppOverviewUsers = async (pageNumber: number, pageSize: number) => {
  const response: AxiosResponse<AppUsers> = await axios.get(`${BASE_URL}/get-app-overview-users/airbnb.com`, {
    params: {
      pageNumber,
      pageSize
    }
  });
  return response.data;
}