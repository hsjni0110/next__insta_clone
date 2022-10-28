import React from 'react'
import Stories from './Stories'

type Props = {}

const Feed = (props: Props) => {
  return (
    <main className='grid grid-cols-1 md:grid-cols-2 md:max-w-3xl xl:grid-cols-3 xl:max-w-6xl mx-auto'>
        {/* section */}
        <section>
            {/* Stories */}
            <Stories />
        </section>
            
            {/* Posts */}
        
        {/* Section */}
        <section>

        </section>
            {/* Mini Profile */}
    </main>
  )
}

export default Feed