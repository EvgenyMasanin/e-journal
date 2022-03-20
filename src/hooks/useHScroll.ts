import { useEffect, useRef } from 'react'

export const useHScroll = <
  ParentHTMLElementType extends HTMLElement,
  ChildHTMLElementType extends HTMLElement
>() => {
  const parentRef = useRef<ParentHTMLElementType>()
  const childRef = useRef<ChildHTMLElementType>()

  useEffect(() => {
    const childLeft = childRef.current?.offsetLeft
    const childWidth = childRef.current?.offsetWidth
    if (childLeft) parentRef.current.scrollTo({ left: childLeft - childWidth / 2 })
  }, [childRef])

  return {
    parentRef,
    childRef,
  }
}
