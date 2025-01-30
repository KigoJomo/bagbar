import { FC } from "react";

const Intro: FC = () => {
  return(
    <section className="">
      <div className="flex flex-col">
          <div className="w-full flex items-center">
            <h1 className='uppercase italic text-nowrap hover:not-italic transition-all duration-300'>about</h1>
            <div className="w-full h-[1px] bg-foreground-faded"></div>
          </div>
          <div className="w-full flex items-center -mt-6 md:-mt-28">
            <div className="w-full h-[1px] bg-foreground-faded"></div>
            <h1 className='uppercase italic text-nowrap  hover:not-italic transition-all duration-300'>bag bar</h1>
          </div>
        </div>
    </section>
  )
}

export default Intro