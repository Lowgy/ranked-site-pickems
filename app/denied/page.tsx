import Link from 'next/link';

export default function Denied() {
  return (
    <section>
      <h1>Access Denied!</h1>
      <p>Nice try bucko....</p>
      <Link href="/"> Return to home page</Link>
    </section>
  );
}
