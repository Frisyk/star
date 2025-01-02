import { MotionDiv } from "@/components/MotionDiv";
import Image from "next/image";
import profile from "@/public/portofolio/15.png";
import Link from "next/link";

export const metadata = {
    title: "About"
};

export default function AboutPage() {
    return (
        <MotionDiv
            initial="initialState"
            animate="animateState"
            exit="exitState"
            transition={{ duration: 0.5 }}
            variants={{
                initialState: { opacity: 0 },
                animateState: { opacity: 1 },
                exitState: { opacity: 0 }
            }}
            className="min-h-screen bg-orange-100 flex flex-col items-center justify-center p-10"
        >
            <div className="max-w-4xl w-full lg:flex items-center justify-center gap-10">
                <div className="lg:w-1/3">
                    <Image
                        src={profile}
                        width={500}
                        height={500}
                        alt="Frisnadi"
                        className="rounded-md"
                    />
                </div>
                <div className="lg:w-2/3">
                    <h1 className="text-blue-800 lg:text-5xl text-3xl font-bold mb-5 mt-5 lg:text-left">
                        Frisnadi Nurul Huda
                    </h1>
                    <p className="text-xl lg:text-2xl leading-8 mb-8 lg:text-left">
                        Undergraduate Islamic Religious Education Student at UIN Sunan Kalijaga Yogyakarta. Has an interest in Education, IT, and Graphic Design. Experienced in Adobe Illustrator, Figma, Canva, and other design software. Active in volunteer programs for children&apos;s education.
                    </p>
                    <div className="flex justify-center lg:justify-start">
                        <Link
                            href="https://drive.google.com/file/d/1WmhgP6mfqVjh-cXe_9Dav_I8NRLy1I8F/view?usp=drive_link"
                            className="bg-blue-600 text-white py-3 px-6 rounded-full w-full text-center text-lg font-semibold hover:bg-blue-700 transition duration-300"
                            target="_blank"
                        >
                            My Resume
                        </Link>
                    </div>
                </div>
            </div>
        </MotionDiv>
    );
}
