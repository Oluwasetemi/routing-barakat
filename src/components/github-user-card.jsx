import { AlertTriangle, MapPin, Building2, Globe, Calendar } from 'lucide-react'

/**
 * GitHub User Card Component
 * Displays user information in a clean card format
 */
function GitHubUserCard({ user, isLoading, isError, error }) {
  if (isLoading) {
    return (
      <div style={{
        padding: '20px',
        textAlign: 'center',
        border: '1px solid #e1e5e9',
        borderRadius: '8px',
        backgroundColor: '#f6f8fa',
        maxWidth: '400px',
        margin: '20px auto'
      }}>
        <div style={{
          width: '100px',
          height: '100px',
          backgroundColor: '#e1e5e9',
          borderRadius: '50%',
          margin: '0 auto 16px',
          animation: 'pulse 2s infinite'
        }} />
        <div style={{
          height: '20px',
          backgroundColor: '#e1e5e9',
          borderRadius: '4px',
          marginBottom: '8px',
          animation: 'pulse 2s infinite'
        }} />
        <div style={{
          height: '16px',
          backgroundColor: '#e1e5e9',
          borderRadius: '4px',
          width: '60%',
          margin: '0 auto',
          animation: 'pulse 2s infinite'
        }} />
        <style>{`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
        `}</style>
      </div>
    )
  }

  if (isError) {
    return (
      <div style={{
        padding: '20px',
        textAlign: 'center',
        border: '1px solid #fca5a5',
        borderRadius: '8px',
        backgroundColor: '#fef2f2',
        maxWidth: '400px',
        margin: '20px auto'
      }}>
        <h3 style={{ color: '#dc2626', marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
          <AlertTriangle size={20} /> Error Loading User
        </h3>
        <p style={{ color: '#6b7280', marginBottom: '10px' }}>
          {error?.response?.status === 404
            ? 'User not found. Please check the username and try again.'
            : 'Failed to fetch user data. Please try again later.'
          }
        </p>
        {error?.response?.status && (
          <p style={{ fontSize: '12px', color: '#9ca3af' }}>
            Status: {error.response.status}
          </p>
        )}
      </div>
    )
  }

  if (!user) {
    return (
      <div style={{
        padding: '20px',
        textAlign: 'center',
        border: '1px solid #e1e5e9',
        borderRadius: '8px',
        backgroundColor: '#f6f8fa',
        maxWidth: '400px',
        margin: '20px auto'
      }}>
        <p style={{ color: '#6b7280' }}>
          Enter a GitHub username to see their profile
        </p>
      </div>
    )
  }

  return (
    <div style={{
      padding: '24px',
      border: '1px solid #e1e5e9',
      borderRadius: '12px',
      backgroundColor: 'white',
      maxWidth: '400px',
      margin: '20px auto',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
    }}>
      {/* Avatar */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <img
          src={user.avatar_url}
          alt={`${user.login}'s avatar`}
          style={{
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            border: '3px solid #e1e5e9'
          }}
        />
      </div>

      {/* User Info */}
      <div style={{ textAlign: 'center' }}>
        <h2 style={{
          margin: '0 0 8px 0',
          fontSize: '24px',
          fontWeight: '600',
          color: '#24292f'
        }}>
          {user.name || user.login}
        </h2>

        {user.name && (
          <p style={{
            margin: '0 0 12px 0',
            color: '#656d76',
            fontSize: '16px'
          }}>
            @{user.login}
          </p>
        )}

        {user.bio && (
          <p style={{
            margin: '0 0 16px 0',
            color: '#656d76',
            fontSize: '14px',
            lineHeight: '1.5'
          }}>
            {user.bio}
          </p>
        )}

        {/* Stats */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-around',
          marginBottom: '16px',
          padding: '12px 0',
          borderTop: '1px solid #e1e5e9',
          borderBottom: '1px solid #e1e5e9'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '18px', fontWeight: '600', color: '#24292f' }}>
              {user.public_repos}
            </div>
            <div style={{ fontSize: '12px', color: '#656d76' }}>Repos</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '18px', fontWeight: '600', color: '#24292f' }}>
              {user.followers}
            </div>
            <div style={{ fontSize: '12px', color: '#656d76' }}>Followers</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '18px', fontWeight: '600', color: '#24292f' }}>
              {user.following}
            </div>
            <div style={{ fontSize: '12px', color: '#656d76' }}>Following</div>
          </div>
        </div>

        {/* Additional Info */}
        <div style={{ fontSize: '12px', color: '#656d76' }}>
          {user.location && (
            <div style={{ marginBottom: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              <MapPin size={14} /> {user.location}
            </div>
          )}
          {user.company && (
            <div style={{ marginBottom: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              <Building2 size={14} /> {user.company}
            </div>
          )}
          {user.blog && (
            <div style={{ marginBottom: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              <Globe size={14} /> <a
                href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#0969da', textDecoration: 'none' }}
              >
                {user.blog}
              </a>
            </div>
          )}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
            <Calendar size={14} /> Joined {new Date(user.created_at).toLocaleDateString()}
          </div>
        </div>

        {/* GitHub Link */}
        <div style={{ marginTop: '16px' }}>
          <a
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              padding: '8px 16px',
              backgroundColor: '#24292f',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: '500'
            }}
          >
            View on GitHub
          </a>
        </div>
      </div>
    </div>
  )
}

export default GitHubUserCard
