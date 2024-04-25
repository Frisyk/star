import { MotionDiv } from "@/components/MotionDiv"


export const metadata = {
    title: "Articles"
}

export default function ArticlesPage() {
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
        className="bg-gradient-to-r min-h-screen grid place-items-center from-blue-500 to-blue-700 text-white py-20 px-20">
          <h1 className="text-4xl font-bold">Under Contruction...🏗️</h1>
        </MotionDiv>
    )
}