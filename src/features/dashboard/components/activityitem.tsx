import { ActivityIcon } from "lucide-react";

export interface itemsType {
  id: number;
  name: string;
  time: string;
  instructor: string;
  attendees: number;
  capacity: number;
}

export default function ActivityItem({ item }: { item: itemsType }) {
  return (
    <div key={item.id} className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
          <ActivityIcon className="h-5 w-5 text-gray-600" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-900">{item.name}</p>
          <p className="text-xs text-gray-500">
            {item.time} • {item.instructor}
          </p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-sm font-medium text-gray-900">
          {item.attendees}/{item.capacity}
        </p>
        <p className="text-xs text-gray-500">attendees</p>
      </div>
    </div>
  );
}
