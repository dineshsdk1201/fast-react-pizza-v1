import { useNavigate, useRouteError } from "react-router-dom";

function Error() {
  const navigate = useNavigate();
  const error = useRouteError();
  console.log(error);
  return (
    <div className="flex items-center justify-center flex-col min-h-screen gap-2 ">
      <h1 className="font-semibold text-stone-500 sm:font-extrabold text-2xl sm:text-3xl">
        Something went wrong 😢
      </h1>
      <p className="text-indigo-400 text-sm">{error.data || error.message}</p>
      <button
        onClick={() => navigate(-1)}
        className="text-blue-300 text-xl cursor-pointer"
      >
        &larr; Go back
      </button>
    </div>
  );
}

export default Error;
