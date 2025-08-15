import RegisterForm from "../../components/dashboards/RegisterForm";
import AnimationMain from "../../components/dashboards/AnimationMain";
import { useState } from "react";

export default function RegisterPage() {


  return (
    <>
      <main
        id="home"
        className="mx-auto grid min-h-[calc(100vh-64px)] max-w-7xl grid-cols-1 items-stretch gap-8 px-4 py-8 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-8"
      >
        <AnimationMain />
        <RegisterForm />
      </main>
    </>
  );
}
