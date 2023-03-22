import React from 'react'

export type IntrinsicPropsWithoutRef<E extends keyof JSX.IntrinsicElements> =
  React.PropsWithoutRef<JSX.IntrinsicElements[E]>

export type AnyObject = Record<string, any>

export type UnknownObject = Record<string, unknown>

export function getComponentName(component: React.ElementType) {
  if (typeof component === 'string') {
    return component
  }
  return component.displayName || component.name || 'Component'
}
