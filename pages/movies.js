import useSWR from "swr";

const fetcher = async (url) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("movies not fatched");

  return res.json();
};

const movies = () => {
  const { data, error, isValidatiing } = useSWR("/api/movies", fetcher);

  const isLoading = !data && !error && isValidatiing;
  if (isLoading) return <h2>Loading...</h2>;
  if (error) return <h2>{error.message}</h2>;
  return (
    <div>
      <h2>movies</h2>
      {data?.map((movie) => (
        <div key={movie.id}>
          <h3>
            {movie.title}- {movie.reting}
          </h3>
        </div>
      ))}
    </div>
  );
};

export default movies;
