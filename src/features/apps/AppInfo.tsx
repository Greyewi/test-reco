import {useAppSelector, useAppDispatch} from '../../hooks'
import {
  selectActiveApp,
  selectActiveAppUserList,
  selectUserListStatus,
  getAppOverviewUserList,
  AppRow,
} from './appSlice'
import {useEffect, useState} from "react";
import Pagination from "./Pagination";

const AppInfo = ({app}: {app: AppRow}) => { // TODO
  // const selectActiveApp = useAppSelector(selectActiveApp)
  // const selectActiveAppUserList = useAppSelector(selectActiveAppUserList)
  const status = useAppSelector(selectUserListStatus)
  const dispatch = useAppDispatch()
  const [page, setPage] = useState<number>(0)
  const [size, setSize] = useState<25 | 50>(25)

  useEffect(() => {
    dispatch(getAppOverviewUserList({ pageNumber: page, pageSize: size , appId: app.appId}))
  })

  return (
    <section>
      {status}
      {/*{selectActiveApp.appId}*/}
      {/*{selectActiveApp.appName}*/}
      <Pagination page={page} size={size} setPage={setPage} setSize={setSize}/>
    </section>
  )
}


export default AppInfo