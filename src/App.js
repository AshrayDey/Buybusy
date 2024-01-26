import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Navbar } from "./Components/Navbar/Navbar";
import { Orders } from "./Components/Orders/orders";
import Home from "./Components/Home/home";
import { SignUp } from "./Pages/SignUp/SignUp";
import { SignIn } from "./Pages/SignIn/SignIn";
import { Cart } from "./Components/Cart/cart";
import { SearchContextProvider } from "./Contexts/searchContext";
import { AuthContextProvider } from "./Contexts/authContext";
import { ProductContextProvider } from "./Contexts/productContext";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      children: [
        { index: true, element: <Home /> },
        { path: "/orders", element: <Orders /> },
        { path: "/cart", element: <Cart /> },
        { path: "/signup", element: <SignUp /> },
        { path: "/signin", element: <SignIn /> },
      ],
    },
  ]);
  return (
    <div className="App">
      <AuthContextProvider>
        <ProductContextProvider>
          <SearchContextProvider>
            <RouterProvider router={router} />
          </SearchContextProvider>
        </ProductContextProvider>
      </AuthContextProvider>
    </div>
  );
}

export default App;
