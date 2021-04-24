const isKSato = (uid: string) => {
  return uid === `${process.env.REACT_APP_MY_UID}`
}

const isValidWebUrl = (url: string) => {
  let regEx = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_.~#?&//=]*)$/gm
  return regEx.test(url)
}

export { isKSato, isValidWebUrl }
