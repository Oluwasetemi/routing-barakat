import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

// custom hook to fetch a post using axios
function usePostTanStack(id) {
  const fetcher = (url) => axios.get(url).then((res) => res.data).catch((err) => {
    // log error
    console.error(err)
    return null
  })

  const { data, error, isLoading } = useQuery({
    queryKey: ['post', id],
    queryFn: () => fetcher(`https://jsonplaceholder.typicode.com/posts/${id}`),
  })
  console.log(data)
  return {
    post: data,
    isLoading,
    isError: error
  }
}

export default usePostTanStack
