
import {useAppSelector, useAppDispatch} from '../../hooks'
import {selectAppRows, selectUserListStatus, getAppList} from './appSlice'
import {useEffect} from "react"

const Apps = () => {
  const appRows = useAppSelector(selectAppRows)
  const status = useAppSelector(selectUserListStatus)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getAppList({ pageNumber: 1, pageSize: 25 }))
  }, [])

  return (
    <div>
      {status}
      {appRows?.length}
    </div>
  )

}


export default Apps