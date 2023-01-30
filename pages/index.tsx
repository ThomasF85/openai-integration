import Link from "../src/Link";
import Header from "../src/components/Header";

export default function Home() {
  return (
    <>
      <Header label="AI creators" />
      <Link href="/gifts" color="secondary">
        Go to the gift ideas creator
      </Link>
      <Link href="/embeddings" color="secondary">
        Go to embedding creator
      </Link>
    </>
  );
}
