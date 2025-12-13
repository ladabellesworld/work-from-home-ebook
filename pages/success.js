import Layout from '../components/Layout'
export default function Success() {
  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-4">Thank you!</h1>
      <p className="text-gray-700 mb-6">Payment successful! Check your email for a secure download link. If you didn't receive an email, use the button below to request a download link.</p>
      <a href="/download" className="px-5 py-3 rounded-2xl bg-graphite text-white">Get Download Link</a>
    </Layout>
  )
}
