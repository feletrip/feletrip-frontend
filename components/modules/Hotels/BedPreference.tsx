import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { TFilters } from "@/types/filters";

interface BedPreferenceProps {
  selected?: string[];
  setFilters?: React.Dispatch<React.SetStateAction<TFilters>>;
}

const BedPreference = ({
  selected = [],
  setFilters,
}: BedPreferenceProps) => {
  const bedPreferences: string[] = [
    "Twin Bed",
    "Double Bed",
    "King Bed",
  ];

  const toggle = (value: string) => {
    setFilters?.((prev) => {
      const exists = prev.bedPreference.includes(value);

      return {
        ...prev,
        bedPreference: exists
          ? prev.bedPreference.filter((b) => b !== value)
          : [...prev.bedPreference, value],
      };
    });
  };

  return (
    <div className="pb-4 border-b">
      <h2 className="font-semibold mb-2 text-lg">Bed Preference</h2>

      <FieldGroup className="gap-3">
        {bedPreferences.map((preference) => (
          <Field key={preference} orientation="horizontal">
            <Checkbox
              checked={selected.includes(preference)}
              onCheckedChange={() => toggle(preference)}
              id={`bed-${preference}`}
              className="cursor-pointer"
            />

            <FieldLabel
              htmlFor={`bed-${preference}`}
              className="font-normal cursor-pointer"
            >
              {preference}
            </FieldLabel>
          </Field>
        ))}
      </FieldGroup>
    </div>
  );
};

export default BedPreference;