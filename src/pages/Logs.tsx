import React from 'react'
import { db } from 'firebaseConfig'
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
import { useCollectionDataWithRecoil } from 'hooks'
import {
  logCategoriesState,
  logItemsState,
  logItemsByCategoryState,
} from 'recoil/logs'
import { useRecoilValue } from 'recoil'
import { PieChart } from 'react-minimal-pie-chart'
import { collection, query, where } from 'firebase/firestore'
import { User } from 'firebase/auth'
import randomColor from 'randomcolor'

interface Props {
  currentUser: User
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

const Logs = ({ currentUser }: Props) => {
  const { uid } = currentUser
  const {
    loading: categoriesLoading,
    error: categoriesError,
  } = useCollectionDataWithRecoil<LogCategory>(
    query(collection(db, 'logCategories'), where('uid', '==', uid)),
    logCategoriesState,
  )

  const {
    result: logItems,
    loading: logItemsLoading,
    error: logItemsError,
  } = useCollectionDataWithRecoil<LogItem>(
    query(collection(db, 'logItems'), where('uid', '==', uid)),
    logItemsState,
  )

  const logItemsByCateogory = useRecoilValue(logItemsByCategoryState)

  const sumOfTotalHours = logItems.reduce((acc, obj) => acc + obj.totalHours, 0)

  const formattedDataForChart = logItems
    ?.filter((item) => item.totalHours)
    .map((item) => {
      return {
        title: item.name,
        value: item.totalHours,
        percentage: Math.round((item.totalHours / sumOfTotalHours) * 100),
        color: randomColor({ luminosity: 'light' }),
      }
    })

  if (categoriesError || logItemsError) {
    categoriesError && console.log(categoriesError)
    logItemsError && console.log(logItemsError)
  }

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
              data={formattedDataForChart}
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
            <ChartLegend data={formattedDataForChart} />
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
