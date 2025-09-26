import { Suspense } from 'react'

function Lazy() {

  return (
    <Suspense fallback={<div>fetching lazy component...</div>}>
      <div>Lazy component</div>
    </Suspense>
  )
}

export default Lazy
