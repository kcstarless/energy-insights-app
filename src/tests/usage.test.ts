import handler from '@/pages/api/usage'
import { testApiHandler } from 'next-test-api-route-handler'

describe('/api/usage', () => {
  it('returns 200 OK', async () => {
    await testApiHandler({
      pagesHandler: handler,
      test: async ({ fetch }) => expect((await fetch()).status).toBe(200),
    })
  })

  it('returns usage data with correct structure', async () => {
    await testApiHandler({
      pagesHandler: handler,
      test: async ({ fetch }) => {
        const response = await fetch()
        const data = await response.json()
        
        expect(data).toHaveProperty('totalKwh')
        expect(data).toHaveProperty('averageDailyKwh')
        expect(data).toHaveProperty('startDate')
        expect(data).toHaveProperty('endDate')
        expect(data).toHaveProperty('days')
        expect(Array.isArray(data.days)).toBe(true)
      },
    })
  })
})
