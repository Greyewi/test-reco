import axios, {AxiosResponse} from "axios";
import {AppsData, AppUsers} from './appSlice'

//const BASE_URL = '/api/v1/app-service'

export const fetchApps = async (pageNumber: number, pageSize: number) => {
  const response: AxiosResponse<AppsData> = await axios.put('/api/v1/app-service/get-apps', {
    pageNumber,
    pageSize
  }, {
    headers: {
      'ngrok-skip-browser-warning': '69420'
    }
  });
  return response.data;
}

export const fetchAppOverviewUsers = async (pageNumber: number, pageSize: number, appId: string) => {
  const response: AxiosResponse<AppUsers> = await axios.get('/api/v1/app-service/get-app-overview-users/' + appId, {
    params: {
      pageNumber,
      pageSize
    },
    headers: {
      'ngrok-skip-browser-warning': '69420'
    }
  });
  return response.data;
}