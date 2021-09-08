import React, { useState, useEffect } from 'react'
import { db, firebase } from 'firebaseConfig'
import { ContentWrapper, Heading } from 'components/atoms'
import { LoadingState } from 'components/molecules'
import {
  LogItem,
  NewLogItemForm,
  NewCategoryForm,
  CategoryTag,
  ChartLegend,
} from 'components/organisms'
import styled from 'styled-components'
import { PieChart } from 'react-minimal-pie-chart'
import { where, query, collection, getDocs } from 'firebase/firestore'

interface Props {
  currentUser: firebase.User
}

const CategoryContainer = styled.div`
  :not(: first-child) {
    margin-top: 1rem;
  }
`

const ChartTitle = styled(Heading)`
  margin-left: 1rem;
`

const ChartHeader = styled.div`
  border-bottom: solid ${(props) => props.theme.borderColor} 1px;
`

const ChartContent = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;

  @media screen and (max-width: 29.9999em) {
    padding: 0;
    display: block;
  }
`
const ChartWrapper = styled.div`
  border: solid ${(props) => props.theme.borderColor} 1px;
  padding: 1rem;
  border-radius: 10px;
  position: relative;
  min-height: 370px;
`

const ItemsConatiner = styled.div`
  border: solid ${(props) => props.theme.borderColor} 1px;
  border-bottom: 0;
`

const LocalLoaderWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
`

/*
Really don't like how I named all the things. So confusing.....

  LogCategory > LogItems > Logs
*/

const Logs = ({ currentUser }: Props) => {
  const { uid } = currentUser
  const logCategoriesRef = collection(db, 'logCategories')
  const logItemsRef = collection(db, 'logItems')

  const categoriesQuery = query(logCategoriesRef, where('uid', '==', uid))
  const itemsQuery = query(logItemsRef, where('uid', '==', uid))
  let sumOfTotalHours = 0

  const [categories, setCategories] = useState<any[]>([])

  const [logs, setLogs] = useState<any[]>([])

  useEffect(() => {
    const getCategories = async () => {
      const querySnapshot = await getDocs(categoriesQuery)

      let categoryDocs: any[] = []
      querySnapshot.forEach((doc) => {
        categoryDocs.push({ ...doc.data(), id: doc.id })
      })

      await setCategories(categoryDocs)
    }

    const getLogs = async () => {
      const querySnapshot = await getDocs(itemsQuery)

      let logDocs: any[] = []
      querySnapshot.forEach((doc) => {
        logDocs.push({ ...doc.data(), id: doc.id })
      })

      setLogs(logDocs)
    }

    getCategories()
    getLogs()
  }, [setCategories, setLogs, categoriesQuery, itemsQuery])

  let logItemsByCateogory: LogItemsByCategory = {}

  console.log(categories)
  console.log(logs)
  categories
    ?.sort((a, b) => a.createdAt - b.createdAt)
    .forEach((category) => {
      let items = logs
        ?.filter((item) => item.categoryID === category.id)
        .sort((a, b) => a.createdAt - b.createdAt)

      logItemsByCateogory[category.name] = {
        color: category.color,
        categoryID: category.id,
        items,
      }
    })

  logs?.forEach((item) => (sumOfTotalHours += item.totalHours))

  const formattedData = logs
    ?.filter((item) => item.totalHours)
    .map((item) => {
      const randomColor = require('randomcolor')

      return {
        title: item.name,
        value: item.totalHours,
        percentage: Math.round((item.totalHours / sumOfTotalHours) * 100),
        color: randomColor({ luminosity: 'light' }),
      }
    })

  return (
    <ContentWrapper>
      <ChartWrapper>
        <ChartHeader>
          <ChartTitle size={'h2'}>Time Breakdown</ChartTitle>
        </ChartHeader>

        <ChartContent>
          <PieChart
            style={{
              fontSize: '2px',
              height: '300px',
            }}
            data={formattedData}
            radius={PieChart.defaultProps.radius - 6}
            label={() => `${sumOfTotalHours}h`}
            lineWidth={30}
            segmentsStyle={{ transition: 'stroke .3s', cursor: 'pointer' }}
            animate
            labelPosition={0}
            labelStyle={{
              fontSize: '10px',
              fill: '#697980',
              opacity: 0.75,
              pointerEvents: 'none',
            }}
          />
          <ChartLegend data={formattedData} />
        </ChartContent>
      </ChartWrapper>

      {Object.keys(logItemsByCateogory).map((key: string, idx: number) => {
        const items = logItemsByCateogory[key].items
        const tagColor = logItemsByCateogory[key].color
        const categoryID = logItemsByCateogory[key].categoryID
        const category = {
          id: categoryID,
          name: key,
          color: logItemsByCateogory[key].color,
        }
        return (
          <CategoryContainer key={idx}>
            <CategoryTag
              logCategory={category}
              backgroundColor={tagColor}
              text={key}
            />
            <ItemsConatiner>
              {items?.map((item: any) => (
                <LogItem key={item.id} item={item} categoryColor={tagColor} />
              ))}

              <NewLogItemForm
                currentUser={currentUser}
                categoryID={categoryID}
                categoryColor={tagColor}
              />
            </ItemsConatiner>
          </CategoryContainer>
        )
      })}

      <NewCategoryForm currentUser={currentUser} />
    </ContentWrapper>
  )
}

export default Logs
