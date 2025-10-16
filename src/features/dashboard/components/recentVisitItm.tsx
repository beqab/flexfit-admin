import { IHistory } from "@/lib/types/serviceTypes";
import { formatDateUxFriendly } from "@/utils/formatDateUxFriendly";
import { QrCode } from "lucide-react";

export default function RecentVisitItem({ item }: { item: IHistory }) {
  return (
    <div className="flex items-center space-x-4">
      <div className="flex-shrink-0">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
          <QrCode className="h-4 w-4 text-green-600" />
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900">
          {item.user.firstName + " " + item.user.lastName}
        </p>
        <p className="text-sm text-gray-500">activity: {item.activityName}</p>
      </div>
      <div className="flex-shrink-0 text-xs text-gray-500">
        {formatDateUxFriendly(item.visitDate)}
      </div>
    </div>
  );
}
