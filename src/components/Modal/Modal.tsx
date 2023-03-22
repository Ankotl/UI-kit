import React, { useCallback } from 'react'

import { ReactFocusLockProps } from 'react-focus-lock/interfaces'

import { useDisableOverflow } from 'hooks/useDisableOverflow/useDisableOverflow'
import { useEventListener } from 'hooks/useEventListener/useEventListener'

import { ModalBlackout } from './_components/ModalBlackout/ModalBlackout'
import { ModalBody } from './_components/ModalBody/ModalBody'

export interface IModalClasses {
  bodyClassName?: string
  contentClassName?: string
  titleClassName?: string
  closeIconClassName?: string
  blackoutClassName?: string
}

export interface IModalProps {
  isOpen: boolean
  children?: React.ReactNode
  title?: string
  enableCloseIcon?: boolean
  isCloseDisabled?: boolean

  classes?: IModalClasses
  modalBodyPortalParent?: HTMLElement | null | undefined
  blackoutPortalParent?: HTMLElement | null | undefined
  isMobileFullScreen?: boolean
  focusLockProps?: ReactFocusLockProps

  bodyRef?: React.MutableRefObject<HTMLDivElement | null>

  onClose?: () => void
}

export const Modal: React.FC<IModalProps> = ({
  isOpen,
  title,
  enableCloseIcon,
  isCloseDisabled,
  classes,
  onClose,
  children,
  bodyRef,
  focusLockProps,
  modalBodyPortalParent,
  blackoutPortalParent,
  isMobileFullScreen,
}) => {
  const handleClose = useCallback(() => {
    if (onClose && !isCloseDisabled) {
      onClose()
    }
  }, [isCloseDisabled, onClose])

  const handleKeyUp = useCallback(
    (e: KeyboardEvent) => {
      if (isOpen && e.key === 'Escape') {
        e.preventDefault()
        e.stopPropagation()
        handleClose()
      }
    },
    [isOpen, handleClose]
  )

  useEventListener('keyup', handleKeyUp)
  useDisableOverflow(
    isOpen,
    undefined,
    blackoutPortalParent || modalBodyPortalParent || document.body
  )

  return (
    <>
      <ModalBody
        classes={classes}
        enableCloseIcon={enableCloseIcon}
        isOpen={isOpen}
        onClose={handleClose}
        title={title}
        isMobileFullScreen={isMobileFullScreen}
        modalBodyPortalParent={modalBodyPortalParent}
        bodyRef={bodyRef}
        focusLockProps={focusLockProps}
      >
        {children}
      </ModalBody>

      <ModalBlackout
        isOpen={isOpen}
        blackoutPortalParent={blackoutPortalParent}
        modalBodyPortalParent={modalBodyPortalParent}
        isCloseDisabled={isCloseDisabled}
        classes={classes}
        onClose={handleClose}
      />
    </>
  )
}
