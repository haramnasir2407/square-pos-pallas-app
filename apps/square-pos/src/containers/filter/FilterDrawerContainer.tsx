import { FilterDrawerUI } from '@/components/composites/dashboard/filter/FilterDrawerUI'
import type { CategoryObject } from '@/shared/types/catalog'
import {
  buildCategoryFilterParams,
  clearSelectedCategories,
  toggleCategory,
} from '@/shared/utils/filter/filterUtils'
import { useState } from 'react'

export default function FilterDrawer({
  setParams,
  prevParams,
  categoryObjects,
}: FilterButtonProps) {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<CategoryObject[]>([])

  const onApply = () => {
    setParams(buildCategoryFilterParams(selected, prevParams))
    setOpen(false)
  }

  const onClear = () => {
    setSelected(clearSelectedCategories())
    setParams(buildCategoryFilterParams([], prevParams))
    setOpen(false)
  }

  const handleToggle = (category: CategoryObject) => {
    setSelected((prev) => toggleCategory(category, prev))
  }

  return (
    <FilterDrawerUI
      open={open}
      setOpen={setOpen}
      categoryObjects={categoryObjects}
      selected={selected}
      onToggle={handleToggle}
      onApply={onApply}
      onClear={onClear}
    />
  )
}
