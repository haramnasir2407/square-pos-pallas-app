// * this container contains the business logic and the UI

import { redirect } from 'next/navigation'
import { auth } from '~/auth'

import fetchDashboardData, {
  type DashboardDataReturn,
} from '@/containers/dashboard/dashboardDataService'
import Dashboard from '../../components/composites/dashboard'

/**
 * DashboardContainer is an async server component that handles all data fetching
 * and renders the dashboard UI for authenticated users. Redirects to home if not authenticated.
 */

/* @compile */
export default async function DashboardContainer() {
  // * Check the session
  const session = await auth()
  if (!session) {
    redirect('/signin')
    return null
  }

  // * get data from the service
  const data: DashboardDataReturn = await fetchDashboardData({
    accessToken: session.accessToken ?? '',
  })

  // * pass data to ui component
  return (
    <Dashboard
      accessToken={session.accessToken ?? ''}
      products={data.products}
      inventory={data.inventoryData}
    />
  )
}
