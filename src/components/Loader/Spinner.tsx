// import { ThreeCircles } from "react-loader-spinner";
import * as s from "./Spinner.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "@store/store";
import ClipLoader from "react-spinners/ClipLoader";

const Spinner = () => {
  const { isLoading } = useSelector((state: RootState) => state.loaderSlice);
  return (
    <>
      {isLoading ? (
        <div className={s.tail_spin_container}>
          <div className={s.tail_spin}>
            <ClipLoader></ClipLoader>
            {/* <ThreeCircles color={"#725ac1"}></ThreeCircles> */}
            {/* Loading... */}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Spinner;
