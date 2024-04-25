import Catalog from '@/components/Catalog'
import { MotionDiv } from '@/components/MotionDiv'
import { catalogData } from '@/components/catalogData'


export const metadata = {
    title: "Projects"
}

export default function ProjectsPage() {
    return (
        <MotionDiv
        initial="initialState"
        animate="animateState"
        exit="exitState"
        transition={{duration: 0.50,}}
        variants={{
            initialState: {
              opacity: 0,
            },
            animateState: {opacity: 1,},
            exitState: {}
        }}
        className="w-full min-h-screen">
          <Catalog catalog={catalogData}/>
        </MotionDiv>
    )
}