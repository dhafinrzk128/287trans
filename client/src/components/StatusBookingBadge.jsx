import Badge from "./ui/Badge";
import { STATUS_BOOKING_LABEL, STATUS_BOOKING_BADGE } from "../utils/validators";

export default function StatusBookingBadge({ status, className = "" }) {
  return (
    <Badge className={`${STATUS_BOOKING_BADGE[status] || "bg-slate-100 text-slate-700 border-slate-200"} ${className}`}>
      {STATUS_BOOKING_LABEL[status] || status}
    </Badge>
  );
}
