import React from 'react'

export enum ProductType {
    DVD = 'dvd',
    BOOK = 'book',
    FURNITURE = 'furniture',
}

export interface IProduct {
    id: string
    name: string
    sku: string
    price: number
    type: object
    image: string
    description: string
}
