import { useState } from 'react'
import { getDocs } from 'firebase/firestore'

type FirestoreQuery = any

const useCollectionData = async (query: FirestoreQuery) => {
  const [values, setValues] = useState<any>([])
  const querySnapshot = await getDocs(query)
  const docs: any[] = []

  querySnapshot.forEach((doc: any) => {
    docs.push({ ...doc.data(), id: doc.id })
  })

  setValues(docs)

  return values
}

export { useCollectionData }
