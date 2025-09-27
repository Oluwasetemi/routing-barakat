# React Data Fetching & Routing Demo(`react-router-dom`)

A comprehensive React application demonstrating modern data fetching techniques, routing, error handling, and performance optimization patterns. This project showcases best practices for building robust React applications with proper error boundaries, lazy loading, and multiple data fetching strategies.

## 🚀 Features

### Data Fetching Libraries
- **TanStack Query (React Query)** - Powerful data synchronization for React
- **SWR** - Data fetching library with caching, revalidation, and error handling
- **Custom Hooks** - Reusable data fetching logic with SWR integration
- **Axios Integration** - HTTP client with error handling

### Routing & Navigation
- **React Router DOM v7** - Modern routing with nested routes and dynamic segments
- **Active Link Styling** - Visual feedback for current page
- **404 Error Handling** - Custom not found page with navigation options
- **Route Parameters** - Dynamic routing with URL parameters

### Error Handling & Resilience
- **React Error Boundary** - Comprehensive error catching and recovery
- **Multiple Error Scenarios** - Testing different error types and boundaries
- **Graceful Degradation** - Fallback UI components for failed states
- **Error Recovery** - Retry mechanisms and user-friendly error messages

### Performance Optimization
- **Lazy Loading** - Code splitting with React.lazy() and Suspense
- **Component Suspense** - Loading states for async components
- **Route-based Code Splitting** - Optimized bundle loading

### Development Experience
- **Modern Tooling** - Vite(Rolldown Vite) for fast development and building
- **ESLint Configuration** - Code quality and consistency
- **Hot Module Replacement** - Instant development feedback

## 🛠️ Tech Stack

- **React 19.1.1** - Latest React with concurrent features
- **React Router DOM 7.9.2** - Modern routing solution
- **TanStack Query 5.90.2** - Data fetching and caching
- **SWR 2.3.6** - Alternative data fetching library
- **Axios 1.12.2** - HTTP client
- **React Error Boundary 6.0.0** - Error handling
- **Vite** - Build tool and dev server
- **ESLint** - Code linting and formatting

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd fetching-api-react
   ```

2. **Install dependencies**
   ```bash
   # Using pnpm (recommended)
   pnpm install
   
   # Or using bun
   bun install
   
   # Or using npm
   npm install
   ```

3. **Start the development server**
   ```bash
   pnpm dev
   # or
   bun dev
   # or
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application.

## 🎯 Available Routes

| Route | Description | Features Demonstrated |
|-------|-------------|----------------------|
| `/` | Home page | Basic routing |
| `/posts` | Posts listing | Navigation and routing |
| `/posts/:id` | Individual post | Dynamic routing, custom hooks |
| `/users` | Users listing | Route parameters |
| `/users/:id` | Individual user | Lazy loading, Suspense |
| `/tanstack` | TanStack Query demo | Modern data fetching |
| `/swr` | SWR demo | Alternative data fetching |
| `/lazy` | Lazy loading demo | Code splitting, Suspense |
| `/error-test` | Error boundary testing | Error handling scenarios |

## 🔧 Key Components

### Data Fetching Components
- **TanstackQuery** - Demonstrates TanStack Query with error boundaries
- **SWRComponent** - Shows SWR implementation with custom fetchers
- **usePost Hook** - Custom hook using SWR and Axios for individual posts

### Error Handling
- **RouteErrorFallback** - Route-level error boundary component
- **TanstackQueryErrorFallback** - Specific error handling for TanStack Query
- **SWRErrorFallback** - Error handling for SWR components
- **ErrorTestPage** - Comprehensive error testing scenarios

### Navigation & Routing
- **App** - Main application with routing setup
- **Posts/Post** - Dynamic routing with parameters
- **Users/User** - Lazy-loaded user components
- **NotFound** - 404 error page with navigation

## 🧪 Error Boundary Testing

The `/error-test` route provides comprehensive testing for different error scenarios:

- **Immediate Render Errors** - Errors thrown during component rendering
- **Delayed Errors** - Errors triggered by state updates
- **Event Handler Errors** - Errors in click handlers (not caught by boundaries)
- **Undefined Property Errors** - Accessing properties of null/undefined
- **useEffect Errors** - Errors in lifecycle methods (not caught by boundaries)

## 📚 Learning Objectives

This project demonstrates:

1. **Modern Data Fetching Patterns**
   - When to use TanStack Query vs SWR
   - Custom hooks for reusable data logic
   - Error handling in data fetching

2. **React Router Best Practices**
   - Nested routing and dynamic segments
   - Active link styling and navigation
   - 404 handling and user experience

3. **Error Boundary Implementation**
   - What errors are caught vs not caught
   - Graceful error recovery
   - User-friendly error messages

4. **Performance Optimization**
   - Code splitting with lazy loading
   - Suspense for loading states
   - Bundle optimization strategies

5. **Development Best Practices**
   - Component organization and structure
   - Custom hooks for logic reuse
   - Error handling patterns

## 🚀 Available Scripts

```bash
# Development
bun dev          # Start development server
bun build        # Build for production
bun preview      # Preview production build

# Code Quality
bun lint         # Run ESLint
bun lint:fix     # Fix ESLint issues automatically
```

## 🎨 Styling

The application uses inline styles for demonstration purposes, focusing on functionality over styling. In a production application, consider using:

- CSS Modules
- Styled Components
- Tailwind CSS
- CSS-in-JS libraries

## 🔍 API Integration

The application uses [JSONPlaceholder](https://jsonplaceholder.typicode.com/) as a mock API for demonstration purposes. You can use [API.OLUWASETEMI.DEV](https://api.oluwasetemi.dev/reference) It provides:

- Posts data (`/posts`)
- Individual posts (`/posts/:id`)
- Users data (`/users`)
- Individual users (`/users/:id`)

## 📝 Notes

- This is a demonstration project focusing on React patterns and best practices
- Error boundaries only catch errors in React components during rendering
- Event handlers and async code errors require different handling strategies
- The project uses modern React features and assumes React 18+ compatibility

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is for educational purposes and demonstration of React best practices.
