import React from 'react'
import { func, number } from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Pagination from '@material-ui/lab/Pagination'
import { NativeSelect, Box, InputLabel } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
  select: {
    '& select': {
      paddingLeft: 8,
    },
  },
}))

const MyPagination = ({
  onChangePageNumber,
  onChangePerPage,
  count,
  perPage,
  currentPage,
}) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Box mr={5}>
        <Pagination
          count={count}
          variant="outlined"
          shape="rounded"
          page={currentPage}
          onChange={(_, num) => onChangePageNumber(num)}
        />
      </Box>

      <Box mr={2}>
        <InputLabel htmlFor="grouped-native-select">Показать</InputLabel>
      </Box>

      <NativeSelect
        defaultValue={perPage}
        id="grouped-native-select"
        className={classes.select}
        onChange={(e) => onChangePerPage(e)}
      >
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={30}>30</option>
        <option value={40}>40</option>
        <option value={50}>50</option>
      </NativeSelect>
    </div>
  )
}

MyPagination.propTypes = {
  onChangePageNumber: func,
  onChangePerPage: func,
  count: number,
  perPage: number,
  currentPage: number,
}

export default MyPagination
