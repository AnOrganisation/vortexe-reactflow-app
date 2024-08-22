import React from "react";
import Logo from "./assets/VortexeLogo.png";
import { Button } from "@nextui-org/react";
import { useAuth0 } from "@auth0/auth0-react";

const Home = () => {
  const { loginWithRedirect } = useAuth0();

  const handlePressLogin = () => {
    console.log("Login initiated");
    loginWithRedirect();
  };

  return (
    <div
      style={{ width: "100vw", height: "100vh", backgroundColor: "#1f1f1f" }}
    >
      <div className="p-4 text-lg">VortexeAI</div>
      <div className="h-[30%]"></div>
      <div className="flex flex-col items-center justify-center">
        <img src={Logo} alt="Vortexe Logo" className="mb-20" />
        <h1 className="mb-10 text-2xl text-center">
          <span className="text-[#6366F1]">Just One Click</span> to unlock the
          power of AI
        </h1>
        <Button
          onPress={handlePressLogin}
          size="lg"
          className="rounded-full focus:outline-none bg-[#6366F1] text-white"
        >
          Login/Signup
        </Button>
      </div>
    </div>
  );
};

export default Home;
