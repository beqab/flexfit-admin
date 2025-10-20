import { RefreshCcw, Search } from "lucide-react";
import { Input } from "./input";

interface SearchFieldProps {
  value: string;
  onChange: (value: string) => void;
  isSearching: boolean;
}

export default function SearchField({
  value,
  onChange,
  isSearching,
}: SearchFieldProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="relative">
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Search facilities..."
        value={value}
        onChange={handleChange}
        className="pl-8 w-64"
      />
      {isSearching && (
        <div className="absolute right-2 top-2.5">
          <RefreshCcw className="h-4 w-4 animate-spin text-muted-foreground" />
        </div>
      )}
    </div>
  );
}
