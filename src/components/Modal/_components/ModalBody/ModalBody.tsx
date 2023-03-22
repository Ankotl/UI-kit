import React from 'react'
import ReactDOM from 'react-dom'
import ReactFocusLock from 'react-focus-lock'
import { animated, useTransition } from 'react-spring'

import clsx from 'clsx'

import {
  EnumTypographyVariants,
  Typography,
} from 'components/Typography/Typography'
import { EnumBreakpoints } from 'enums/breakpointsEnum'
import { useMediaQuery } from 'hooks/useMediaQuery/useMediaQuery'

import s from './ModalBody.module.scss'

import { IModalProps } from '../../Modal'

import { ReactComponent as CloseIcon } from './closeIcon.svg'

export interface IModalBodyProps
  extends Pick<
    IModalProps,
    | 'children'
    | 'classes'
    | 'enableCloseIcon'
    | 'onClose'
    | 'title'
    | 'isOpen'
    | 'modalBodyPortalParent'
    | 'isMobileFullScreen'
    | 'bodyRef'
    | 'focusLockProps'
  > {}

export const ModalBody: React.FC<IModalBodyProps> = ({
  classes,
  enableCloseIcon,
  onClose,
  title,
  isOpen,
  bodyRef,
  children,
  focusLockProps,
  modalBodyPortalParent,
  isMobileFullScreen,
}) => {
  const isMobile = useMediaQuery(EnumBreakpoints.BREAKPOINT_MD, 'max')
  const isMobileModal = isMobile && isMobileFullScreen

  const transition = useTransition(isOpen, {
    from: {
      opacity: 0.25,
      transform: `translateY(${isMobileModal ? '' : '-'}100%)`,
    },
    enter: { opacity: 1, transform: 'translateY(0%)' },
    leave: {
      opacity: 0,
      transform: `translateY(${isMobileModal ? '' : '-'}100%)`,
    },
    expires: 0,
    config: (item) => {
      return !item ? { duration: 0 } : { duration: 200 }
    },
  })

  return ReactDOM.createPortal(
    <>
      {transition(
        (style, item) =>
          item && (
            <div
              className={clsx(
                s.ModalBody,
                { [s.ModalBody_fullWidth]: isMobileModal },
                classes?.bodyClassName
              )}
              ref={bodyRef}
            >
              <animated.div
                className={clsx(
                  s.ModalBody__content,
                  { [s.ModalBody__content_fullWidth]: isMobileModal },
                  classes?.contentClassName
                )}
                style={style}
                data-testid="modal-body"
              >
                <ReactFocusLock
                  className={s.ModalBody__focusLock}
                  {...focusLockProps}
                >
                  {title && (
                    <Typography
                      variant={EnumTypographyVariants.H2}
                      className={clsx(
                        s.ModalBody__title,
                        classes?.titleClassName
                      )}
                      text={title}
                      data-testid="modal-title"
                      as="div"
                    />
                  )}

                  {enableCloseIcon && (
                    <div
                      className={clsx(
                        s.ModalBody__closeIcon,
                        classes?.closeIconClassName
                      )}
                      onClick={onClose}
                      data-testid="modal-close-icon"
                    >
                      <CloseIcon />
                    </div>
                  )}

                  {children}
                </ReactFocusLock>
              </animated.div>
            </div>
          )
      )}
    </>,
    modalBodyPortalParent ?? document.body
  )
}
