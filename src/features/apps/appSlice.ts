import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../store"
import { fetchApps, fetchAppOverviewUsers } from "./appAPI"

type FetchAppsArgs = {
  pageNumber: number;
  pageSize: number;
};

interface AppRow {
  appId: string;
  appName: string;
  appSources: AppSource[];
  category: string;
}

export interface AppUsers {
  appUsers: string[];
}

enum AppSource {
  APP_SOURCE_GOOGLE = "APP_SOURCE_GOOGLE",
  APP_SOURCE_MSFT = "APP_SOURCE_MSFT"
}

export interface AppsData {
  appRows: AppRow[];
}

interface AppsSlice {
  appRows: AppRow[] | null,
  status: "idle" | "loading" | "failed"
  activeApp: AppRow | null
  appUsers: string[] | null
}

const initialState: AppsSlice = {
  appRows: null,
  status: "idle",
  activeApp: null,
  appUsers: null
}

export const getAppList = createAsyncThunk(
  "apps/fetchApps",
  async ({pageNumber, pageSize}: FetchAppsArgs) => {
    return await fetchApps(pageNumber, pageSize)
  },
)

export const getAppOverviewUserList = createAsyncThunk(
  "apps/fetchApps",
  async ({pageNumber, pageSize}: FetchAppsArgs) => {
    return await fetchAppOverviewUsers(pageNumber, pageSize)
  },
)

export const appsSlice = createSlice({
  name: "apps",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAppList.pending, (state) => {
        state.status = "loading"
      })
      .addCase(getAppList.fulfilled, (state, action) => {
        state.status = "idle"
        state.appRows = action.payload.appRows
      })
      .addCase(getAppList.rejected, (state) => {
        state.status = "failed"
      })
      .addCase(getAppOverviewUserList.pending, (state) => {
        state.status = "loading"
      })
      .addCase(getAppOverviewUserList.fulfilled, (state, action) => {
        state.status = "idle"
        state.appUsers = action.payload.appUsers
      })
      .addCase(getAppOverviewUserList.rejected, (state) => {
        state.status = "failed"
      })
  },
})

export const selectAppRows = (state: RootState) => state.apps.appRows
export const selectActiveApp = (state: RootState) => state.apps.activeApp
export const selectActiveAppUserList = (state: RootState) => state.apps.appUsers
export const selectStatus = (state: RootState) => state.apps.status

export default appsSlice.reducer
