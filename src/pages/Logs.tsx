import React from 'react'
import { firebase, db } from 'firebaseConfig'
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
import useCollectionData from 'hooks/useCollectionData'
import { PieChart } from 'react-minimal-pie-chart'
import { collection, query, where } from 'firebase/firestore'

const randomColor = require('randomcolor')
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
  min-height: 300px;
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
  const categoriesQuery = query(
    collection(db, 'logCategories'),
    where('uid', '==', uid),
  )

  const logItemsQuery = query(
    collection(db, 'logItems'),
    where('uid', '==', uid),
  )

  const [categories, categoriesLoading, categoriesError] = useCollectionData(
    categoriesQuery,
  )

  let sumOfTotalHours = 0

  const [logItems, logItemsLoading, logItemsError] = useCollectionData(
    logItemsQuery,
  )

  if (categoriesError || logItemsError) {
    categoriesError && console.log(categoriesError)
    logItemsError && console.log(logItemsError)
  }

  let logItemsByCateogory: LogItemsByCategory = {}

  categories
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

  logItems?.forEach((item) => (sumOfTotalHours += item.totalHours))

  const formattedData = logItems
    ?.filter((item) => item.totalHours)
    .map((item) => {
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

        {logItemsLoading || categoriesLoading ? (
          <LocalLoaderWrapper>
            <LoadingState loaderType={'clip'} />
          </LocalLoaderWrapper>
        ) : (
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
        )}
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
