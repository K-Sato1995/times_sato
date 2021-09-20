import { useState, useEffect } from 'react'
import {
  getDocs,
  Query,
  DocumentData,
  FirestoreError,
} from 'firebase/firestore'

function useCollectionData(
  query: Query<DocumentData>,
): [DocumentData[], boolean, FirestoreError | null] {
  const [result, setResult] = useState<DocumentData[]>([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const fbData = await getDocs(query)
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
    }

    fetchData()
  }, [])

  return [result, loading, error]
}

export default useCollectionData
