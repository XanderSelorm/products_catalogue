import React, { useEffect, useState } from 'react'
import HeaderBar from 'components/HeaderBar'
import useDocumentTitle from 'hooks/useDocumentTitle'
import { MdDeleteSweep, MdOutlineAddCircleOutline } from 'react-icons/md'
import ProductCard from 'components/ProductCard'
import { products } from 'assets/dummyData'
import { IProduct } from 'utils/types'
import { useNavigate } from 'react-router-dom'
import { IContext, useAppProvider } from 'hooks/Context/index'

function ProductsPage() {
    // Hooks
    const navigate = useNavigate()
    useDocumentTitle({ title: 'Home | Products' })
    const {
        allProducts,
        selectedProduct,
        checkedProductIds,
        setCheckedProductIds,
        setSelectedProduct,
        fetchProducts,
    }: IContext = useAppProvider()

    // State
    const [selectedProducts, setSelectedProducts] = useState<IProduct[]>([])

    // Effects
    useEffect(() => {
        fetchProducts()
    }, [])

    // Other Methods
    const handleSelection = (
        product: IProduct,
        index: number,
        checked: boolean
    ) => {
        if (checked) {
            setCheckedProductIds((prev) => [...prev, product.id])
        } else {
            setCheckedProductIds((prev) =>
                prev.filter((item) => item !== products[index].id)
            )
        }
    }

    return (
        <div className="space-y-5">
            <HeaderBar title="Product List">
                <button
                    onClick={() => {
                        navigate('/edit-product')
                    }}
                    type="button"
                    className={`w-full outline-none flex justify-center rounded-md border border-transparent
                     shadow-sm px-6 py-2 text-base font-semibold text-white bg-blue-600 hover:bg-blue-700
                     focus:outline-none sm:w-auto sm:text-sm space-x-3 items-center`}
                >
                    <span>Add</span>
                    <MdOutlineAddCircleOutline />
                </button>
                <button
                    onClick={() => {}}
                    type="button"
                    className={`w-full outline-none flex justify-center rounded-md border border-transparent
                     shadow-sm px-6 py-2 text-base font-semibold text-white bg-blue-600 hover:bg-blue-700
                     focus:outline-none sm:w-auto sm:text-sm space-x-3 items-center`}
                >
                    <span>Mass Delete</span>
                    <MdDeleteSweep />
                </button>
            </HeaderBar>
            <div className="mx-auto container px-5 grid grid-cols-1 md:grid-cols-4 gap-x-5 gap-y-5">
                {allProducts.map((product, index) => (
                    <div key={product.id}>
                        <ProductCard
                            product={product}
                            onSelected={(checked) => {
                                handleSelection(product, index, checked)
                            }}
                            onClick={() => {
                                setSelectedProduct(product)
                                navigate('/edit-product')
                            }}
                        />
                    </div>
                ))}
                {allProducts.length <= 0 && <div>No products available</div>}
            </div>
        </div>
    )
}
export default ProductsPage
