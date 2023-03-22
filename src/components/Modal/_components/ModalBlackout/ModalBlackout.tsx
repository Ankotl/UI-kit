import React from 'react'
import { useTransition } from 'react-spring'

import clsx from 'clsx'

import { Blackout } from 'components/Blackout/Blackout'

import { IModalProps } from '../../Modal'

export interface IModalBlackoutProps
  extends Pick<
    IModalProps,
    | 'blackoutPortalParent'
    | 'modalBodyPortalParent'
    | 'onClose'
    | 'isOpen'
    | 'classes'
    | 'isCloseDisabled'
  > {}

export const ModalBlackout: React.FC<IModalBlackoutProps> = ({
  blackoutPortalParent,
  modalBodyPortalParent,
  onClose,
  isOpen,
  classes,
  isCloseDisabled,
}) => {
  const transition = useTransition(isOpen, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    expires: 0,
    config: (item) => {
      return !item ? { duration: 0 } : { duration: 120 }
    },
  })

  return (
    <>
      {transition(
        (style, item) =>
          item && (
            <Blackout
              className={clsx(classes?.blackoutClassName)}
              animatedStyle={style}
              onMouseDown={onClose}
              data-testid="modal-blackout"
              portalParent={blackoutPortalParent || modalBodyPortalParent}
              isCursorPointer={!isCloseDisabled}
            />
          )
      )}
    </>
  )
}
