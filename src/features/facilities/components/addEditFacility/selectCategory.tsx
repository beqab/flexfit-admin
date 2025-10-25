import { useGetCategories } from "../../hooks/useGetCategories";
import { Field } from "formik";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectCategoryProps {
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  selectedCategories: {
    _id: string;
    name: Record<string, string>;
    key: string;
  }[];
}

export default function SelectCategory({
  name,
  label = "Category",
  placeholder = "Select a category",
  required = false,
  selectedCategories,
}: SelectCategoryProps) {
  const { data: categories, isLoading, error } = useGetCategories();

  if (isLoading) return <div>Loading categories...</div>;
  if (error) return <div>Error loading categories: {error.message}</div>;

  return (
    <div className="space-y-2">
      {label && (
        <Label htmlFor={name}>
          {label} {required && " *"}
        </Label>
      )}
      <Field name={name}>
        {({ field, meta }: any) => {
          // Get the current category ID from the field value
          const currentCategoryId = field.value?._id || "";

          return (
            <>
              <Select
                value={currentCategoryId}
                onValueChange={(value) => {
                  // Find the selected category
                  const selectedCategory = categories?.find(
                    (cat) => cat._id === value
                  );
                  if (selectedCategory) {
                    // Create a multilingual name object
                    const nameObject: { [key: string]: string } = {};
                    // Assuming the API returns a simple string name, we'll use it for all languages
                    nameObject.en = selectedCategory.name;
                    nameObject.ka = selectedCategory.name; // You might want to adjust this based on your API

                    // Update the field with the full category object
                    field.onChange({
                      target: {
                        name: field.name,
                        value: {
                          _id: selectedCategory._id,
                          name: nameObject,
                          key: selectedCategory.key,
                        },
                      },
                    });
                  }
                }}
              >
                <SelectTrigger
                  className={meta.error && meta.touched ? "border-red-500" : ""}
                >
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                  {categories?.map((category) => {
                    // Hide options already selected elsewhere, unless this is the current field's value.
                    const alreadySelected = selectedCategories.some(
                      (c) =>
                        c._id === category._id && c._id !== currentCategoryId // Allow selecting current value
                    );
                    if (alreadySelected) return null;
                    return (
                      <SelectItem key={category._id} value={category._id}>
                        {category.name}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              {meta.error && meta.touched && (
                <p className="text-xs text-red-500">{meta.error}</p>
              )}
            </>
          );
        }}
      </Field>
    </div>
  );
}
