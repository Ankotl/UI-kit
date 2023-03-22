import React, { useRef, useState } from 'react'

import { getStoryMeta } from '../../utils/storybook/getStoryMeta'
import { EnumGetStoryMetaTitleGroup } from '../../utils/storybook/getStoryMetaTitle'
import { getStoryTemplate } from '../../utils/storybook/getStoryTemplate'

import { useEventListener as useEventListenerHook } from './useEventListener'

function EventListener() {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [text, setText] = useState('')

  const onScroll = (event: Event) => {
    setText(`window scrolled! Event type:${event.type}`)
  }

  const onClick = (event: Event) => {
    setText(`button clicked! Event type:${event.type}`)
  }

  // example with window based event
  useEventListenerHook('scroll', onScroll)

  // example with element based event
  useEventListenerHook('click', onClick, buttonRef)

  return (
    <div>
      <button ref={buttonRef}>Click me</button>
      <h4>{text}</h4>
    </div>
  )
}
const storiesMeta = getStoryMeta({
  component: EventListener,
  getStoryMetaTitleOptions: { group: EnumGetStoryMetaTitleGroup.HOOKS },
})
export default storiesMeta

const storyTemplate = getStoryTemplate(() => {
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  }

  return (
    <div style={containerStyle}>
      <EventListener />
    </div>
  )
})

export const useEventListener = storyTemplate({})
