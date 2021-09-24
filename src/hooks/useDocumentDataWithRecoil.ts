/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import {
  DocumentReference,
  DocumentData,
  FirestoreError,
  onSnapshot,
} from 'firebase/firestore'
import { useRecoilState, RecoilState } from 'recoil'

interface IState {
  id: string
}

function useDocumentDataWithRecoil<State extends IState>(
  query: DocumentReference<DocumentData>,
  recoilState: RecoilState<State | null>,
): {
  result: DocumentData | null
  loading: boolean
  error: FirestoreError | null
} {
  const [result, setResult] = useRecoilState<State | null>(recoilState)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const unsbscribe = onSnapshot(query, (doc: DocumentData) => {
      try {
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

  return { result, loading, error }
}

export default useDocumentDataWithRecoil
