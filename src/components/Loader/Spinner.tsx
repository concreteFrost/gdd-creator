import { ThreeCircles } from "react-loader-spinner";
import * as s from "./Spinner.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "@store/store";

const Spinner = () => {
  const { isLoading } = useSelector((state: RootState) => state.loaderSlice);
  return (
    <>
      {isLoading ? (
        <div className={s.tail_spin_container}>
          <div className={s.tail_spin}>
            <ThreeCircles color={"#725ac1"}></ThreeCircles>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Spinner;
