import { useIsMobile } from './useIsMobile'
import { Sec } from '@/types/index'

type BreakpointKey = 'mobile' | 'md' | 'lg' | 'xl'

type BgStyle = { backgroundPosition: string; backgroundSize: string }

const bgStyles: Record<BreakpointKey, Record<'light' | 'dark', BgStyle>> = {
  mobile: {
    light: { backgroundPosition: 'center bottom 560%', backgroundSize: '230%' },
    dark: { backgroundPosition: 'center bottom 400%', backgroundSize: '240%' },
  },
  md: {
    light: { backgroundPosition: 'center right 65%', backgroundSize: '210%' },
    dark: { backgroundPosition: 'center', backgroundSize: '220%' },
  },
  lg: {
    light: { backgroundPosition: 'center right 205%', backgroundSize: '110%' },
    dark: { backgroundPosition: 'center right 205%', backgroundSize: '110%' },
  },
  xl: {
    light: { backgroundPosition: 'left', backgroundSize: '120%' },
    dark: { backgroundPosition: 'left', backgroundSize: '120%' },
  },
}

export function useResponsiveBgStyle() {
  const isMobile = useIsMobile()

  function getBgStyle(mode: Sec['mode'], forceCenter = false) {
    const width = typeof window !== 'undefined' ? window.innerWidth : 1920
    const modeKey = mode === 'light' ? 'light' : 'dark'
    let bp: BreakpointKey = 'xl'
    if (isMobile || width <= 769) bp = 'mobile'
    else if (width <= 1182) bp = 'md'
    else if (width <= 1920) bp = 'lg'
    // else remains "xl"
    const style = { ...bgStyles[bp][modeKey] }
    if (forceCenter) {
      style.backgroundPosition = 'center'
    }
    return style
  }

  return getBgStyle
}
