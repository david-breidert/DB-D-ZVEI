async function getUserAudio() {
  return await navigator.mediaDevices.getUserMedia({ audio: true })
}

async function createContext(stream) {
  const sfx = new AudioContext()
  const source = sfx.createMediaStreamSource(stream)
  const analyser = sfx.createAnalyser()
  analyser.minDecibels = -40
  analyser.maxDecibels = -10
  analyser.smoothingTimeConstant = 0.25
  source.connect(analyser)

  return { sfx, analyser }
}

function getCurrentFrequencyFft(sfx, analyser) {
  const nyquist = sfx.sampleRate / 2
  const frequencyPerBin = nyquist / analyser.frequencyBinCount
  var frequencyData = new Uint8Array(analyser.frequencyBinCount)
  analyser.getByteFrequencyData(frequencyData)
  let peak = 0
  frequencyData.forEach((v, i) => {
    if (v > frequencyData[peak]) {
      peak = i
    }
  })
  if (frequencyData[peak] > 80) {
    return peak * frequencyPerBin
  } else {
    return -1
  }
}

export { getUserAudio, createContext, getCurrentFrequencyFft }
