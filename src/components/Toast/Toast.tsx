import React, { useMemo } from 'react'
import { toast, ToastOptions } from 'react-toastify'

import clsx from 'clsx'

import { EnumTypographyVariants, Typography } from '../Typography/Typography'

import s from './Toast.module.scss'

import { ReactComponent as AlertTriangleIcon } from './alertTriangleIcon.svg'
import { ReactComponent as CheckIcon } from './checkIcon.svg'

export enum EnumToastVariants {
  ERROR = 'error',
  SUCCESS = 'success',
}

export interface IToastProps {
  text: string
  variant?: EnumToastVariants
}

const ToastCmp: React.FC<IToastProps> = ({
  text,
  variant = EnumToastVariants.SUCCESS,
}) => {
  const toastIcon = useMemo(() => {
    if (variant === EnumToastVariants.ERROR) {
      return <AlertTriangleIcon />
    }

    return <CheckIcon />
  }, [variant])

  return (
    <Typography
      className={clsx(s.Toast, {
        [s.Toast_success]: variant === EnumToastVariants.SUCCESS,
        [s.Toast_error]: variant === EnumToastVariants.ERROR,
      })}
      variant={EnumTypographyVariants.P2}
      as="div"
    >
      <div className={s.Toast__icon}>{toastIcon}</div>

      {text}
    </Typography>
  )
}

export const Toast = Object.assign(ToastCmp, {
  Variant: EnumToastVariants,
})

export const openToast = (toastProps: IToastProps, options?: ToastOptions) =>
  toast(<Toast {...toastProps} />, options)
