export default function StarRating({ rating = 0 }) {
    return (
      <div className="flex gap-1">
        {Array(5).fill(0).map((_, i) => (
          <span key={i} className={i < rating ? "text-yellow-400" : "text-gray-300"}>★</span>
        ))}
      </div>
    );
  }
  