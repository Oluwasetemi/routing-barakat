import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

/**
 * Custom hook to fetch GitHub user data using TanStack Query
 * @param {string} username - GitHub username to fetch
 * @returns {Object} - User data, loading state, and error state
 */
function useGitHubUserTanStack(username) {
  const fetcher = async (url) => {
    if (!username) return null

    try {
      const response = await axios.get(url)
      return response.data
    } catch (error) {
      console.error('GitHub API Error:', error)
      throw error
    }
  }

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['github-user', username],
    queryFn: () => fetcher(`https://api.github.com/users/${username}`),
    enabled: !!username, // Only run query if username exists
    staleTime: 60000, // Consider data fresh for 1 minute
    gcTime: 300000, // Keep in cache for 5 minutes
    retry: 2,
    retryDelay: 1000,
  })

  return {
    user: data,
    isLoading,
    isError: error,
    refetch,
  }
}

export default useGitHubUserTanStack
