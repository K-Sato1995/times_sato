import React from 'react'
import styled from 'styled-components'

const LegendContainer = styled.div`
  /* border: solid ${(props) => props.theme.borderColor} 1px; */
  width: 50%;
`

const LegendItem = styled.div`
  margin: 0.5rem 0;
`

const LegendBar = styled.progress`
  border: solid ${(props) => props.theme.borderColor} 1px;
  border-radius: 2.5px;
  width: 100%;
  height: 0.7rem;

  ::-webkit-progress-bar {
    background-color: ${(props: { backgroundColor?: string; theme?: any }) =>
      props.theme.borderColor};
  }

  ::-webkit-progress-value {
    background-color: ${(props: { backgroundColor?: string }) =>
      props.backgroundColor
        ? props.backgroundColor
        : (props) => props.theme.primaryColor};
  }
`

const LegendText = styled.span`
  display: inline-block;
`

interface LegendData {
  value: number
  percentage: number
  title: string
  color: string
}

interface Props {
  data?: LegendData[]
}

const ChartLegend = ({ data }: Props) => {
  return (
    <LegendContainer>
      {data
        ?.sort((a, b) => b.percentage - a.percentage)
        .map((item, idx) => {
          const percentage = item.percentage
          return (
            <LegendItem key={idx}>
              <LegendText>{`${item.title}(${percentage}%)`}</LegendText>
              <LegendBar
                backgroundColor={item.color}
                value={percentage}
                max="100"
              ></LegendBar>
            </LegendItem>
          )
        })}
    </LegendContainer>
  )
}

export default ChartLegend
