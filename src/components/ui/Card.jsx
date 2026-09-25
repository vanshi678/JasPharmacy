function Card({ children, className = "", onClick }) {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-2xl shadow-sm border border-purple-50 p-6 ${onClick ? "cursor-pointer hover:shadow-md transition-all duration-200" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
export default Card;