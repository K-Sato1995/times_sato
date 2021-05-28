import React from 'react'
import { firestore, firebase } from 'firebaseConfig'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { ContentWrapper } from 'components/atoms'
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

interface Props {
  currentUser: firebase.User
}

const CategoryContainer = styled.div`
  :not(: first-child) {
    margin-top: 1rem;
  }
`

const ChartWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`

const ItemsConatiner = styled.div`
  border: solid ${(props) => props.theme.borderColor} 1px;
  border-bottom: 0;
`

const Logs = ({ currentUser }: Props) => {
  const logCategoriesRef = firestore.collection('logCategories')
  const logItemsRef = firestore.collection('logItems')
  const categoriesQuery = logCategoriesRef
  const itemsQuery = logItemsRef
  let sumOfTotalHours = 0
  const [logCategories, categoriesLoading, categoriesError] = useCollectionData(
    categoriesQuery,
    {
      idField: 'id',
    },
  )

  const [logItems, logItemsLoading, logItemsError] = useCollectionData(
    itemsQuery,
    {
      idField: 'id',
    },
  )

  if (categoriesError || logItemsError) {
    categoriesError && console.log(categoriesError.message)
    logItemsError && console.log(logItemsError.message)
  }

  let logItemsByCateogory: LogItemsByCategory = {}

  logCategories
    ?.sort((a, b) => a.createdAt - b.createdAt)
    .forEach((category) => {
      let items = logItems
        ?.filter((item) => item.categoryID === category.id)
        .sort((a, b) => a.createdAt - b.createdAt)

      logItemsByCateogory[category.name] = {
        color: category.color,
        categoryID: category.id,
        items,
      }
    })

  if (categoriesLoading || logItemsLoading) return <LoadingState />

  logItems?.forEach((item) => (sumOfTotalHours += item.totalHours))

  const formattedData = logItems
    ?.filter((item) => item.totalHours)
    .map((item) => {
      const randomColor = require('randomcolor')

      return {
        title: item.name,
        value: item.totalHours,
        percentage: Math.round((item.totalHours / sumOfTotalHours) * 100),
        color: randomColor(),
      }
    })

  return (
    <ContentWrapper>
      <ChartWrapper>
        <PieChart
          style={{
            fontSize: '2px',
            width: '400px',
            height: '300px',
          }}
          data={formattedData}
          radius={PieChart.defaultProps.radius - 6}
          label={() => `${sumOfTotalHours}h`}
          lineWidth={60}
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
