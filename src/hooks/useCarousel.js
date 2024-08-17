import { useState } from "react"

export function useCarousel(items, length) {
    const [startIndex, setStartIndex] = useState(0)
    const endIndex = startIndex + length - 1
    const isNext = endIndex < items.length - 1
    const isPrev = startIndex > 0
    const curItems = []

    for (let i = startIndex; i <= endIndex; i++) {
        curItems.push(items[i]);
    }

    function handlePrevClick() {
        if (isPrev) {
            setStartIndex(startIndex - 1)
        }
    }

    function handleNextClick() {
        if (isNext) {
            setStartIndex(startIndex + 1)
        }
    }

    return {curItems, isNext, isPrev, handlePrevClick, handleNextClick}
}