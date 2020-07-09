import React from 'react'
import { array } from 'prop-types'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

const MyTableHead = ({ fields }) => {
  return (
    <TableHead>
      <TableRow>
        {fields.map(({ text }) => (
          <TableCell key={text}>{text}</TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

MyTableHead.propTypes = {
  fields: array,
}

export default MyTableHead
