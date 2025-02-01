import { FC } from "react";

const FeatureUnderDevelopment: FC = () => {
  return(
    <div className="w-full flex flex-col items-center justify-center">
      <p className="italic text-foreground-light text-center">
        ***
        <br />
        This feature is under development. <br /> Stay tuned for updates.
        <br />
        ***
      </p>
    </div>
  )
}

export default FeatureUnderDevelopment;