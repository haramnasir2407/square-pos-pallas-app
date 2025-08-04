'use client'

import { useState } from 'react'

import Image from 'next/image'

import CustomSelect from '@/components/primitives/derived/CustomSelect'
import { Button } from '@/components/primitives/ui/button'
import { Checkbox } from '@/components/primitives/ui/checkbox'
import { Label } from '@/components/primitives/ui/label'
import type { Discount } from '@/shared/store/useCartStore'
import { FaTrash } from 'react-icons/fa6'
import { Box, Flex } from '~/styled-system/jsx'
import { flex } from '~/styled-system/patterns'
import {
  cardContainer,
  discountCheckbox,
  discountLabel,
  discountSelect,
  image,
  itemInfo,
  itemName,
  itemPrice,
  itemStock,
  moreOptionsButton,
  optionsContainer,
  qtyButton,
  qtyButtonDisabled,
  qtyRow,
  qtyValue,
  removeButton,
  taxCheckbox,
  taxLabel,
  taxRow,
  taxSelect,
} from './styles/CartItemCard.styles'
import Select from '@/components/primitives/ui/select'
import { css } from '~/styled-system/css'
import { ButtonVariant } from '@/components/primitives/derived/Button'

export default function CartItemCard({
  item,
  inventory,
  atMaxQty,
  selectedDiscount,
  discounts,
  taxes,
  onQtyChange,
  onRemove,
  onDiscountToggle,
  onDiscountSelect,
  onTaxToggle,
  onTaxSelect,
}: CartItemCardProps) {
  const [showOptions, setShowOptions] = useState(false)

  return (
    <Flex direction="column" gap="2" bg="white" p="4" mb="4" className={cardContainer}>
      <Flex align="center" gap="4">
        <Image src={item.imageUrl} alt={item.name} width={48} height={48} className={image} />
        <Box className={itemInfo}>
          <Box className={itemName}>{item.name}</Box>
          <Box className={itemPrice}>${item.price ? (item.price / 100).toFixed(2) : 'N/A'}</Box>
          <Box className={itemStock}>Qty in stock: {inventory?.quantity ?? '-'}</Box>
        </Box>
        <ButtonVariant
          variant="text"
          size="icon"
          className={removeButton}
          onClick={onRemove}
          aria-label="Remove item"
        >
          <FaTrash fill="gray.50" />
        </ButtonVariant>
      </Flex>
      <Box className={qtyRow}>
        <ButtonVariant
          variant="text"
          size="icon"
          className={qtyButton}
          onClick={() => onQtyChange(item.quantity - 1)}
          disabled={item.quantity <= 1}
        >
          -
        </ButtonVariant>
        <span className={qtyValue}>{item.quantity}</span>
        <ButtonVariant
          variant="text"
          size="icon"
          className={atMaxQty ? qtyButtonDisabled : qtyButton}
          onClick={() => onQtyChange(item.quantity + 1)}
          disabled={atMaxQty}
        >
          +
        </ButtonVariant>
        <ButtonVariant
          variant="text"
          size="icon"
          className={moreOptionsButton}
          onClick={() => setShowOptions((v) => !v)}
        >
          {showOptions ? 'Hide options' : 'More options'}
        </ButtonVariant>
      </Box>
      {showOptions && (
        <Flex direction="column" gap="2" className={optionsContainer}>
          {/* Tax */}
          {taxes.length > 0 && (
            <Flex className={taxRow}>
              <Label className={taxLabel}>
                <Checkbox
                  size="sm"
                  className={taxCheckbox}
                  checked={!!item.is_taxable && item.itemTaxRate !== undefined}
                  onCheckedChange={(checked) => onTaxToggle(checked as boolean)}
                />
                Apply Tax
              </Label>
              <Select.Root
                size="sm"
                value={item.itemTaxRate?.toString() ?? ''}
                onValueChange={onTaxSelect}
              >
                <Select.Trigger className={css({ fontSize: 'xs' })}>
                  <Select.Value placeholder="Select Tax" />
                </Select.Trigger>
                <Select.Content
                  position="popper"
                  sideOffset={5}
                  className={css({
                    zIndex: 1000,
                    fontSize: 'xs',
                  })}
                >
                  <Select.Group>
                    <Select.Label>Taxes</Select.Label>
                    {taxes.map((tax) => (
                      <Select.Item
                        key={tax.name}
                        value={tax.percentage?.toString() ?? ''}
                        className={css({ fontSize: 'xs' })}
                      >
                        {tax.name} ({tax.percentage}%)
                      </Select.Item>
                    ))}
                  </Select.Group>
                </Select.Content>
              </Select.Root>
            </Flex>
          )}
          {/* Discount */}
          {discounts.length > 0 && (
            <Flex align="center" gap="2">
              <Label className={discountLabel}>
                <Checkbox
                  size="sm"
                  className={discountCheckbox}
                  checked={!!item.itemDiscount}
                  onCheckedChange={(checked) => onDiscountToggle(checked as boolean)}
                />
                Apply Discount
              </Label>
              <Select.Root
                size="sm"
                value={selectedDiscount?.discount_name || ''}
                onValueChange={(value) => {
                  const discount = discounts.find((d) => d.discount_name === value)
                  onDiscountSelect(discount as Discount)
                }}
              >
                <Select.Trigger className={css({ fontSize: 'xs' })}>
                  <Select.Value placeholder="Select Discount" />
                </Select.Trigger>
                <Select.Content
                  position="popper"
                  sideOffset={5}
                  className={css({
                    zIndex: 1000,
                    fontSize: 'xs',
                  })}
                >
                  <Select.Group>
                    <Select.Label>Discounts</Select.Label>
                    {discounts.map((discount) => (
                      <Select.Item
                        key={discount.discount_name}
                        value={discount.discount_name}
                        className={css({ fontSize: 'xs' })}
                      >
                        {discount.discount_name}
                      </Select.Item>
                    ))}
                  </Select.Group>
                </Select.Content>
              </Select.Root>
            </Flex>
          )}
        </Flex>
      )}
    </Flex>
  )
}
