import { products } from 'assets/dummyData'
import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from 'react'
import storageService from 'services/storage.service'
import { IProduct } from 'utils/types'

export interface IContext {
    isLoading: boolean
    allProducts: IProduct[]
    selectedProduct: IProduct
    checkedProductIds: string[]
    setCheckedProductIds: React.Dispatch<React.SetStateAction<string[]>>
    setSelectedProduct: React.Dispatch<React.SetStateAction<IProduct | null>>
    addProduct: (product: IProduct) => () => Promise<void>
    editProduct: (product: IProduct) => Promise<void>
    fetchProducts: () => void
    deleteProducts: (products: string[]) => Promise<void>
    fetchProduct: () => Promise<void>
    performSearch: () => Promise<void>
}

const AppContext = createContext<any>(null)

interface AppProps {
    children: ReactNode
}

const AppProvider = (props: AppProps) => {
    const [isLoading, setIsLoading] = useState(false)
    const [allProducts, setAllProducts] = useState<IProduct[]>([])
    const [checkedProductIds, setCheckedProductIds] = useState<string[]>([])
    const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(
        null
    )

    const performSearch = (value: string) => {
        const lowerValue = value?.toLowerCase()
        // if (allProducts) {
        //     const nameRes = allProducts.filter((e) =>
        //         e?.name?.toLowerCase().includes(lowerValue)
        //     )
        //     const descRes = allProducts.filter((e) =>
        //         e?.businessDescription?.toLowerCase().includes(lowerValue)
        //     )
        //     const locRes = allProducts.filter((e) =>
        //         e?.businessPhysicalAddress?.toLowerCase().includes(lowerValue)
        //     )
        //     const combinedRes = [...nameRes, ...descRes, ...locRes]
        //     const newRes = Array.from(new Set(combinedRes))
        //     setSearchResults(newRes)
        // }
    }

    function fetchProducts() {
        setIsLoading(true)
        setAllProducts(products)
        setIsLoading(false)
    }

    async function fetchProduct(businessId: string) {
        setIsLoading(true)

        setIsLoading(false)
    }

    async function deleteProducts(ids: string[]) {}

    async function addProduct() {
        setIsLoading(true)

        setIsLoading(false)
        // return data;
    }

    return (
        <AppContext.Provider
            value={{
                isLoading,
                allProducts,
                selectedProduct,
                checkedProductIds,
                setCheckedProductIds,
                setSelectedProduct,
                addProduct,
                fetchProducts,
                fetchProduct,
                performSearch,
            }}
        >
            {props.children}
        </AppContext.Provider>
    )
}

const useAppProvider = () => {
    const context = useContext(AppContext)

    if (context === null) {
        throw new Error('useAppProvider must be within an AppProvider')
    }

    return context
}

export { AppProvider, useAppProvider }
