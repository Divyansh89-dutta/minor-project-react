import React from 'react'

function Popular() {
    const navigate = useNavigate();
  const [category, setCategory] = useState("all");
  const [duration, setDuration] = useState("day");
  const [trending, setTrending] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const GetTrending = async () => {
    try {
      console.log("Fetching data for:", category, duration); // Debugging
      const { data } = await axios.get(`/trending/${category}/${duration}?page=${page}`);
      if(data.results.length > 0) {
        setTrending((pervState) => [...pervState,...data.results]);
        setPage(page + 1); // Increment page number after fetching data
      }
      else{
        setHasMore(false);
      }
      // setTrending(data.results || []);
    } catch (error) {
      console.error("Error fetching trending data:", error.message);
    }
  };
  const referhHandler = async()=>{
    if(trending.length === 0) {
      await GetTrending();
      }
      else{
        setPage(1);
        setTrending([]);
        await GetTrending();
      }
  }
  useEffect(() => {
    referhHandler(); //
  }, [category, duration]);

  return (
    <div>Popular</div>
  )
}

export default Popular