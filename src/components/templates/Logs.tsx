import React from 'react'
import { ContentWrapper, Heading } from 'components/atoms'

import {
  LogItem,
  NewLogItemForm,
  NewCategoryForm,
  CategoryTag,
  ChartLegend,
} from 'components/organisms'
import styled from 'styled-components'
import { PieChart } from 'react-minimal-pie-chart'
import { User } from 'firebase/auth'

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
  padding: 1rem;
  border-radius: 10px;
  position: relative;
  min-height: 300px;
  background-color: #fff;
  box-shadow: ${(props) => props.theme.boxShadow};

  &:before {
    content: '';
    height: 8px;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: linear-gradient(
      242.72deg,
      #5ad1f8,
      ${(props) => props.theme.primaryColor} 101.2%
    );
    border-top-left-radius: 10px 10px;
    border-top-right-radius: 10px 10px;
    position: absolute;
  }
`

const ItemsConatiner = styled.div`
  border-bottom: 0;
  background-color: #fff;
  border: 1px solid #fff;

  box-shadow: ${(props) => props.theme.boxShadow};
`

type formattedDataForChart = {
  title: string
  value: number
  percentage: number
  color: string
}

interface Props {
  currentUser: User
  formattedDataForChart: formattedDataForChart[]
  sumOfTotalHours: number
  logItemsByCateogory: LogItemsByCategory
}

export const LogsTemplate = ({
  currentUser,
  logItemsByCateogory,
  formattedDataForChart,
  sumOfTotalHours,
}: Props) => {
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
