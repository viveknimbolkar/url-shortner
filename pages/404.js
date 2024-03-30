// import Lottie from "react-lottie-player";
import Notfound from "../public/assets/lottie/404.json";

export default function Custom404() {
  return (
    <div className="flex items-center justify-center">
      <div>
        {/* <Lottie
          loop
          animationData={Notfound}
          play
          style={{ width: 300, height: 300 }}
        /> */}
        <h1 className="text-center font-bold text-3xl">Oops! Page Not Found</h1>
      </div>
    </div>
  );
}
