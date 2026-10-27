import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { TFilters } from "@/types/filters";

interface PropertyRatingProps {
  rating?: number;
  setFilters?: React.Dispatch<React.SetStateAction<TFilters>>;
}

const PropertyRating = ({ rating = 0, setFilters }: PropertyRatingProps) => {
  const propertyRatings = [3, 4, 5];

  const handleChange = (value: number) => {
    setFilters?.((prev) => ({
      ...prev,
      rating: prev.rating === value ? 0 : value, 
    }));
  };

  return (
    <div className="pb-4 border-b">
      <h2 className="font-semibold mb-2 text-lg">
        Property Rating
      </h2>

      <FieldGroup className="gap-3">
        {propertyRatings.map((value) => (
          <Field key={value} orientation="horizontal">
            <Checkbox
              checked={rating === value}
              onCheckedChange={() => handleChange(value)}
              id={`rating-${value}`}
              className="cursor-pointer"
            />

            <FieldLabel
              htmlFor={`rating-${value}`}
              className="font-normal cursor-pointer"
            >
              {value}+ Star
            </FieldLabel>
          </Field>
        ))}
      </FieldGroup>
    </div>
  );
};

export default PropertyRating;