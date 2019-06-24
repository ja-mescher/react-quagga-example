import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types';
import quagga from 'quagga'
import './ReactQuagga.css'

const ReactQuagga = ({
  config,
  onDetected: handleDetected,
  onProcessed: handleProcessed
}) => {
  const quaggaRef = useRef(null)

  useEffect(() => {
    const { inputStream: initAttrs } = config
    initAttrs['target'] = quaggaRef
    quagga.init(
      { ...config, inputStream: initAttrs },
      (error) => {
        if(error) {
          console.error(error)
          return
        }
        quagga.onDetected(handleDetected)
        if(handleProcessed) {
          quagga.onProcessed(handleProcessed)
        }
        quagga.start()
      }
    )
    return () => {
      quagga.offDetected(handleDetected)
      if(handleProcessed) {
        quagga.offProcessed(handleProcessed)
      }
      quagga.stop()
    }
  })

  return (
    <div
      ref=quaggaRef
      className="viewport overlay__content"
    />
  )
}

ReactQuagga.propTypes = {
  config: PropTypes.object.isRequired,
  onDetected: PropTypes.func.isRequired,
  onProcessed: PropTypes.func,

};

export default ReactQuagga;
