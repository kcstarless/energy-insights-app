import type { NextApiRequest, NextApiResponse } from 'next'
import { UsageSummary } from '@/types'
import { loadUsage } from '@/server/loadUsage'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UsageSummary | { message: string}>
) {
  try {
    await simulateSlowNetwork()
    const usageData = await loadUsage()

    if (!usageData) {
      return res.status(500).json({ message: 'Error reading file' })
    }

    res.status(200).json(usageData)
  } catch(error) {
    console.error('API error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

function simulateSlowNetwork(delayMs = 1500): Promise<void> {
  console.log(`Simulating network delay of ${delayMs}ms`)
  return new Promise((resolve) => setTimeout(resolve, delayMs))
}
