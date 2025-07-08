import { CalendarPanel } from './CalendarPanel'
import { PromoPanel } from './PromoPanel'
import { RoiPanel } from './RoiPanel'
import { RetentionPanel } from './RetentionPanel'
import { LostOppPanel } from './LostOppPanel'
import { DemographicPanel } from './DemographicPanel'

export const panelComponentMap: Record<string, React.FC> = {
  calendar: CalendarPanel,
  roi: RoiPanel,
  promo: PromoPanel,
  lostOpp: LostOppPanel,
  retention: RetentionPanel,
  demographics: DemographicPanel,
}