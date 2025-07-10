import { PropagateLoader } from "react-spinners";
export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center h-screen">
     <PropagateLoader color="#59b6e8" size={20} />
    </div>
  )
}
