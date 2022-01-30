import { selector } from 'recoil'
import { logCategoriesState, logItemsState, logsState } from 'recoil/logs'

export const allLogsState = selector({
  key: 'allLogsState',
  get: ({ get }) => {
    const categories = get(logCategoriesState)
    const logItems = get(logItemsState)
    const logs = get(logsState)

    const sortedCategories = [...categories].sort(
      (a, b) => a.createdAt - b.createdAt,
    )
    const sortedLogItems = [...logItems].sort(
      (a, b) => a.createdAt - b.createdAt,
    )

    const logCategoryWithChildren: LogCategoryWithChildren[] = []
    const logItemsWithChildLogs: LogItemWithChildLogs[] = []

    sortedLogItems.forEach((logItem) => {
      let logsData = logs
        ?.filter((log) => log.logItemID === logItem.id)
        .sort((a, b) => a.createdAt - b.createdAt)

      logItemsWithChildLogs.push({ ...logItem, logs: logsData })
    })

    sortedCategories.forEach((category) => {
      let logItems = logItemsWithChildLogs
        ?.filter((item) => item.categoryID === category.id)
        .sort((a, b) => a.createdAt - b.createdAt)

      logCategoryWithChildren.push({
        ...category,
        logItems,
      })
    })

    return logCategoryWithChildren
  },
})
