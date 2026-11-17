import { Suspense } from "react";
import { cachedSanity } from "@/sanity/lib/live";
import { POST_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import Link from "next/link";

async function Post({ params }: { params: Promise<{ slug: string }> }) {
  const { data: post } = await cachedSanity({
    query: POST_QUERY,
    perspective: "published",
    stega: false,
    params: await params,
  });

  if (!post) {
    notFound();
  }

  return <h1 className="text-4xl font-bold text-balance">{post?.title}</h1>;
}

export default function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <main className="container mx-auto grid grid-cols-1 gap-6 p-12">
      <Suspense fallback={<p>Loading…</p>}>
        <Post params={params} />
      </Suspense>
      <hr />
      <Link href="/">&larr; Return to index</Link>
    </main>
  );
}
