import React from 'react'
import { array, bool, number } from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableContainer from '@material-ui/core/TableContainer'
import Paper from '@material-ui/core/Paper'
import TableBody from './TableBody'
import TableHead from './TableHead'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
})

const MyTable = ({ data, fields, loading, perPage }) => {
  const classes = useStyles()

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead fields={fields} />

        <TableBody
          data={data}
          fields={fields}
          loading={loading}
          perPage={perPage}
        />
      </Table>
    </TableContainer>
  )
}

MyTable.propTypes = {
  data: array,
  fields: array,
  loading: bool,
  perPage: number,
}

export default MyTable
