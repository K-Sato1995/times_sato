/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import {
  Query,
  DocumentData,
  FirestoreError,
  onSnapshot,
} from 'firebase/firestore'

function useCollectionData(
  query: Query<DocumentData>,
): [DocumentData[], boolean, FirestoreError | null] {
  const [result, setResult] = useState<DocumentData[]>([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const unsbscribe = onSnapshot(query, (fbData) => {
      try {
        setLoading(true)
        const data: DocumentData[] = []

        fbData.forEach((doc) => {
          data.push({ ...doc.data(), id: doc.id })
        })

        setResult(data)
        setLoading(false)
      } catch (err) {
        setLoading(false)
        setError(err)
      }
    })

    return () => {
      unsbscribe()
    }
  }, [])

  return [result, loading, error]
}

export default useCollectionData
