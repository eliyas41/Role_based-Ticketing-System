import React from "react";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <section className="h-[calc(100vh-59px)] lg:h-[calc(100vh-79px)] pt-10 md:pt-0">
      <div className="md:flex justify-center items-center w-[80%] mx-auto text-center md:text-start h-full">
        <div>
          <h1 className="text-2xl md:text-4xl font-black mb-5">
            User not authorized !
          </h1>
          <p className="mb-10">
            Sorry, the content you’re looking for doesn’t exist. Either it was
            removed, or you mistyped the link.{" "}
          </p>
          <div className="w-fit mx-auto md:mx-0">
            <button onClick={handleGoHome} className="bg-slate-300">Go Home</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Unauthorized;
