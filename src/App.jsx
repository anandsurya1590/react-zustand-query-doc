import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Overview from "./pages/Overview";
import QuickStart from "./pages/QuickStart";
import Installation from "./pages/Installation";
import Queries from "./pages/concepts/Queries";
import Mutations from "./pages/concepts/Mutations";
import Caching from "./pages/concepts/Caching";
import UseQuery from "./pages/api/UseQuery";
import UseMutation from "./pages/api/UseMutation";
import UseInfiniteQuery from "./pages/api/UseInfiniteQuery";
import BasicQuery from "./pages/examples/BasicQuery";
import MutationsExample from "./pages/examples/MutationsExample";
import InfiniteScrollExample from "./pages/examples/InfiniteScrollExample";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Overview />} />
          <Route path="quickstart" element={<QuickStart />} />
          <Route path="installation" element={<Installation />} />
          <Route path="concepts/queries" element={<Queries />} />
          <Route path="concepts/mutations" element={<Mutations />} />
          <Route path="concepts/caching" element={<Caching />} />
          <Route path="api/use-query" element={<UseQuery />} />
          <Route path="api/use-mutation" element={<UseMutation />} />
          <Route path="api/use-infinite-query" element={<UseInfiniteQuery />} />
          <Route path="examples/basic-query" element={<BasicQuery />} />
          <Route path="examples/mutations" element={<MutationsExample />} />
          <Route path="examples/infinite-scroll" element={<InfiniteScrollExample />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
