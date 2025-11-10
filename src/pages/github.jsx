import { useState, useActionState, useEffect } from 'react'
import { useFormStatus } from 'react-dom'
import { Search, AlertTriangle } from 'lucide-react'
import useGitHubUser from '../hooks/useGitHubUser.jsx'
import useGitHubUserTanStack from '../hooks/useGitHubUserTanStack.jsx'
import GitHubUserCard from '../components/github-user-card.jsx'

/**
 * Action handler for GitHub user operations (search/clear)
 * @param {Object} prevState - Previous state
 * @param {FormData} formData - Form data from the action
 * @returns {Object} - New state with search results or cleared state
 */
async function handleGitHubAction(prevState, formData) {
  const action = formData.get('action')?.toString()

  // Handle clear action
  if (action === 'clear') {
    return {
      ...prevState,
      searchUsername: '',
      error: null,
    }
  }

  // Handle search action
  const username = formData.get('username')?.toString().trim()
  const useTanStack = formData.get('useTanStack') === 'true'

  if (!username) {
    return {
      ...prevState,
      error: 'Please enter a username',
      searchUsername: '',
    }
  }

  try {
    return {
      ...prevState,
      searchUsername: username,
      useTanStack,
      error: null,
    }
  } catch {
    return {
      ...prevState,
      error: 'Failed to search for user',
      searchUsername: '',
    }
  }
}

/**
 * Submit button component that shows loading state
 */
function SubmitButton({ children, disabled, isPending }) {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={disabled || isPending || pending}
      style={{
        padding: '12px 24px',
        backgroundColor: (disabled || isPending || pending) ? '#8c959f' : '#2da44e',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        fontSize: '16px',
        fontWeight: '500',
        cursor: (disabled || isPending || pending) ? 'not-allowed' : 'pointer',
        transition: 'background-color 0.2s',
        opacity: isPending ? 0.7 : 1,
      }}
    >
      {isPending || pending ? 'Searching...' : children}
    </button>
  )
}

/**
 * Clear button component that shows loading state
 */
function ClearButton({ children, isPending }) {
  return (
    <button
      type="submit"
      disabled={isPending}
      style={{
        padding: '12px 16px',
        backgroundColor: isPending ? '#8c959f' : '#6c757d',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        fontSize: '16px',
        cursor: isPending ? 'not-allowed' : 'pointer',
        transition: 'background-color 0.2s',
        opacity: isPending ? 0.7 : 1,
      }}
    >
      {isPending ? 'Clearing...' : children}
    </button>
  )
}

/**
 * GitHub User Lookup Page
 * Allows users to search for GitHub profiles using both SWR and TanStack Query
 */
