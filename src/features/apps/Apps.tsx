import {useAppSelector, useAppDispatch} from '../../hooks'
import {selectAppRows, selectAppStatus, getAppList} from './appSlice'
import {useEffect, useState} from "react"
import Pagination from "./Pagination"
import style from './Apps.module.css'

const Apps = () => {
  const appRows = useAppSelector(selectAppRows)
  const status = useAppSelector(selectAppStatus)
  const dispatch = useAppDispatch()
  const [page, setPage] = useState<number>(0)
  const [size, setSize] = useState<25 | 50>(25)

  useEffect(() => {
    dispatch(getAppList({ pageNumber: 1, pageSize: 25 }))
  }, [])

  useEffect(() => {
    if(page !== 0 || size !== 25) {
      dispatch(getAppList({ pageNumber: page, pageSize: size }))
    }
  }, [page, size]);

  return (
    <div>
      {status}
      <h2>App Inventory</h2>
      <div className={style.table_container}>
        <section className={style.table_line}>
          <span className={style.table_cell}>Name</span>
          <span className={style.table_cell}>Category</span>
          <span className={style.table_cell}>Connector</span>
        </section>
        {/*// TODO :add handler to open active company*/}
        {appRows?.map(app => (<section key={app.appId} className={style.table_line}>
          <span className={style.table_cell}>{app.appName}</span>
          <span className={style.table_cell}>{app.category}</span>
          <span className={style.table_cell}>{app.appSources[0]}</span>
        </section>))}
      </div>
      <Pagination page={page} size={size} setPage={setPage} setSize={setSize}/>

    </div>
  )

}


export default Apps