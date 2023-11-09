import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import App from './App'
import { SALES_TAX_RATE } from './constants'

describe('Shopping Cart', () => {
  test('Loads with empty shopping cart', () => {
    render(<App salesTaxRate={0} />)
    const cartTitle = screen.getByText(/Cart/i)
    expect(cartTitle).toBeInTheDocument()
    const noProductsText = screen.getByText(/No products to display/i)
    expect(noProductsText).toBeInTheDocument()
    const cartTotal = screen.getByText(/Total: R 0,00/i)
    expect(cartTotal).toBeInTheDocument()
  })
  test('Loads with a Dove Soap product button', () => {
    render(<App salesTaxRate={0} />)
    const doveSoapButton = screen.getByTestId('dove-soap')
    expect(doveSoapButton.textContent).toBe('Dove Soap - 39.99')
  })
  test('Loads with a Axe Deo product button', () => {
    render(<App salesTaxRate={0} />)
    const doveSoapButton = screen.getByTestId('axe-deo')
    expect(doveSoapButton.textContent).toBe('Axe Deo - 99.99')
  })
  function fireClickMultipleTimes(item: string, count: number) {
    const product = screen.getByTestId(item)
    for (let i: number = 0; i < count; i++) {
      fireEvent.click(product)
    }
  }
  test('Add 5 Dove Soaps to cart and get total', () => {
    render(<App salesTaxRate={0} />)
    fireClickMultipleTimes('dove-soap', 5)
    expect(screen.getByText('Total: R 199,95')).toBeInTheDocument()
  })
  test('Add 8 Dove Soaps to cart and get total', () => {
    render(<App salesTaxRate={0} />)
    fireClickMultipleTimes('dove-soap', 8)
    expect(screen.getByText('Total: R 319,92')).toBeInTheDocument()
  })
  test('Add 2 Dove Soaps and 2 Axe Deo to cart and get total with sales tax added', () => {
    render(<App salesTaxRate={SALES_TAX_RATE} />)
    fireClickMultipleTimes('dove-soap', 2)
    fireClickMultipleTimes('axe-deo', 2)
    expect(screen.getByText('Total: R 314,96')).toBeInTheDocument()
  })
})
