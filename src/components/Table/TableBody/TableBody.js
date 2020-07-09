import React, { Fragment } from 'react'
import { array, bool, number } from 'prop-types'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import Skeleton from '@material-ui/lab/Skeleton'

const MyTableBody = ({ data, fields, loading, perPage }) => {
  const skeletonItemsCount = [...new Array(perPage)].map((_, i) => i)

  const SkeletonItem = () => (
    <>
      {fields.map(({ text }) => (
        <Fragment key={text}>
          <TableCell>
            <Skeleton variant="text" animation="wave" height={53} />
          </TableCell>
        </Fragment>
      ))}
    </>
  )

  const SkeletonItems = () => (
    <>
      {skeletonItemsCount.map((i) => (
        <TableRow key={i}>
          <SkeletonItem />
        </TableRow>
      ))}
    </>
  )

  const TableItem = ({ dataItem }) => (
    <>
      {fields.map(({ text, dataKey }) => (
        <Fragment key={text}>
          <TableCell>{dataItem[dataKey]}</TableCell>
        </Fragment>
      ))}
    </>
  )

  const TableItems = () => (
    <>
      {data.map(({ id, ...rest }) => (
        <TableRow key={id}>
          <TableItem dataItem={rest} />
        </TableRow>
      ))}
    </>
  )

  return <TableBody>{loading ? <SkeletonItems /> : <TableItems />}</TableBody>
}

MyTableBody.propTypes = {
  data: array,
  fields: array,
  loading: bool,
  perPage: number,
}

export default MyTableBody
