import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
function App() {
  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          success: {
            duration: 3000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />
      <div className="my-2 bg-gray-800">
        <Outlet />
      </div>
    </>
  );
}

export default App;
