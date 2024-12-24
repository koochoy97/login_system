import { DataContext } from "./Context/DataContext";
import { useContext } from "react";

export function Test() {
  const { test } = useContext(DataContext);
  return (
    <>
      <h1>Test</h1>
    </>
  );
}
