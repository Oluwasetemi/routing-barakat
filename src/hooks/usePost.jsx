import useSWR from 'swr'
import axios from 'axios'

// custom hook to fetch a post using axios
function usePost(id) {
  const fetcher = (url) => axios.get(url).then((res) => res.data).catch((err) => {
    // log error
    console.error(err)
    return null
  })

  const { data, error, isLoading } = useSWR(`https://jsonplaceholder.typicode.com/posts/${id}`, fetcher)
  console.log(data)
  return {
    post: data,
    isLoading,
    isError: error
  }
}

export default usePost
