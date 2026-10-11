import Link from 'next/link';

export const runtime = 'edge';

export default function NotFound() {
  return (
    <div style={{ padding: '40px', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h2>Page Not Found</h2>
      <p>The requested page could not be found.</p>
      <Link href="/" style={{ color: '#f5cb5c', textDecoration: 'underline' }}>Return Home</Link>
    </div>
  );
}
