import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type DashboardListProps<T> = {
  name: string;
  description: string;
  items: T[];
  renderItem: (item: T) => React.ReactNode;
};

function DashboardList<T>({
  name,
  description,
  items,
  renderItem,
}: DashboardListProps<T>) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {items.map((item, idx) => (
            <div key={(item as any).id ?? idx}>{renderItem(item)}</div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default DashboardList;
