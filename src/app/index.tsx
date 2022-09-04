import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Compose from 'providers/ComposeProvider'
import ProductsPage from './pages/Products'
import EditProductPage from './pages/EditProduct'
import { AppProvider } from 'hooks/Context'

function App() {
    return (
        <BrowserRouter>
            <Compose components={[AppProvider]}>
                <Routes>
                    <Route path="/" element={<ProductsPage />} />
                    <Route path="/edit-product" element={<EditProductPage />} />
                </Routes>
            </Compose>
        </BrowserRouter>
    )
}

export default App
