import Layout from '../components/Layout'
import Image from 'next/image'
import { useState } from 'react'

export default function Home() {
  const [loading, setLoading] = useState(false)

  async function handleBuy() {
    setLoading(true)
    try {
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity: 1 })
      })
      const data = await res.json()
      if (data.url) window.location = data.url
      else alert('Error creating checkout session')
    } catch (err) {
      console.error(err)
      alert('Error contacting server')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-graphite mb-3">Work From Home Jobs</h1>
          <p className="mb-4 text-gray-700">A practical guide for starting and growing your remote career.</p>
          <ul className="mb-6 space-y-2 text-gray-700">
            <li>• Real companies verified</li>
            <li>• Career-starter friendly roles</li>
            <li>• Advice from a single mother who succeeded</li>
          </ul>
          <div className="flex gap-3 flex-wrap">
            <button onClick={handleBuy} className="px-5 py-3 rounded-2xl bg-primary text-white font-semibold" disabled={loading}>
              {loading ? 'Processing...' : 'Buy Ebook — $9.99'}
            </button>
            <a href="/about" className="px-5 py-3 rounded-2xl border border-gray-200 text-gray-700">About</a>
          </div>
        </div>
        <div className="mx-auto">
          <div className="rounded-xl overflow-hidden shadow-md">
            <Image src="/images/cover.jpg" alt="ebook cover" width={720} height={1080} style={{width:'100%', height:'auto'}} />
          </div>
        </div>
      </div>
    </Layout>
  )
}
