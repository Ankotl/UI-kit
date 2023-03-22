import React, { useRef, useState } from 'react'

import { getStoryMeta } from '../../utils/storybook/getStoryMeta'
import { EnumGetStoryMetaTitleGroup } from '../../utils/storybook/getStoryMetaTitle'
import { getStoryTemplate } from '../../utils/storybook/getStoryTemplate'

import { useIntersectionObserver as useIntersectionObserverHook } from './useIntersectionObserver'

const Section = (props: {
  title: string
  changeText: (str: string) => void
}) => {
  const ref = useRef<HTMLDivElement | null>(null)
  const entry = useIntersectionObserverHook(ref, {})
  const isVisible = !!entry?.isIntersecting

  props.changeText(`Render Section ${props.title} ${isVisible}`)

  return (
    <div
      ref={ref}
      style={{
        minHeight: '100vh',
        display: 'flex',
        border: '1px dashed #000',
        fontSize: '2rem',
      }}
    >
      <div style={{ margin: 'auto' }}>{props.title}</div>
    </div>
  )
}

function IntersectionObserver() {
  const [text, setText] = useState('')
  const changeText = (str: string) => {
    setText(str)
  }

  return (
    <>
      <h4 style={{ display: 'fixed' }}>{text}</h4>
      {Array.from({ length: 5 }).map((_, index) => (
        <Section
          key={index + 1}
          title={`${index + 1}`}
          changeText={changeText}
        />
      ))}
    </>
  )
}
const storiesMeta = getStoryMeta({
  component: IntersectionObserver,
  getStoryMetaTitleOptions: { group: EnumGetStoryMetaTitleGroup.HOOKS },
})
export default storiesMeta

const storyTemplate = getStoryTemplate(() => {
  return (
    <div>
      <IntersectionObserver />
    </div>
  )
})

export const useIntersectionObserver = storyTemplate({})
