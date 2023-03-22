import React from 'react'
import { usePopperTooltip } from 'react-popper-tooltip'
import type { Config, PopperOptions } from 'react-popper-tooltip'

import clsx from 'clsx'

import { FadeAnimation } from 'animations/FadeAnimation/FadeAnimation'
import { EnumBreakpoints } from 'enums/breakpointsEnum'
import { useMediaQuery } from 'hooks/useMediaQuery/useMediaQuery'

import s from './Tooltip.module.scss'

type ITooltipChildrenProps = Omit<
  ReturnType<typeof usePopperTooltip>,
  'getTooltipProps' | 'setTooltipRef'
>

type usePopperConfig = Config & {
  mobilePlacement?: Config['placement']
  mobileBreakpoint?: EnumBreakpoints
}
export interface ITooltipProps {
  tooltipContent: React.ReactNode

  variant?: 'base' | 'accent'
  usePopperConfig?: usePopperConfig
  usePopperOptions?: PopperOptions
  contentMaxWidth?: number | string
  className?: string

  isArrowDisabled?: boolean

  children: (config: ITooltipChildrenProps) => JSX.Element
}

export const Tooltip: React.FC<ITooltipProps> = ({
  variant = 'base',
  contentMaxWidth = 242,
  tooltipContent,
  usePopperConfig,
  usePopperOptions,
  isArrowDisabled,
  className,
  children,
}) => {
  const isMobile = useMediaQuery(
    usePopperConfig?.mobileBreakpoint || EnumBreakpoints.BREAKPOINT_MD,
    'max'
  )

  const { setTooltipRef, visible, getTooltipProps, getArrowProps, ...options } =
    usePopperTooltip(
      {
        ...usePopperConfig,
        placement:
          isMobile && usePopperConfig?.mobilePlacement
            ? usePopperConfig.mobilePlacement
            : usePopperConfig?.placement,
      },
      usePopperOptions
    )

  return (
    <>
      {children({
        visible,
        getArrowProps,
        ...options,
      })}

      <FadeAnimation
        isVisible={visible}
        rootProps={{
          ref: setTooltipRef,
          className: clsx(
            s.Tooltip,
            {
              [s.Tooltip_base]: variant === 'base',
              [s.Tooltip_accent]: variant === 'accent',
            },
            className
          ),
          ...getTooltipProps({
            style: {
              maxWidth: contentMaxWidth,
            },
          }),
        }}
      >
        {!isArrowDisabled && (
          <div {...getArrowProps()} className={s.Tooltip__arrow} />
        )}

        {tooltipContent}
      </FadeAnimation>
    </>
  )
}
