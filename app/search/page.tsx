import getSongsByTitle from "@/actions/getSongsByTitle";
import Header from "@/components/Header";
import SearchInput from "@/components/SearchInput";
import SearchContent from "./components/SearchContent";

interface SearchProps {
  searchParams: {
    title: string;
  };
}

const page = async ({ searchParams }: SearchProps) => {
  const songs = await getSongsByTitle(searchParams.title);
  return (
    <div
      className="bg-neutral-900
    rounded-lg
    overflow-hidden
    overflow-y-auto
    h-full
    w-full
        "
    >
      <Header className="from-bg-neutral-900">
        <div className="mb-2 flex flex-col gap-y-6">
          <h1 className="text-white text-3xl font-semibold">Search</h1>
        </div>
        <SearchInput />
      </Header>
      <SearchContent songs={songs} />
    </div>
  );
};

export default page;
