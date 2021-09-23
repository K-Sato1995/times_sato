/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import {
  Query,
  DocumentData,
  FirestoreError,
  onSnapshot,
} from 'firebase/firestore'
import { useRecoilState, RecoilState } from 'recoil'

interface IState {
  id: string
}

function useCollectionDataWithRecoil<State extends IState>(
  query: Query<DocumentData>,
  recoilState: RecoilState<State[]>,
): { result: DocumentData[]; loading: boolean; error: FirestoreError | null } {
  const [result, setResult] = useRecoilState<State[]>(recoilState)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const unsbscribe = onSnapshot(query, (fbData) => {
      try {
        setLoading(true)
        const data: State[] = []

        fbData.forEach((doc) => {
          const item = { ...doc.data(), id: doc.id } as State
          data.push(item)
        })

        setResult(data)
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

export default useCollectionDataWithRecoil