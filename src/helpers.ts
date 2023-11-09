import { SALES_TAX_RATE } from './constants'
import { product, cart } from './types'

export const formatCurrency = (number: number): string => {
  return new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR'
  }).format(number)
}

export const getTotalCost = (cart: cart): number => {
  return cart.reduce((accumulator: number, product: product) => {
    return accumulator + product.price
  }, 0)
}

export const addSalesTax = (
  totalCostNoTax: number = 0,
  salesTaxRate: number = SALES_TAX_RATE
) => {
  return totalCostNoTax + (salesTaxRate / 100) * totalCostNoTax
}
