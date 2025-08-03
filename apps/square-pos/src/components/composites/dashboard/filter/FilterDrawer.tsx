'use client'

import { ButtonVariant } from '@/components/primitives/derived/Button'
import { Checkbox } from '@/components/primitives/ui/checkbox'
import Drawer from '@/components/primitives/ui/drawer'
import { Label } from '@/components/primitives/ui/label'
import categoryObjects from '@/shared/constants/categories.json'
import type { CategoryObject } from '@/shared/types/catalog'
import {
  buildCategoryFilterParams,
  clearSelectedCategories,
  isCategorySelected,
  toggleCategory,
} from '@/shared/utils/filter/filterUtils'
import { useState } from 'react'
import { FaFilter } from 'react-icons/fa'
import {
  body,
  checkbox,
  close,
  content,
  footer,
  label,
  title,
  trigger,
} from './styles/FilterDrawer.styles'

// Button component to open the filter drawer and apply category filters.
export default function FilterDrawer({ setParams, prevParams }: FilterButtonProps) {
  const [open, setOpen] = useState(false)

  // Applies the selected categories as filters using the utility function.
  const onApply = (selected: CategoryObject[]) => {
    setParams(buildCategoryFilterParams(selected, prevParams))
  }

  const [selected, setSelected] = useState<CategoryObject[]>([])

  // Toggles a category in the selected list
  const handleToggle = (category: CategoryObject) => {
    setSelected((prev) => toggleCategory(category, prev))
  }

  const onClose = () => setOpen(false)

  // Applies the selected categories and closes the drawer.
  const handleApply = () => {
    onApply(selected)
    onClose()
  }

  // Clears all selected categories, applies no filter, and closes the drawer.
  const handleClear = () => {
    setSelected(clearSelectedCategories())
    onApply([]) // * call the API with no filter query
    onClose()
  }

  return (
    <Drawer.Root open={open} onOpenChange={setOpen} side="left">
      <Drawer.Trigger className={trigger}>
        <FaFilter style={{ fontSize: 15 }} />
        <span>Filter</span>
      </Drawer.Trigger>

      <Drawer.Content className={content}>
        <Drawer.Close className={close}>&times;</Drawer.Close>

        <Drawer.Title className={title}>Filter by Category</Drawer.Title>

        <Drawer.Body className={body}>
          {categoryObjects.map((category) => (
            <Label key={category.id} className={label}>
              <Checkbox
                size="sm"
                checked={isCategorySelected(category, selected)}
                onCheckedChange={() => handleToggle(category)}
                className={checkbox}
              />
              {category.name}
            </Label>
          ))}
        </Drawer.Body>

        <Drawer.Footer className={footer}>
          <ButtonVariant
            variant="primary"
            bg="gray.700"
            hover={{ bg: 'gray.600' }}
            onClick={handleApply}
            disabled={selected.length === 0}
          >
            Apply Filter
          </ButtonVariant>
          <ButtonVariant
            variant="outlined"
            bg="gray.200"
            hover={{ bg: 'gray.300' }}
            onClick={handleClear}
            disabled={selected.length === 0}
          >
            Clear Filter
          </ButtonVariant>
        </Drawer.Footer>
      </Drawer.Content>
    </Drawer.Root>
  )
}
