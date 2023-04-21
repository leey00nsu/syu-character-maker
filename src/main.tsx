import ReactDOM from "react-dom/client";
import Index from "./pages/Index";
import "./index.css";
import { RecoilRoot } from "recoil";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <RecoilRoot>
    <Index />
  </RecoilRoot>
);
