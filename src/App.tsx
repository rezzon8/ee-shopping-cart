import React from 'react'
import './App.css'
import { useState } from 'react'
import { product, shopProps } from './types'
import { getTotalCost, formatCurrency, addSalesTax } from './helpers'

const doveSoap: product = {
  name: 'Dove Soap',
  price: 39.99
}

const axeDeo: product = {
  name: 'Axe Deo',
  price: 99.99
}

const App = ({ salesTaxRate }: shopProps) => {
  const [cart, setCart] = useState<product[]>([])

  return (
    <div className="app">
      <div className="products">
        <button
          data-testid="dove-soap"
          onClick={() => setCart(prevCart => [...prevCart, doveSoap])}
        >
          {doveSoap.name} - {doveSoap.price}
        </button>
        <button
          data-testid="axe-deo"
          onClick={() => setCart(prevCart => [...prevCart, axeDeo])}
        >
          {axeDeo.name} - {axeDeo.price}
        </button>
      </div>

      <div className="cart">
        <h4>Cart</h4>

        {cart.length > 0 ? (
          cart.map((product, index) => {
            return (
              <div key={index}>
                <h2>
                  {product.name} - {formatCurrency(product.price)}
                </h2>
              </div>
            )
          })
        ) : (
          <h5>No products to display</h5>
        )}

        <div>
          Total: {formatCurrency(addSalesTax(getTotalCost(cart), salesTaxRate))}
        </div>
      </div>
    </div>
  )
}

export default App
