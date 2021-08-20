import { useEffect } from 'react'
import { getCLS, getFCP, getFID, getLCP, getTTFB } from 'web-vitals'

const WebVitals = () => {
  useEffect(() => {
    getTTFB(console.log)
    getFCP(console.log)
    getCLS(console.log)
    getFID(console.log)
    getLCP(console.log)
  }, [])
  return null
}
export default WebVitals
