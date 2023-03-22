import { ComponentType } from 'react'

import { Meta } from '@storybook/react'

import { getComponentName } from '../reactTypes'

import {
  getStoryMetaTitle,
  GetStoryMetaTitleOptions,
} from './getStoryMetaTitle'

interface IGetStoryMetaProps {
  component: ComponentType | React.FC<any>
  metaProps?: Omit<Partial<Meta>, 'component'>

  getStoryMetaTitleOptions?: Omit<GetStoryMetaTitleOptions, 'componentName'>
}

export const getStoryMeta = ({
  component,
  metaProps,
  getStoryMetaTitleOptions,
}: IGetStoryMetaProps): Meta => {
  return {
    ...metaProps,
    title: getStoryMetaTitle({
      ...getStoryMetaTitleOptions,
      componentName: getComponentName(component),
    }),
    component,
    parameters: {
      controls: { exclude: ['ref', 'className'] },
      ...metaProps?.parameters,
    },
  }
}
