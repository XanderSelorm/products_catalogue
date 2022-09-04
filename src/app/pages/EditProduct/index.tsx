import React, { useEffect, useState } from 'react'
import HeaderBar from 'components/HeaderBar'
import useDocumentTitle from 'hooks/useDocumentTitle'
import { MdCancel, MdSave } from 'react-icons/md'
import ProductCard from 'components/ProductCard'
import { products } from 'assets/dummyData'
import { IProduct } from 'utils/types'
import { useNavigate } from 'react-router-dom'
import { IContext, useAppProvider } from 'hooks/Context/index'
import { Formik, FormikHelpers, FormikValues } from 'formik'
import * as Yup from 'yup'

interface IFormValues extends FormikValues {
    id: string
    sku: string
    name: string
    price: string
    image: string
    description: string
}

function EditProductPage() {
    // Hooks
    const navigate = useNavigate()
    useDocumentTitle({ title: 'Home | Edit Product' })
    const { addProduct, selectedProduct }: IContext = useAppProvider()

    // State
    const [selectedProducts, setSelectedProducts] = useState<IProduct[]>([])

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
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
    ]

    const initialValues: IFormValues = {
        id: '',
        sku: '',
        name: '',
        price: '',
        image: '',
        description: '',
    }
    const validationSchema = Yup.object().shape({
        sku: Yup.string().required('SKU is required'),
        name: Yup.string().required('Name number is required'),
        price: Yup.number().required('Price is required'),
        image: Yup.string().required('Image is required'),
        description: Yup.string()
            .min(3, 'Too Short!')
            .required('Description is required'),
    })

    const onSubmit = (
        values: IFormValues,
        { setSubmitting, resetForm }: FormikHelpers<IFormValues>
    ) => {
        setSubmitting(true)

        try {
            setSubmitting(false)
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
                    onClick={() => {
                        // addProduct()
                    }}
                    type="button"
                    className={`w-full outline-none flex justify-center rounded-md border border-transparent
                     shadow-sm px-6 py-2 text-base font-semibold text-white bg-blue-600 hover:bg-blue-700
                     focus:outline-none sm:w-auto sm:text-sm space-x-3 items-center`}
                >
                    <span>Save</span>
                    <MdSave />
                </button>
                <button
                    type="button"
                    onClick={() => navigate('/')}
                    className={`w-full outline-none flex justify-center rounded-md border border-transparent
                     shadow-sm px-6 py-2 text-base font-semibold text-white bg-blue-600 hover:bg-blue-700
                     focus:outline-none sm:w-auto sm:text-sm space-x-3 items-center`}
                >
                    <span>Cancel</span>
                    <MdCancel />
                </button>
            </HeaderBar>
            <div className="mx-auto container px-5 grid grid-cols-1 md:grid-cols-4 gap-x-5 gap-y-5">
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    {(formik) => (
                        <form onSubmit={formik.handleSubmit}>
                            <label htmlFor="sku">SKU</label>
                            <input
                                id="sku"
                                type="text"
                                {...formik.getFieldProps('sku')}
                            />
                            {formik.errors.sku ? (
                                <div>{formik.errors.sku}</div>
                            ) : null}

                            <label htmlFor="name">Product Name</label>
                            <input
                                id="name"
                                type="text"
                                {...formik.getFieldProps('name')}
                            />
                            {formik.errors.name ? (
                                <div>{formik.errors.name}</div>
                            ) : null}

                            <label htmlFor="price">Product Price</label>
                            <input
                                id="price"
                                type="text"
                                {...formik.getFieldProps('price')}
                            />
                            {formik.errors.price ? (
                                <div>{formik.errors.price}</div>
                            ) : null}

                            <label htmlFor="description">Email Address</label>
                            <input
                                id="description"
                                type="description"
                                {...formik.getFieldProps('description')}
                            />
                            {formik.errors.description ? (
                                <div>{formik.errors.description}</div>
                            ) : null}

                            <button type="submit">Submit</button>
                        </form>
                    )}
                </Formik>
            </div>
        </div>
    )
}
export default EditProductPage
