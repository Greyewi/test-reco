import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../store"
import { fetchApps, fetchAppOverviewUsers } from "./appAPI"

type FetchAppsArgs = {
  pageNumber: number;
  pageSize: number;
};

type FetchUserAppsArgs = {
  pageNumber: number;
  pageSize: number;
  appId: string
};

export interface AppRow {
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

export interface AppsSlice {
  appRows: AppRow[] | null,
  appListStatus: "idle" | "loading" | "failed"
  appOverviewUserListStatus: "idle" | "loading" | "failed"
  activeApp: AppRow | null
  appUsers: string[] | null
}

const initialState: AppsSlice = {
  appRows: null,
  appListStatus: "idle",
  appOverviewUserListStatus: "idle",
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
  "apps/fetchAppOverviewUsers",
  async ({pageNumber, pageSize, appId}: FetchUserAppsArgs) => {
    return await fetchAppOverviewUsers(pageNumber, pageSize, appId)
  },
)

export const appsSlice = createSlice({
  name: "apps",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAppList.pending, (state) => {
        state.appListStatus = "loading"
      })
      .addCase(getAppList.fulfilled, (state, action) => {
        state.appListStatus = "idle"
        state.appRows = action.payload.appRows
      })
      .addCase(getAppList.rejected, (state) => {
        state.appListStatus = "failed"
      })
      .addCase(getAppOverviewUserList.pending, (state) => {
        state.appOverviewUserListStatus = "loading"
      })
      .addCase(getAppOverviewUserList.fulfilled, (state, action) => {
        state.appOverviewUserListStatus = "idle"
        state.appUsers = action.payload.appUsers
      })
      .addCase(getAppOverviewUserList.rejected, (state) => {
        state.appOverviewUserListStatus = "failed"
      })
  },
})

export const selectAppRows = (state: RootState) => state.apps.appRows
export const selectActiveApp = (state: RootState) => state.apps.activeApp
export const selectActiveAppUserList = (state: RootState) => state.apps.appUsers
export const selectAppStatus = (state: RootState) => state.apps.appListStatus
export const selectUserListStatus = (state: RootState) => state.apps.appOverviewUserListStatus

export default appsSlice.reducer
