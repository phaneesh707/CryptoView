import React, { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import Banner from '../../Components/Banner/Banner'
import ErrorFallback from '../ErrorBoundry/ErrorBoundry'

const CoinsTable = React.lazy(()=>import('../../Components/CoinsTable/CoinsTable'))

const HomePage = () => {
  return (
    <>
    <Banner />
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={()=>{}}
    >
      <Suspense fallback={<div></div>}>
        <CoinsTable/>
      </Suspense>
    </ErrorBoundary>
    </>
  )
}

export default HomePage