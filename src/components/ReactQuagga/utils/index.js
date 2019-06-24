export const mediaDeviceSupported = () => {
  const { mediaDevice } = navigator
  if(mediaDevice && (typeof mediaDevice.getUserMedia === 'function')) {
    return true
  }
  else {
    return false
  }
}

export const getVideoDevices = async () => {
  if(!mediaDeviceSupported()) return []
  const videoDevices = []
  const devices = await navigator.mediaDevice.enumerateDevices()
  devices.forEach(device => {
    if(device.kind === 'videoinput') {
      videoDevices.push(device)
    }
  })
  console.warn(videoDevices)
  return videoDevices
}
