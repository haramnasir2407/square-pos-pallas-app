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
        <Button
          variant="default"
          size="sm"
          className={removeButton}
          onClick={onRemove}
          aria-label="Remove item"
        >
          <FaTrash fill="gray.50" />
        </Button>
      </Flex>
      <Box className={qtyRow}>
        <Button
          variant="default"
          size="sm"
          className={qtyButton}
          onClick={() => onQtyChange(item.quantity - 1)}
          disabled={item.quantity <= 1}
        >
          -
        </Button>
        <span className={qtyValue}>{item.quantity}</span>
        <Button
          variant="default"
          size="sm"
          className={atMaxQty ? qtyButtonDisabled : qtyButton}
          onClick={() => onQtyChange(item.quantity + 1)}
          disabled={atMaxQty}
        >
          +
        </Button>
        <Button
          variant="default"
          size="sm"
          className={moreOptionsButton}
          onClick={() => setShowOptions((v) => !v)}
        >
          {showOptions ? 'Hide options' : 'More options'}
        </Button>
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
              <CustomSelect
                id="tax"
                value={item.itemTaxRate?.toString() ?? ''}
                onChange={onTaxSelect}
                options={[
                  { value: '', label: 'Select Tax' },
                  ...taxes.map((tax) => ({
                    value: tax.percentage?.toString() ?? '',
                    label: `${tax.name} (${tax.percentage}%)`,
                  })),
                ]}
                placeholder="Select Tax"
                size="sm"
                className={taxSelect}
              />
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
              <CustomSelect
                id="discount"
                value={selectedDiscount?.discount_name || ''}
                onChange={(value) => {
                  const discount = discounts.find((d) => d.discount_name === value)
                  onDiscountSelect(discount as Discount)
                }}
                options={[
                  { value: '', label: 'Select Discount' },
                  ...discounts.map((discount) => ({
                    value: discount.discount_name,
                    label: `${discount.discount_name}`,
                  })),
                ]}
                placeholder="Select Discount"
                size="sm"
                className={discountSelect}
              />
            </Flex>
          )}
        </Flex>
      )}
    </Flex>
  )
}
