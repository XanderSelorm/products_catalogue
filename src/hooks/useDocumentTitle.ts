import { useRef, useEffect } from 'react'
interface Props {
    title: string
    prevailOnUnmount?: boolean | undefined
}
function useDocumentTitle(props: Props) {
    const defaultTitle = useRef(document.title)

    useEffect(() => {
        document.title = props.title
    }, [props.title])

    useEffect(
        () => () => {
            if (!props.prevailOnUnmount) {
                document.title = defaultTitle.current
            }
        },
        []
    )
}

export default useDocumentTitle
