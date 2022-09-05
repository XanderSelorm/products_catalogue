import React, { useEffect, useRef, useState } from 'react'
import HeaderBar from 'components/HeaderBar'
import useDocumentTitle from 'hooks/useDocumentTitle'
import { MdCancel, MdSave } from 'react-icons/md'
import ProductCard from 'components/ProductCard'
import { products } from 'assets/dummyData'
import { IProduct } from 'utils/types'
import { useNavigate } from 'react-router-dom'
import { IContext, useAppProvider } from 'hooks/Context/index'
import {
    Formik,
    FormikHelpers,
    FormikValues,
    FormikProps,
    useFormikContext,
} from 'formik'
import * as Yup from 'yup'
interface IFormValues extends FormikValues {
    id: string
    sku: string
    name: string
    price: number
    image: string
    description: string
}

function EditProductPage() {
    // Hooks
    const navigate = useNavigate()
    useDocumentTitle({ title: 'Home | Edit Product' })
    const { addProduct, selectedProduct, setSelectedProduct }: IContext =
        useAppProvider()

    // State
    const [selectedProducts, setSelectedProducts] = useState<IProduct[]>([])
    const [selectedType, setSelectedType] = useState<string>()

    // Refs
    const formRef = useRef<FormikProps<FormikValues>>(null)

    // Effects
    // useEffect(() => {
    //     !selectedProduct && navigate('/')
    // }, [])

    // Other Methods
    const handleSelection = (
        product: IProduct,
        index: number,
        checked: boolean
    ) => {
        if (checked) {
            setSelectedProducts((prev) => [...prev, product])
        } else {
            setSelectedProducts((prev) =>
                prev.filter((item) => item !== products[index])
            )
        }
    }

    const options = [
        { value: '', label: 'select' },
        { value: 'DVD', label: 'DVD' },
        { value: 'BOOK', label: 'Book' },
        { value: 'FURNITURE', label: 'Furniture' },
    ]

    const initialValues: IFormValues = {
        id: selectedProduct !== null ? selectedProduct.id : '',
        sku: selectedProduct !== null ? selectedProduct.sku : '',
        name: selectedProduct !== null ? selectedProduct.name : '',
        price: selectedProduct !== null ? selectedProduct.price : 0,
        image: selectedProduct !== null ? selectedProduct.image : '',
        description:
            selectedProduct !== null ? selectedProduct.description : '',
        type: selectedProduct !== null ? selectedProduct.type : {},
    }
    const validationSchema = Yup.object().shape({
        sku: Yup.string().required('SKU is required'),
        name: Yup.string().required('Name number is required'),
        price: Yup.number().required('Price is required'),
        image: Yup.string().required('Image is required'),
        description: Yup.string()
            .min(3, 'Too Short!')
            .required('Description is required'),
        type: Yup.object().required('Type is Required'),
    })

    const onSubmit = (
        values: IFormValues,
        { setSubmitting, resetForm }: FormikHelpers<IFormValues>
    ) => {
        setSubmitting(true)

        try {
            setSubmitting(false)
            console.log('submitting')
            resetForm()

            // setOpen(false);
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="space-y-5">
            <HeaderBar title={`Product ${selectedProduct ? 'Edit' : 'Add'}`}>
                <button
                    // onClick={() => {
                    //     handleSubmit()
                    // }}
                    form="product-form"
                    type="submit"
                    className={`w-full outline-none flex justify-center rounded-md border border-transparent
                     shadow-sm px-6 py-2 text-base font-semibold text-white bg-blue-600 hover:bg-blue-700
                     focus:outline-none sm:w-auto sm:text-sm space-x-3 items-center`}
                >
                    <span>Save</span>
                    <MdSave />
                </button>
                <button
                    type="button"
                    onClick={() => {
                        setSelectedProduct(null)
                        navigate('/')
                    }}
                    className={`w-full outline-none flex justify-center rounded-md border border-transparent
                     shadow-sm px-6 py-2 text-base font-semibold text-white bg-blue-600 hover:bg-blue-700
                     focus:outline-none sm:w-auto sm:text-sm space-x-3 items-center`}
                >
                    <span>Cancel</span>
                    <MdCancel />
                </button>
            </HeaderBar>
            <div className="mx-auto flex flex-col items-center container px-5">
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                    // innerRef={formRef}
                >
                    {(formik) => (
                        <form
                            id="product-form"
                            onSubmit={formik.handleSubmit}
                            className=" md:w-6/12 grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-10"
                        >
                            <div className="flex flex-col ">
                                <label className="text-gray-500" htmlFor="sku">
                                    SKU
                                </label>
                                <input
                                    id="sku"
                                    className="px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    type="text"
                                    {...formik.getFieldProps('sku')}
                                />
                                {formik.errors.sku ? (
                                    <div className="text-red-500 text-sm">
                                        {formik.errors.sku}
                                    </div>
                                ) : null}
                            </div>

                            <div className="flex flex-col ">
                                <label className="text-gray-500" htmlFor="name">
                                    Product Name
                                </label>
                                <input
                                    id="name"
                                    className="px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    type="text"
                                    {...formik.getFieldProps('name')}
                                />
                                {formik.errors.name ? (
                                    <div className="text-red-500 text-sm">
                                        {formik.errors.name}
                                    </div>
                                ) : null}
                            </div>

                            <div className="flex flex-col ">
                                <label
                                    className="text-gray-500"
                                    htmlFor="price"
                                >
                                    Product Price
                                </label>
                                <input
                                    id="price"
                                    className="px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    type="text"
                                    {...formik.getFieldProps('price')}
                                />
                                {formik.errors.price ? (
                                    <div className="text-red-500 text-sm">
                                        {formik.errors.price}
                                    </div>
                                ) : null}
                            </div>

                            <div className="flex flex-col ">
                                <label
                                    className="text-gray-500"
                                    htmlFor="productType"
                                >
                                    Type Switcher
                                </label>
                                <select
                                    id="productType"
                                    className="px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    aria-label="product type"
                                    onChange={(e) =>
                                        setSelectedType(e.target.value)
                                    }
                                    value={selectedType}
                                >
                                    {options.map((item) => (
                                        <option
                                            key={item.value}
                                            value={item.value}
                                        >
                                            {item.label}
                                        </option>
                                    ))}
                                </select>
                                {formik.errors.description ? (
                                    <div className="text-red-500 text-sm">
                                        {formik.errors.description}
                                    </div>
                                ) : null}
                            </div>

                            <div className="flex flex-col col-span-2">
                                <label
                                    className="text-gray-500"
                                    htmlFor="description"
                                >
                                    Product Description
                                </label>
                                <textarea
                                    id="description"
                                    className="px-3 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    {...formik.getFieldProps('description')}
                                />
                                {formik.errors.description ? (
                                    <div className="text-red-500 text-sm">
                                        {formik.errors.description}
                                    </div>
                                ) : null}
                            </div>

                            {selectedType === 'DVD' && (
                                <div className="flex flex-col">
                                    <label
                                        className="text-gray-500"
                                        htmlFor="description"
                                    >
                                        Size (MB)
                                    </label>
                                    <input
                                        id="type"
                                        type="text"
                                        className="px-3 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        {...formik.getFieldProps('type')}
                                    />
                                    {formik.errors.description ? (
                                        <div className="text-red-500 text-sm">
                                            {formik.errors.description}
                                        </div>
                                    ) : null}
                                </div>
                            )}

                            {selectedType === 'BOOK' && (
                                <div className="flex flex-col">
                                    <label
                                        className="text-gray-500"
                                        htmlFor="description"
                                    >
                                        Weight (KG)
                                    </label>
                                    <input
                                        id="type"
                                        type="text"
                                        className="px-3 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        {...formik.getFieldProps('type')}
                                    />
                                    {formik.errors.description ? (
                                        <div className="text-red-500 text-sm">
                                            {formik.errors.description}
                                        </div>
                                    ) : null}
                                </div>
                            )}
                            <div
                                className={`col-span-2 grid ${
                                    selectedType === 'DVD'
                                        ? 'grid-cols-1'
                                        : selectedType === 'BOOK'
                                        ? 'grid-cols-1'
                                        : 'grid-cols-3 gap-x-10'
                                }`}
                            >
                                <div className="flex flex-col">
                                    <label
                                        className="text-gray-500"
                                        htmlFor="description"
                                    >
                                        Length
                                    </label>
                                    <input
                                        id="type"
                                        type="text"
                                        className="px-3 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        {...formik.getFieldProps('type')}
                                    />
                                    {formik.errors.description ? (
                                        <div className="text-red-500 text-sm">
                                            {formik.errors.description}
                                        </div>
                                    ) : null}
                                </div>
                                <div className="flex flex-col">
                                    <label
                                        className="text-gray-500"
                                        htmlFor="description"
                                    >
                                        Width
                                    </label>
                                    <input
                                        id="type"
                                        type="text"
                                        className="px-3 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        {...formik.getFieldProps('type')}
                                    />
                                    {formik.errors.description ? (
                                        <div className="text-red-500 text-sm">
                                            {formik.errors.description}
                                        </div>
                                    ) : null}
                                </div>
                                <div className="flex flex-col">
                                    <label
                                        className="text-gray-500"
                                        htmlFor="description"
                                    >
                                        Height
                                    </label>
                                    <input
                                        id="type"
                                        type="text"
                                        className="px-3 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        {...formik.getFieldProps('type')}
                                    />
                                    {formik.errors.description ? (
                                        <div className="text-red-500 text-sm">
                                            {formik.errors.description}
                                        </div>
                                    ) : null}
                                </div>
                            </div>
                        </form>
                    )}
                </Formik>
            </div>
        </div>
    )
}
export default EditProductPage
