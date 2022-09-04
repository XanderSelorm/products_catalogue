import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaBars } from 'react-icons/fa'

interface Props {
    title: string
    children: React.ReactElement[]
}

function HeaderBar(props: Props) {
    const [isOpened, setIsOpened] = useState(true)

    return (
        <div className="py-5">
            <div className="flex flex-wrap mx-auto py-5 container px-5 items-center border-b border-gray-400">
                <div className="flex-grow">
                    <h1 className=" font-bold text-xl">{props.title}</h1>
                </div>
                <div className="block sm:hidden">
                    <button
                        onClick={() => {
                            setIsOpened((prev) => !prev)
                        }}
                    >
                        <FaBars />
                    </button>
                </div>
                {isOpened && (
                    <div
                        className={`space-y-3 w-full sm:w-auto ${
                            isOpened ? 'flex' : 'hidden'
                        } sm:flex sm:space-y-0 flex-wrap xs:flex-nowrap sm:space-x-3 `}
                    >
                        {props.children}
                    </div>
                )}
            </div>
        </div>
    )
}

export default HeaderBar
