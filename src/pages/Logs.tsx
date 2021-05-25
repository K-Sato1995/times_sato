import React from 'react'
import { firestore, firebase } from 'firebaseConfig'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { ContentWrapper } from 'components/atoms'
import { LoadingState } from 'components/molecules'
import { LogItem, NewLogItemForm, NewCategoryForm } from 'components/organisms'
import styled from 'styled-components'

interface Props {
  currentUser: firebase.User
}

const CategoryContainer = styled.div`
  :not(: first-child) {
    margin-top: 1rem;
  }
`

const ItemsConatiner = styled.div`
  border: solid ${(props) => props.theme.borderColor} 1px;
  border-bottom: 0;
`

const CategoryTag = styled.span`
  display: inline-block;
  color: #fff;
  border-top-left-radius: 2.5px;
  border-top-right-radius: 2.5px;
  padding: 0.2rem 0.5rem;
  background-color: ${(props: { color?: string }) =>
    props.color ? props.color : (props) => props.theme.primaryColor};
`

const Logs = ({ currentUser }: Props) => {
  const logCategoriesRef = firestore.collection('logCategories')
  const logItemsRef = firestore.collection('logItems')

  const categoriesQuery = logCategoriesRef
  const itemsQuery = logItemsRef

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

  return (
    <ContentWrapper>
      {Object.keys(logItemsByCateogory).map((key: string, idx: number) => {
        const items = logItemsByCateogory[key].items
        const tagColor = logItemsByCateogory[key].color
        const categoryID = logItemsByCateogory[key].categoryID
        return (
          <CategoryContainer key={idx}>
            <CategoryTag color={tagColor}>{key}</CategoryTag>
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
