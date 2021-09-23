/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import {
  DocumentReference,
  DocumentData,
  FirestoreError,
  onSnapshot,
} from 'firebase/firestore'

function useDocumentData(
  query: DocumentReference<DocumentData>,
): [DocumentData | null, boolean, FirestoreError | null] {
  const [result, setResult] = useState<DocumentData | null>(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const unsbscribe = onSnapshot(query, (doc: DocumentData) => {
      try {
        setLoading(true)
        setResult(doc.data())
        setLoading(false)
      } catch (err: any) {
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

export default useDocumentData
