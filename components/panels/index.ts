import { CalendarPanel } from './CalendarPanel'
import { RoiPanel } from './RoiPanel'

export const panelComponentMap: Record<string, React.FC> = {
  calendar: CalendarPanel,
  roi: RoiPanel,
}