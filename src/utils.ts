const isKSato = (uid: string) => {
  return uid === `${process.env.REACT_APP_MY_UID}`
}

export { isKSato }
