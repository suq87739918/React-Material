import HomePage from "./pages/HomePage";
import Pricing from "./pages/Pricing";
import Product from "./pages/Product";
import PageNotFound from "./pages/PageNotFound";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      This will keep the same and wont be re-rendered
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Pricing" element={<Pricing />} />
          <Route path="/Product" element={<Product />} />
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
