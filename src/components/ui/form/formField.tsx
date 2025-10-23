import { Field } from "formik";
import { Label } from "../label";
import { Input } from "../input";
import { cn } from "@/lib/utils";
import { Textarea } from "../textarea";

interface FormFieldProps {
  label?: string;
  name: string;
  type: string;
  placeholder: string;
  className?: string;
  wrapperClassName?: string;
  required?: boolean;
}

type FieldRenderProps = {
  field: {
    name: string;
    value: any;
    onChange: (e: React.ChangeEvent<any>) => void;
    onBlur: (e: React.FocusEvent<any>) => void;
  };
  meta: {
    error?: string;
    touched: boolean;
  };
};

export default function FormField({
  label,
  name,
  type,
  placeholder,
  className,
  required,
  wrapperClassName,
}: FormFieldProps) {
  return (
    <div className={cn("space-y-2", wrapperClassName)}>
      {label && (
        <Label htmlFor={name}>
          {label} {required && " *"}
        </Label>
      )}
      <Field name={name} className={className}>
        {({ field, meta }: FieldRenderProps) => (
          <>
            {type === "textarea" ? (
              <Textarea
                {...field}
                id={name}
                placeholder={placeholder}
                className={meta.error && meta.touched ? "border-red-500" : ""}
              />
            ) : (
              <Input
                {...field}
                id={name}
                type={type}
                placeholder={placeholder}
                className={meta.error && meta.touched ? "border-red-500" : ""}
              />
            )}
            {meta.error && meta.touched && (
              <p className="text-xs text-red-500">{meta.error}</p>
            )}
          </>
        )}
      </Field>
    </div>
  );
}
