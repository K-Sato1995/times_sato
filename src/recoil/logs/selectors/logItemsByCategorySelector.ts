import { selector } from 'recoil'
import { logCategoriesState, logItemsState } from 'recoil/logs'

export const logItemsByCategoryState = selector({
  key: 'logItemsByCategoryState',
  get: ({ get }) => {
    const categories = get(logCategoriesState)
    const logItems = get(logItemsState)

    const sortedCategories = [...categories].sort(
      (a, b) => a.createdAt - b.createdAt,
    )
    const logItemsByCateogory: LogItemsByCategory = {}

    sortedCategories.forEach((category) => {
      let items = logItems
        ?.filter((item) => item.categoryID === category.id)
        .sort((a, b) => a.createdAt - b.createdAt)

      logItemsByCateogory[category.name] = {
        color: category.color,
        categoryID: category.id,
        items,
      }
    })

    return logItemsByCateogory
  },
})
