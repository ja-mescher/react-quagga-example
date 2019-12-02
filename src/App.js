import React, { Fragment, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import './App.css';
import AppBar from './components/AppBar'
import Results from './components/Results'
import Fab from '@material-ui/core/Fab';
import CameraIcon from '@material-ui/icons/FilterCenterFocus';
import CloseIcon from '@material-ui/icons/Close';
import ReactQuagga, { useQuagga } from './components/ReactQuagga'

import Dialog from '@material-ui/core/Dialog';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles(theme => ({
  content: {
    flex: 1,
    display: 'flex',
  },
  fab: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    margin: theme.spacing(2),
    zIndex: 1000,
  },
  dialog: {
    backgroundColor: 'rgba(0,0,0,.25)',
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />;
});

const App = () => {
  const classes = useStyles();
  const [scannerIsActive, setScannerIsActive] = useState(false)
  const [results, setResults] = useState([])
  const scannerSupported = useQuagga()

  return (
    <Fragment>
      <AppBar />
      <Dialog
        fullScreen={scannerSupported}
        open={scannerIsActive}
        onClose={() => setScannerIsActive(false)}
        TransitionComponent={Transition}
        classes={{paperFullScreen: classes.dialog}}
      >
        {scannerIsActive ? (
          <Fragment>
            <Fab
              color="primary"
              aria-label="Scan"
              className={classes.fab}
              onClick={() => setScannerIsActive(false)}
            >
              <CloseIcon />
            </Fab>
            {scannerSupported ? (
              <ReactQuagga
                onDetected={(data) => setResults(results => ([...results, data]))}
              />
            ) : (
              <div>{"Quagga is not supported for this device or browser."}</div>
            )}
          </Fragment>
        ) : <div/>}
      </Dialog>
      <Fab
        color="primary"
        aria-label="Scan"
        className={classes.fab}
        onClick={() => setScannerIsActive(true)}
      >
        <CameraIcon />
      </Fab>
      <div className={classes.content}>
        <Results results={results}/>
      </div>
    </Fragment>
  )
}

export default App;
