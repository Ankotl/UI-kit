import React, { ChangeEvent, useState } from 'react'

import { getStoryMeta } from '../../utils/storybook/getStoryMeta'
import { EnumGetStoryMetaTitleGroup } from '../../utils/storybook/getStoryMetaTitle'
import { getStoryTemplate } from '../../utils/storybook/getStoryTemplate'

import { useInterval as useIntervalHook } from './useInterval'

function Interval() {
  const [count, setCount] = useState<number>(0)
  // Dynamic delay
  const [delay, setDelay] = useState<number>(1000)
  // ON/OFF
  const [isPlaying, setPlaying] = useState<boolean>(false)

  useIntervalHook(
    () => {
      // Your custom logic here
      setCount(count + 1)
    },
    // Delay in milliseconds or null to stop it
    isPlaying ? delay : null
  )

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDelay(Number(event.target.value))
  }

  return (
    <>
      <h1>{count}</h1>
      <button onClick={() => setPlaying(!isPlaying)}>
        {isPlaying ? 'pause' : 'play'}
      </button>
      <p>
        <label htmlFor="delay">Delay: </label>
        <input
          type="number"
          name="delay"
          onChange={handleChange}
          value={delay}
        />
      </p>
    </>
  )
}

const storiesMeta = getStoryMeta({
  component: Interval,
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
      <Interval />
    </div>
  )
})

export const useInterval = storyTemplate({})
