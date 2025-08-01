'use client'

import { ButtonComponent } from '@/components/primitives/derived/Button'
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

/**
 * Button component to open the filter drawer and apply category filters.
 */
export default function FilterDrawer({ setParams, prevParams }: FilterButtonProps) {
  const [open, setOpen] = useState(false)

  /**
   * Applies the selected categories as filters using the utility function.
   * @param {CategoryObj[]} selected - Selected categories.
   */
  const onApply = (selected: CategoryObject[]) => {
    setParams(buildCategoryFilterParams(selected, prevParams))
  }

  const [selected, setSelected] = useState<CategoryObject[]>([])

  /**
   * Toggles a category in the selected list.
   * @param {CategoryObj} category - The category to toggle.
   */
  const handleToggle = (category: CategoryObject) => {
    setSelected((prev) => toggleCategory(category, prev))
  }

  const onClose = () => setOpen(false)

  /**
   * Applies the selected categories and closes the drawer.
   */
  const handleApply = () => {
    onApply(selected)
    onClose()
  }

  /**
   * Clears all selected categories, applies no filter, and closes the drawer.
   */
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
          <ButtonComponent
            bg="gray.700"
            color="white"
            hover={{ bg: 'gray.600' }}
            cursor="pointer"
            onClick={handleApply}
            disabled={selected.length === 0}
          >
            Apply Filter
          </ButtonComponent>
          <ButtonComponent
            bg="gray.200"
            color="black"
            hover={{ bg: 'gray.300' }}
            cursor="pointer"
            onClick={handleClear}
            disabled={selected.length === 0}
          >
            Clear Filter
          </ButtonComponent>
        </Drawer.Footer>
      </Drawer.Content>
    </Drawer.Root>
  )
}
