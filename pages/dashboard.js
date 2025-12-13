import { useEffect, useState } from 'react';
import axios from 'axios';
export default function Dashboard() {
  const [pw, setPw] = useState('');
  const [authed, setAuthed] = useState(false);
  const [data, setData] = useState([]);

  const login = () => {
    if (pw === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) setAuthed(true);
    else alert('Bad password');
  }

  useEffect(() => {
    if (!authed) return;
    axios.get('/api/admin/orders', { headers: { 'x-admin-secret': process.env.ADMIN_PASSWORD } })
      .then(r => setData(r.data)).catch(e => console.error(e));
  }, [authed]);

  if (!authed) {
    return <div className="p-6"><h2>Admin Login</h2><input value={pw} onChange={e=>setPw(e.target.value)}/><button onClick={login}>Login</button></div>;
  }
  return (
    <div className="p-6">
      <h1>Sales Dashboard</h1>
      <table className="w-full">
        <thead><tr><th>Order</th><th>Email</th><th>Amount</th><th>Created</th><th>Token</th><th>Used</th></tr></thead>
        <tbody>
          {data.map(o => (
            <tr key={o.id}>
              <td>{o.stripeId}</td>
              <td>{o.customerEmail}</td>
              <td>{(o.amount/100).toFixed(2)}</td>
              <td>{new Date(o.createdAt).toLocaleString()}</td>
              <td>{o.token?.token ?? '-'}</td>
              <td>{o.token?.used ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
