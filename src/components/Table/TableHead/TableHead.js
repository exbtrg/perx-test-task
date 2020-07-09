import React from 'react'
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

export default MyTableHead
