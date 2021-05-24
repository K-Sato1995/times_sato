import React from 'react'
import { firestore, firebase } from 'firebaseConfig'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { LogItem, NewLogItemForm, NewCategoryForm } from 'components/organisms'
import { Heading } from 'components/atoms'
import { SyncLoader } from 'react-spinners'
import styled from 'styled-components'

interface Props {
  currentUser: firebase.User
}

const MainWrapper = styled.div`
  padding: 0 2.35rem 3.125rem 2.35rem;

  @media screen and (max-width: 29.9999em) {
    padding: 0.1rem 0.625rem 3.125rem 0.625rem;
  }
`

const LoaderWrapper = styled.div`
  position: absolute;
  top: 40%;
  left: 50%;
`

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

const NoPostWrapper = styled.div`
  padding: 2.5rem 0.315rem;
  display: flex;
  justify-content: center;
  margin: 1.625rem;
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

  logCategories?.forEach((category) => {
    let items = logItems?.filter((item) => item.categoryID === category.id)

    logItemsByCateogory[category.name] = {
      color: category.color,
      categoryID: category.id,
      items,
    }
  })

  if (categoriesLoading || logItemsLoading) {
    return (
      <LoaderWrapper>
        <SyncLoader color={'#e0e0e0'} />
      </LoaderWrapper>
    )
  }

  return (
    <MainWrapper>
      {logItems?.length ? (
        <>
          {Object.keys(logItemsByCateogory).map((key: string, idx: number) => {
            const items = logItemsByCateogory[key].items
            const tagColor = logItemsByCateogory[key].color
            const categoryID = logItemsByCateogory[key].categoryID
            return (
              <CategoryContainer key={idx}>
                <CategoryTag color={tagColor}>{key}</CategoryTag>
                <ItemsConatiner>
                  {items?.map((item: any) => (
                    <LogItem
                      key={item.id}
                      item={item}
                      categoryColor={tagColor}
                    />
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
        </>
      ) : (
        <NoPostWrapper>
          <Heading size="h2">Nothing was posted yet....</Heading>
        </NoPostWrapper>
      )}
    </MainWrapper>
  )
}

export default Logs
