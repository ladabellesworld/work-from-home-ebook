import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
export default function DownloadPage() {
  const router = useRouter();
  const { token } = router.query;
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) return;
    const url = `/api/download?token=${token}`;
    fetch(url).then(resp => {
      if (!resp.ok) {
        resp.json().then(j => setError(j.error || 'Failed to download'));
        return;
      }
      window.location = url;
    }).catch(e => setError(e.message));
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-xl p-6 bg-white rounded shadow">
        {error ? <p className="text-red-600">{error}</p> : <p>Preparing your download…</p>}
      </div>
    </div>
  );
}
