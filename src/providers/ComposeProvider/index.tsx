import React from 'react'

interface ComposeProps {
    components: Array<React.JSXElementConstructor<React.PropsWithChildren<any>>>
    children: React.ReactNode
}

const Compose = (props: ComposeProps) => {
    return (
        <>
            {props.components.reduceRight((acc, Composer) => {
                return <Composer>{acc}</Composer>
            }, props.children)}
        </>
    )
}
export default Compose
