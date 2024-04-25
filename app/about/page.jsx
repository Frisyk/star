import { MotionDiv } from "@/components/MotionDiv"
import Image from "next/image"
import profile from "@/public/portofolio/15.png"

export const metadata = {
    title: "About"
}

export default function AboutPage() {
    return (
        <MotionDiv
        initial="initialState"
        animate="animateState"
        exit="exitState"
        transition={{duration: 0.50,}}
        variants={{
            initialState: {opacity: 0,},
            animateState: {opacity: 1,},
            exitState: {}
        }}
        className="min-h-screen w-full lg:px-40 bg-orange-100 flex flex-col justify-center p-10">
            <h1 className="text-blue-800 lg:text-5xl text-3xl font-bold"> Frisnadi Nurul Huda</h1>
            <div className="lg:flex gap-5 ">

            <Image 
                src={profile}
                width={1000}
                alt="Frisnadi"
                className="my-5 rounded-md lg:w-1/3"
                />
            <h1 className="text-xl lg:text-2xl lg:my-5 leading-loose">Undergraduate Islamic Religious Education Student at UIN Sunan Kalijaga Yogyakarta. Has an interest in Education, IT and Graphic Design. Has more than 3 years of experience in the field of Design, 2 year in the field of Web Development and 1 year in Android Development. Can operate Adobe Illustrator, Figma, Canva, and other design software well. Active in volunteer programs for children&apos;s education.</h1>
            </div>
        </MotionDiv>
    )
}