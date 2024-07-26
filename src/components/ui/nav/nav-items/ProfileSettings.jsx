import { Button, Image } from "@nextui-org/react";
import React from "react";

const ProfileSettings = () => {
  return (
    <Button
      isIconOnly
      className="w-[29px] h-[29px] focus:outline-none bg-transparent rounded-full border-0"
    >
      <Image
        src="https://i.pravatar.cc/150?u=a04258a2462d826712d"
        className="w-[29px] h-[29px] border-2 rounded-full border-white"
      />
    </Button>
  );
};

export default ProfileSettings;
