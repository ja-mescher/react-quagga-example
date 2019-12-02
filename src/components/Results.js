import React, { Fragment } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider'

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 500,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    margin: 'auto',
    padding: theme.spacing(1),
    flex: 1,
    overflow: 'auto',
  },
  list: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  }
}))

const Results = ({results}) => {
  const classes = useStyles()

  return (
    <Paper className={classes.root}>
      <List className={classes.list}>
        {results.slice(0).reverse().map((result, index) => (
          <Fragment>
            <ListItem>
              <ListItemText
                primary={result.codeResult.code}
                secondary={result.codeResult.format}
              />
            </ListItem>
            <Divider />
          </Fragment>
        ))}
      </List>
    </Paper>
  )
}

export default Results
