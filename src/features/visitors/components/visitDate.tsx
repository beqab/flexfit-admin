import { formatDateUxFriendly } from "@/utils/formatDateUxFriendly";
import { Calendar } from "lucide-react";

export const VisitDate = ({ date }: { date: Date | string }) => {
  return (
    <div className="flex items-center gap-1 text-sm">
      <Calendar className="h-3 w-3" />
      {formatDateUxFriendly(date)}
    </div>
  );
};
