import NewsList from "./components/NewsList";

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Latest Posts</h1>
      <NewsList />
    </main>
  );
}