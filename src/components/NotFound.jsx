import { Sticker } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <Sticker className="size-16 stroke-blue-600 mb-4" />
      <h1 className="text-2xl font-semibold mb-2">404 - Page Not Found</h1>
      <p className="mb-6 text-zinc-600">Looks like you're lost.</p>
      <Link
        to="/"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