function GitHubPage() {
  const [useTanStack, setUseTanStack] = useState(false)
  const [inputValue, setInputValue] = useState('')

  // Single action state for both search and clear functionality
  const [actionState, githubAction, isPending] = useActionState(handleGitHubAction, {
    searchUsername: '',
    useTanStack: false,
    error: null,
  })

  // Extract state from action
  const { searchUsername, error } = actionState

  // Update useTanStack from action state
  const currentUseTanStack = actionState.useTanStack ?? useTanStack

  // Clear input when searchUsername is cleared
  useEffect(() => {
    if (searchUsername === '') {
      setInputValue('')
    }
  }, [searchUsername])

  // SWR hook
  const swrResult = useGitHubUser(searchUsername)

  // TanStack Query hook
  const tanStackResult = useGitHubUserTanStack(searchUsername)

  // Use the selected data fetching method
  const { user, isLoading, isError, refetch } = currentUseTanStack ? tanStackResult : swrResult

  return (
    <div style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <h1 style={{
        textAlign: 'center',
        marginBottom: '30px',
        color: '#ffc600',
        fontSize: '2.5rem',
        fontWeight: '700',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px'
      }}>
        <Search size={40} /> GitHub User Lookup
      </h1>

      {/* Search Form */}
      <div style={{
        backgroundColor: '#f6f8fa',
        padding: '24px',
        borderRadius: '12px',
        marginBottom: '30px',
        border: '1px solid #e1e5e9'
      }}>
        {/* we could use onSubmit but prefer server action (react 19 update) */}
        <form action={githubAction} style={{ marginBottom: '20px' }}>
          <div style={{
            display: 'flex',
            gap: '12px',
            marginBottom: '16px',
            flexWrap: 'wrap'
          }}>
            <input
              type="text"
              name="username"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter GitHub username (e.g., octocat)"
              required
              style={{
                flex: '1',
                minWidth: '200px',
                padding: '12px 16px',
                border: '1px solid #d0d7de',
                borderRadius: '6px',
                fontSize: '16px',
                outline: 'none',
                transition: 'border-color 0.2s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#0969da'}
              onBlur={(e) => e.target.style.borderColor = '#d0d7de'}
            />
            <input
              type="hidden"
              name="useTanStack"
              value={useTanStack.toString()}
            />
            <input
              type="hidden"
              name="action"
              value="search"
            />
            <SubmitButton disabled={false} isPending={isPending}>
              Search
            </SubmitButton>
          </div>
        </form>

        {/* Clear Form */}
        <form id="clear-form" action={githubAction} style={{ display: 'inline' }}>
          <input
            type="hidden"
            name="action"
            value="clear"
          />
          <ClearButton isPending={isPending}>
            Clear
          </ClearButton>
        </form>

        {/* Data Fetching Method Toggle */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '12px',
          backgroundColor: 'white',
          borderRadius: '8px',
          border: '1px solid #e1e5e9'
        }}>
          <span style={{ fontSize: '14px', fontWeight: '500', color: 'tomato' }}>
            Data Fetching Method:
          </span>
          <label style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
            fontSize: '14px',
            color: 'black'
          }}>
            <input
              type="radio"
              name="fetchMethod"
              checked={!useTanStack}
              onChange={() => setUseTanStack(false)}
              style={{ margin: 0 }}
            />
            SWR
          </label>
          <label style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
            fontSize: '14px',
            color: 'black'
          }}>
            <input
              type="radio"
              name="fetchMethod"
              checked={useTanStack}
              onChange={() => setUseTanStack(true)}
              style={{ margin: 0 }}
            />
            TanStack Query
          </label>
        </div>

        {/* Error Display */}
        {error && (
          <div style={{
            marginTop: '16px',
            padding: '12px',
            backgroundColor: '#fef2f2',
            borderRadius: '6px',
            border: '1px solid #fca5a5'
          }}>
            <p style={{
              margin: 0,
              fontSize: '14px',
              color: '#dc2626',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <AlertTriangle size={16} /> {error}
            </p>
          </div>
        )}

        {/* Current Search Info */}
        {searchUsername && !error && (
          <div style={{
            marginTop: '16px',
            padding: '12px',
            backgroundColor: '#dbeafe',
            borderRadius: '6px',
            border: '1px solid #93c5fd'
          }}>
            <p style={{
              margin: 0,
              fontSize: '14px',
              color: '#1e40af'
            }}>
              <strong>Searching for:</strong> {searchUsername}
              <span style={{ marginLeft: '8px', opacity: 0.7 }}>
                (using {currentUseTanStack ? 'TanStack Query' : 'SWR'})
              </span>
            </p>
          </div>
        )}
      </div>

      {/* User Card */}
      <GitHubUserCard
        user={user}
        isLoading={isLoading}
        isError={isError}
        error={isError}
      />

      {/* Refetch Button */}
      {searchUsername && (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button
            onClick={() => refetch()}
            disabled={isLoading}
            style={{
              padding: '10px 20px',
              backgroundColor: '#0969da',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '14px',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              opacity: isLoading ? 0.6 : 1,
              transition: 'opacity 0.2s'
            }}
          >
            {isLoading ? 'Refreshing...' : 'Refresh Data'}
          </button>
        </div>
      )}

      {/* Instructions */}
      <div style={{
        marginTop: '40px',
        padding: '20px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        border: '1px solid #e9ecef'
      }}>
        <h3 style={{
          margin: '0 0 12px 0',
          fontSize: '18px',
          color: '#24292f'
        }}>
          How to use:
        </h3>
        <ul style={{
          margin: 0,
          paddingLeft: '20px',
          color: '#656d76',
          lineHeight: '1.6'
        }}>
          <li>Enter a GitHub username in the search field</li>
          <li>Choose between SWR or TanStack Query for data fetching</li>
          <li>Click "Search" to fetch the user's GitHub profile</li>
          <li>Use "Refresh Data" to refetch the current user's data</li>
          <li>Try popular usernames like: <code>octocat</code>,<code>oluwasetemi</code>, <code>torvalds</code>, <code>gaearon</code></li>
        </ul>
      </div>
    </div>
  )
}

export default GitHubPage
