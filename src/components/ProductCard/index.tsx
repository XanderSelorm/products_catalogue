import React, { useEffect, useState } from 'react'
import { IProduct } from 'utils/types'

interface Props {
    product: IProduct
    onClick: VoidFunction
    onSelected: (checked: boolean) => any
}

function ProductCard(props: Props) {
    const [itemType, setItemType] = useState<any>()
    useEffect(() => {
        Object.keys(props.product.type).forEach((key: string) => {
            setItemType({
                unit: key.charAt(0).toUpperCase() + key.substring(1),
                // @ts-expect-error
                value: props.product?.type[key],
            })
        })
    }, [])
    return (
        <div className="flex relative p-5 border-2 border-gray-400 rounded-md text-gray-600 cursor-pointer hover:bg-blue-100">
            <div className="absolute top-3 left-3 z-10">
                <input
                    type="checkbox"
                    id="vehicle1"
                    name="vehicle1"
                    value="Bike"
                    onChange={(e) => {
                        props.onSelected(e.target.checked)
                    }}
                />
            </div>
            <div
                onClick={() => {
                    props.onClick()
                }}
                className="flex space-y-2 flex-col items-center justify-center w-full"
            >
                <span>{props.product?.sku ?? 'no sku'}</span>
                <span>{props.product?.name ?? 'no name'}</span>
                <span>GHS {props.product?.price ?? 'no price'}</span>
                <span>
                    {itemType?.unit}: {itemType?.value}
                </span>
            </div>
        </div>
    )
}

export default ProductCard
