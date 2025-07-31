'use client'

import categoryObjects from '@/shared/constants/categories.json'
import { useState } from 'react'
import { FaFilter } from 'react-icons/fa'
import { css } from '~/styled-system/css'
import type { CategoryObject } from '@/shared/types/catalog'
import {
  buildCategoryFilterParams,
  clearSelectedCategories,
  isCategorySelected,
  toggleCategory,
} from '@/shared/utils/filter/filterUtils'
import { flex } from '~/styled-system/patterns'
import Drawer from '@/components/primitives/ui/drawer'
import { Label } from '@/components/primitives/ui/label'
import { Checkbox } from '@/components/primitives/ui/checkbox'
import { Button } from '@/components/primitives/ui/button'
import { IoMdClose } from 'react-icons/io'
import { ButtonComponent } from '@/components/primitives/derived/Button'

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
      <Drawer.Trigger
        className={flex({
          borderRadius: 'md',
          alignItems: 'center',
          justifyContent: 'space-between',
          py: 'padding.block.md',
          px: 'padding.inline.md',
          gap: 'gap.inline.sm',
          color: 'black',
          fontWeight: 'normal',
          cursor: 'pointer',
          boxShadow: 'sm',
          bg: 'gray.50',
        })}
      >
        <FaFilter style={{ fontSize: 15 }} />
        <span>Filter</span>
      </Drawer.Trigger>

      <Drawer.Content
        className={flex({
          justify: 'center',
          w: '20vw',
          direction: 'column',
          py: '8',
          px: '6',
        })}
      >
        <Drawer.Close
          className={flex({
            alignSelf: 'flex-end',
            fontSize: '2xl',
            bg: 'none',
            border: 'none',
            cursor: 'pointer',
          })}
        >
          <IoMdClose />
        </Drawer.Close>
        <Drawer.Title className={css({ fontWeight: 'bold', fontSize: 'xl' })}>
          Filter by Category
        </Drawer.Title>

        <Drawer.Body
          className={flex({ direction: 'column', gap: 'gap.inline.sm', overflowY: 'auto' })}
        >
          {categoryObjects.map((category) => (
            <Label
              key={category.id}
              className={flex({
                fontSize: 'md',
                alignItems: 'center',
                gap: 'gap.component.sm',
                cursor: 'pointer',
              })}
            >
              <Checkbox
                size="sm"
                checked={isCategorySelected(category, selected)}
                onCheckedChange={() => handleToggle(category)}
                className={css({ cursor: 'pointer' })}
              />
              {category.name}
            </Label>
          ))}
        </Drawer.Body>

        <Drawer.Footer className={flex({ direction: 'column', gap: 'gap.inline.sm' })}>
          <ButtonComponent
            bg="gray.800"
            color="white"
            hover={{ bg: 'gray.700' }}
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
