import Spinner from "../components/Spinner";

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <Spinner size="xl" />
    </div>
  );
}
