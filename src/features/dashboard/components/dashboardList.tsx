import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

type DashboardListProps<T> = {
  name: string;
  description: string;
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  isLoading?: boolean;
};

function DashboardList<T>({
  name,
  description,
  items,
  renderItem,
  isLoading,
}: DashboardListProps<T>) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {isLoading
            ? Array.from({ length: 4 }).map((_, idx) => (
                <Skeleton key={idx} className="h-12 w-full rounded-md" />
              ))
            : items.map((item, idx) => (
                <div key={(item as any).id ?? idx}>{renderItem(item)}</div>
              ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default DashboardList;
