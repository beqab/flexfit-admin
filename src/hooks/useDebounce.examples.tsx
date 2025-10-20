/**
 * DEBOUNCE HOOKS USAGE EXAMPLES
 *
 * This file demonstrates how to use the improved debounce hooks.
 * You can delete this file once you've reviewed the examples.
 */

import { useState } from "react";
import { useDebounce, useAdvancedDebounce } from "./useDebaunce";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RefreshCcw } from "lucide-react";

// ============================================================================
// EXAMPLE 1: Basic String Debounce (Your Current Usage)
// ============================================================================
export function BasicSearchExample() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);

  // API call only triggers after 500ms of no typing
  // useEffect(() => {
  //   fetchData(debouncedSearch);
  // }, [debouncedSearch]);

  return (
    <Input
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Search..."
    />
  );
}

// ============================================================================
// EXAMPLE 2: Generic Types - Numbers
// ============================================================================
export function NumberDebounceExample() {
  const [count, setCount] = useState(0);
  const debouncedCount = useDebounce<number>(count, 300);

  return (
    <div>
      <p>Current: {count}</p>
      <p>Debounced: {debouncedCount}</p>
      <Button onClick={() => setCount(count + 1)}>Increment</Button>
    </div>
  );
}

// ============================================================================
// EXAMPLE 3: Generic Types - Objects
// ============================================================================
interface Filters {
  category: string;
  priceMin: number;
  priceMax: number;
}

export function ObjectDebounceExample() {
  const [filters, setFilters] = useState<Filters>({
    category: "all",
    priceMin: 0,
    priceMax: 1000,
  });

  const debouncedFilters = useDebounce<Filters>(filters, 500);

  // useEffect(() => {
  //   fetchProducts(debouncedFilters);
  // }, [debouncedFilters]);

  return (
    <div>
      <Input
        value={filters.priceMin}
        onChange={(e) =>
          setFilters({ ...filters, priceMin: Number(e.target.value) })
        }
        type="number"
      />
    </div>
  );
}

// ============================================================================
// EXAMPLE 4: Advanced Hook with Loading Indicator
// ============================================================================
export function AdvancedSearchWithLoadingExample() {
  const [searchTerm, setSearchTerm] = useState("");
  const { debouncedValue, isPending, cancel, flush } = useAdvancedDebounce(
    searchTerm,
    500
  );

  return (
    <div className="space-y-4">
      <div className="relative">
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search with loading indicator..."
        />
        {/* Show spinner while waiting for debounce */}
        {isPending && (
          <div className="absolute right-2 top-2.5">
            <RefreshCcw className="h-4 w-4 animate-spin" />
          </div>
        )}
      </div>

      <div className="flex gap-2">
        {/* Cancel pending debounce */}
        <Button onClick={cancel} variant="outline" disabled={!isPending}>
          Cancel
        </Button>

        {/* Trigger search immediately */}
        <Button onClick={flush} disabled={!isPending}>
          Search Now
        </Button>
      </div>

      <p className="text-sm text-muted-foreground">
        Searching for: {debouncedValue || "nothing yet"}
      </p>
    </div>
  );
}

// ============================================================================
// EXAMPLE 5: Real-Time Validation
// ============================================================================
export function ValidationExample() {
  const [email, setEmail] = useState("");
  const debouncedEmail = useDebounce(email, 500);
  const [isValid, setIsValid] = useState<boolean | null>(null);

  // Check email validity after user stops typing
  // useEffect(() => {
  //   if (debouncedEmail) {
  //     const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(debouncedEmail);
  //     setIsValid(valid);
  //   }
  // }, [debouncedEmail]);

  return (
    <div>
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter email..."
      />
      {isValid !== null && (
        <p className={isValid ? "text-green-600" : "text-red-600"}>
          {isValid ? "✓ Valid email" : "✗ Invalid email"}
        </p>
      )}
    </div>
  );
}

// ============================================================================
// EXAMPLE 6: Disable Debounce (delay = 0)
// ============================================================================
export function NoDelayExample() {
  const [value, setValue] = useState("");

  // When delay is 0, it updates immediately (no debounce)
  const debouncedValue = useDebounce(value, 0);

  return (
    <div>
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="No delay..."
      />
      <p>Immediate: {debouncedValue}</p>
    </div>
  );
}

// ============================================================================
// EXAMPLE 7: Different Delays for Different Inputs
// ============================================================================
export function MultipleDebounceExample() {
  const [quickSearch, setQuickSearch] = useState("");
  const [slowSearch, setSlowSearch] = useState("");

  // Quick debounce (300ms)
  const debouncedQuick = useDebounce(quickSearch, 300);

  // Slow debounce (1000ms)
  const debouncedSlow = useDebounce(slowSearch, 1000);

  return (
    <div className="space-y-4">
      <div>
        <Input
          value={quickSearch}
          onChange={(e) => setQuickSearch(e.target.value)}
          placeholder="Quick search (300ms)..."
        />
        <p className="text-sm">Debounced: {debouncedQuick}</p>
      </div>

      <div>
        <Input
          value={slowSearch}
          onChange={(e) => setSlowSearch(e.target.value)}
          placeholder="Slow search (1000ms)..."
        />
        <p className="text-sm">Debounced: {debouncedSlow}</p>
      </div>
    </div>
  );
}

// ============================================================================
// COMPARISON: When to Use Each Hook
// ============================================================================

/**
 * Use `useDebounce` when:
 * ✅ Simple debouncing is needed
 * ✅ You don't need to cancel or flush
 * ✅ You want cleaner code
 * ✅ Best for most use cases
 *
 * Example: Search inputs, filter changes, form validation
 */

/**
 * Use `useAdvancedDebounce` when:
 * ✅ You need loading/pending state
 * ✅ You want to cancel debouncing
 * ✅ You need a "Search Now" button
 * ✅ Complex UX requirements
 *
 * Example: Advanced search UIs, real-time editors with save buttons
 */
