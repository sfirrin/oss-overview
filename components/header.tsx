/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/ZEYTLaec1Kv
 */

import { Repositories } from "./repositories";

export function Header() {
  return (
    <header className="flex items-center justify-between px-4 py-2 border-b-2 border-black">
      <h1 className="mr-4 text-3xl font-bold text-black shrink-0">
        OSS Overview
      </h1>
      <Repositories />
    </header>
  );
}
