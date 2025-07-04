import { CalendarPanel } from './CalendarPanel'
import { PromoPanel } from './PromoPanel'
import { RoiPanel } from './RoiPanel'

export const panelComponentMap: Record<string, React.FC> = {
  calendar: CalendarPanel,
  roi: RoiPanel,
  promo: PromoPanel,
}