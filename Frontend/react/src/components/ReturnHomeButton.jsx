import { Link } from "react-router-dom"
const ReturnHomeButton = () => {
  return (
    <Link to="/blog" className="text-blue-600 hover:underline m-6">
    ← Return to the homepage
    </Link>
  )
}

export default ReturnHomeButton
