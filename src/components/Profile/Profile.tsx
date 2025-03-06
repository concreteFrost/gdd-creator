import { icons } from "@assets/icons";
import { useRef, useState } from "react";
import * as s from "./Profile.module.scss";

import ProfileForm from "./ProfileForm";
import useEscapeKeyHandler from "@hooks/useEscapeKeyHandler";

export default function Profile() {
  const [isProfileVisible, setProfileVisible] = useState<boolean>(false);

  const modalRef = useRef<HTMLDivElement>(null);
  const ignoreLayer = useRef<HTMLSpanElement>(null);

  // useOutsideMouseClick(modalRef, ignoreLayer, () => {
  //   if (isProfileVisible) setProfileVisible(false);
  // });

  useEscapeKeyHandler(() => setProfileVisible(false));

  return (
    <div className={s.wrapper}>
      <div className={s.profile_icon_wrapper}>
        <span
          className={s.icon}
          onClick={() => setProfileVisible(isProfileVisible ? false : true)}
          ref={ignoreLayer}
        >
          {icons.profile}
        </span>
      </div>

      {isProfileVisible ? (
        <ProfileForm
          modalRef={modalRef}
          setProfileVisible={setProfileVisible}
        ></ProfileForm>
      ) : null}
    </div>
  );
}
