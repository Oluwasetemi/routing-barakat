import useSWR from 'swr'
import axios from 'axios'

/**
 * Custom hook to fetch GitHub user data using SWR
 * @param {string} username - GitHub username to fetch
 * @returns {Object} - User data, loading state, and error state
 */
function useGitHubUser(username) {
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

  const { data, error, isLoading, mutate } = useSWR(
    username ? `https://api.github.com/users/${username}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 60000, // Cache for 1 minute
    }
  )

  return {
    user: data,
    isLoading,
    isError: error,
    refetch: mutate,
  }
}

export default useGitHubUser
