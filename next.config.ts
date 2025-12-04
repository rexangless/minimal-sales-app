import type { NextConfig } from "next";

type NextConfigWithReactCompiler = NextConfig & {
  react?: {
    compiler?: boolean;
  };
};

const nextConfig: NextConfigWithReactCompiler = {
  // explicitly disable the optional React Compiler so Next won't try to
  // resolve `babel-plugin-react-compiler`.
  react: {
    compiler: false,
  },
};

export default nextConfig;