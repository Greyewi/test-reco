import {FC, Dispatch, SetStateAction, memo} from "react";

type SetDispatchNumber<T> = Dispatch<SetStateAction<T>>
interface Props {page: number, size: number, setPage: SetDispatchNumber<number>, setSize: SetDispatchNumber<25 | 50>}
const Pagination: FC<Props> = memo(({page, size, setPage, setSize}) => {
  return (<div>
    <span onClick={() => setPage(prev => prev > 0 ? prev - 1 : 0)}>
      {'<'}
    </span>
    {page}
    <span onClick={() => setPage(prev => prev + 1)}>
      {'>'}
    </span>
    <select defaultValue={size} onChange={e => setSize(Number(e.target.value) as 25 | 50)}>
      <option value={25}>25</option>
      <option value={50}>50</option>
    </select>
  </div>)
})

export default Pagination