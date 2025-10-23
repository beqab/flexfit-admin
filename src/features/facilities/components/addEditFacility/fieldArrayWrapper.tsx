import { Button } from "@/components/ui/button";
import { FieldArray } from "formik";
import { Plus } from "lucide-react";

type Props = {
  title: string;
  addButtonTitle: string;
  children: React.ReactNode;
};

export default function FieldArrayWrapper({
  title,
  addButtonTitle,
  children,
}: Props) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase">
          {title}
        </h3>
        <FieldArray name="imgs">
          {({ push, remove }) => (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => push("")}
            >
              <Plus className="h-4 w-4 mr-1" />
              {addButtonTitle}
            </Button>
          )}
        </FieldArray>
      </div>
      {children}
    </div>
  );
}
