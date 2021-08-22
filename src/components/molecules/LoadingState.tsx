import React from 'react'
import SyncLoader from 'react-spinners/SyncLoader'
import ClipLoader from 'react-spinners/ClipLoader'

type LoaderType = 'sync' | 'clip'

interface Props {
  loaderType?: LoaderType
}

const LoadingState = ({ loaderType }: Props) => {
  switch (loaderType) {
    case 'sync':
      return <SyncLoader color={'#e0e0e0'} />
    case 'clip':
      return <ClipLoader color={'#e0e0e0'} />
    default:
      return <SyncLoader color={'#e0e0e0'} />
  }
}

export default LoadingState
