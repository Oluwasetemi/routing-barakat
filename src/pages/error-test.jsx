import { useState } from 'react'
import { FlaskConical, AlertTriangle } from 'lucide-react'

/**
 * Component that throws an error when rendered
 */
function ErrorComponent({ message = 'This is a test error!' }) {
  throw new Error(message)
}

/**
 * Component that throws an error after a delay
 */
function DelayedErrorComponent() {
  const [shouldError, setShouldError] = useState(false)

  if (shouldError) {
    throw new Error('Delayed error triggered!')
  }

  return (
    <button
      onClick={() => setShouldError(true)}
      style={{
        background: '#dc2626',
        color: 'white',
        border: 'none',
        padding: '8px 16px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '14px'
      }}
    >
      Trigger Delayed Error
    </button>
  )
}

/**
 * Component that throws an error in useEffect
 */
function UseEffectErrorComponent() {
  const [shouldError, setShouldError] = useState(false)

  if (shouldError) {
    // This will cause an error in the next render cycle
    setTimeout(() => {
      throw new Error('Error in useEffect!')
    }, 100)
  }

  return (
    <button
      onClick={() => setShouldError(true)}
      style={{
        background: '#dc2626',
        color: 'white',
        border: 'none',
        padding: '8px 16px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '14px'
      }}
    >
      Trigger useEffect Error
    </button>
  )
}

/**
 * Component that throws an error in an event handler
 */
function EventHandlerErrorComponent() {
  const handleError = () => {
    throw new Error('Error in event handler!')
  }

  return (
    <button
      onClick={handleError}
      style={{
        background: '#dc2626',
        color: 'white',
        border: 'none',
        padding: '8px 16px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '14px'
      }}
    >
      Trigger Event Handler Error
    </button>
  )
}

/**
 * Component that throws an error when accessing undefined property
 */
function UndefinedPropertyErrorComponent() {
  const [shouldError, setShouldError] = useState(false)

  if (shouldError) {
    const obj = null
    return <div>{obj.someProperty.that.does.not.exist}</div>
  }

  return (
    <button
      onClick={() => setShouldError(true)}
      style={{
        background: '#dc2626',
        color: 'white',
        border: 'none',
        padding: '8px 16px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '14px'
      }}
    >
      Trigger Undefined Property Error
    </button>
  )
}

/**
 * Main Error Test Page Component
 */
function ErrorTestPage() {
  const [showImmediateError, setShowImmediateError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('This is a test error!')

  const buttonStyle = {
    background: '#3b82f6',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    margin: '5px'
  }

  const containerStyle = {
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
    fontFamily: 'system-ui, sans-serif'
  }

  const sectionStyle = {
    marginBottom: '30px',
    padding: '20px',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    backgroundColor: '#f9fafb'
  }

  return (
    <div style={containerStyle}>
      <h1 style={{ color: '#fcc600', marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <FlaskConical size={32} /> Error Boundary Test Page
      </h1>

      <p style={{ color: '#6b7280', marginBottom: '30px' }}>
        This page demonstrates different types of errors that can && cannot be caught by React Error Boundaries.
        Click the buttons below to trigger various error scenarios.
      </p>

      <div style={sectionStyle}>
        <h2 style={{ color: '#374151', marginBottom: '15px' }}>
          Immediate Render Error
        </h2>
        <p style={{ color: '#6b7280', marginBottom: '15px' }}>
          This will immediately throw an error when the component renders.
        </p>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="text"
            value={errorMessage}
            onChange={(e) => setErrorMessage(e.target.value)}
            placeholder="Custom error message"
            style={{
              padding: '8px',
              border: '1px solid #d1d5db',
              borderRadius: '4px',
              marginRight: '10px',
              width: '300px'
            }}
          />
        </div>
        <button
          onClick={() => setShowImmediateError(true)}
          style={buttonStyle}
        >
          Trigger Immediate Error
        </button>
        {showImmediateError && <ErrorComponent message={errorMessage} />}
      </div>

      <div style={sectionStyle}>
        <h2 style={{ color: '#374151', marginBottom: '15px' }}>
          Delayed Error
        </h2>
        <p style={{ color: '#6b7280', marginBottom: '15px' }}>
          This will throw an error after a state update.
        </p>
        <DelayedErrorComponent />
      </div>

      <div style={sectionStyle}>
        <h2 style={{ color: '#374151', marginBottom: '15px' }}>
          Event Handler Error
        </h2>
        <p style={{ color: '#6b7280', marginBottom: '15px' }}>
          This will throw an error in an event handler (won't be caught by Error Boundary).
        </p>
        <EventHandlerErrorComponent />
      </div>

      <div style={sectionStyle}>
        <h2 style={{ color: '#374151', marginBottom: '15px' }}>
          Undefined Property Error
        </h2>
        <p style={{ color: '#6b7280', marginBottom: '15px' }}>
          This will throw an error when trying to access properties of undefined/null.
        </p>
        <UndefinedPropertyErrorComponent />
      </div>

      <div style={sectionStyle}>
        <h2 style={{ color: '#374151', marginBottom: '15px' }}>
          useEffect Error
        </h2>
        <p style={{ color: '#6b7280', marginBottom: '15px' }}>
          This will throw an error in useEffect (won't be caught by Error Boundary).
        </p>
        <UseEffectErrorComponent />
      </div>

      <div style={{
        marginTop: '40px',
        padding: '20px',
        backgroundColor: '#fef3c7',
        border: '1px solid #f59e0b',
        borderRadius: '8px'
      }}>
        <h3 style={{ color: '#92400e', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <AlertTriangle size={20} /> Important Notes:
        </h3>
        <ul style={{ color: '#92400e', marginLeft: '20px' }}>
          <li>Error Boundaries only catch errors in React components during rendering</li>
          <li>Errors in event handlers, async code, or useEffect are NOT caught</li>
          <li>Error Boundaries work like try-catch blocks but for React components</li>
          <li>They catch errors anywhere in the child component tree</li>
        </ul>
      </div>
    </div>
  )
}

export default ErrorTestPage
