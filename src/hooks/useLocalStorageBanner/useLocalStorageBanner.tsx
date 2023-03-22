import { useBannerAnimation } from 'animations/BannerAnimation/useBannerAnimation'
import { EnumLocalStorageKeys } from 'enums/localStorageEnum'

import { useLocalStorage } from '../useLocalStorage/useLocalStorage'
import { useToggle } from '../useToggle/useToggle'

export const useLocalStorageBanner = (
  localStorageKey: EnumLocalStorageKeys,
  initialValue?: boolean
) => {
  const [isBannerClosed, setIsBannerClosed] = useLocalStorage(
    localStorageKey,
    initialValue || false
  )
  const animationEndToggler = useToggle(isBannerClosed)

  const bannerTransition = useBannerAnimation({
    isVisible: !isBannerClosed,
    onEnd: animationEndToggler.set,
  })

  const onCloseBanner = () => {
    setIsBannerClosed(true)
  }

  return {
    bannerTransition,
    onCloseBanner,
    isBannerClosed: animationEndToggler.value,
  }
}
