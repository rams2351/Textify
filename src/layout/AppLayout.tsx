"use client";
import { FC, PropsWithChildren, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { store } from "redux/store";

const AppLayout: FC<PropsWithChildren> = ({ children }) => {
  const [mounted, setMounted] = useState<boolean>(false);

  // for removing hydration error
  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <Provider store={store}>
      <Toaster
        toastOptions={{
          position: "top-right",
          className: "bg-primary text-white text-lg",
          duration: 2000,
          error: {
            className: "border border-red-500 text-lg",
          },
        }}
      />
      <main>{mounted && children}</main>
    </Provider>
  );
};

export default AppLayout;
