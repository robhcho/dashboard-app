'use client'

import { dashboardPanels } from '@/constants/panels'
import { PanelCard } from '@/components/dashboard/PanelCard'

const DashboardPage = () => {
  return (
    <div className='p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
      {dashboardPanels.map(panel => (
        <PanelCard key={panel.id} panel={panel} />
      ))}      
    </div>
  )
}

export default DashboardPage