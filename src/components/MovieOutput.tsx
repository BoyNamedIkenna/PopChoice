type MovieOutputProps = {
  recommendation: { title: string; description: string } | null;
  status: "idle" | "loading" | "error";
  onNextMovie: () => void;
  onGoAgain: () => void;
};

export default function MovieOutput({ recommendation, status, onNextMovie, onGoAgain }: MovieOutputProps) {
  return (
    <div className="text-white space-y-4">
      <h2 className="font-bold text-2xl">{recommendation?.title}</h2>
      <p className="leading-relaxed text-gray-200">{recommendation?.description}</p>

      {status === "error" && (
        <p className="text-red-500 text-sm">
          Something went wrong finding the next movie. Please try again.
        </p>
      )}

      <button
        type="button"
        onClick={onNextMovie}
        disabled={status === "loading"}
        className="text-[#000C36] bg-[#51E08A] text-xl font-bold w-full py-4 rounded-lg mt-4 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "loading" ? "Finding another..." : "Next Movie"}
      </button>
      <button
        type="button"
        onClick={onGoAgain}
        className="text-white border border-[#51E08A] text-lg font-bold w-full py-3 rounded-lg mt-2 cursor-pointer"
      >
        Go Again
      </button>
    </div>
  );
}