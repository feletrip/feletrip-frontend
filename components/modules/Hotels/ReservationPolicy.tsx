import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { TFilters } from "@/types/filters";

interface ReservationPolicyProps {
  selected?: string[];
  setFilters?: React.Dispatch<React.SetStateAction<TFilters>>;
}

const ReservationPolicy = ({
  selected = [],
  setFilters,
}: ReservationPolicyProps) => {
  const reservationPolicies: string[] = [
    "Free cancellation",
    "Book without credit card",
    "Pay at property",
    "Instant book",
  ];

  const toggle = (value: string) => {
    setFilters?.((prev) => {
      const exists = prev.reservationPolicy.includes(value);

      return {
        ...prev,
        reservationPolicy: exists
          ? prev.reservationPolicy.filter((p) => p !== value)
          : [...prev.reservationPolicy, value],
      };
    });
  };

  return (
    <div className="pb-4 border-b">
      <h2 className="font-semibold mb-2 text-lg">Reservation Policy</h2>

      <FieldGroup className="gap-3">
        {reservationPolicies.map((policy) => (
          <Field key={policy} orientation="horizontal">
            <Checkbox
              checked={selected.includes(policy)}
              onCheckedChange={() => toggle(policy)}
              id={`policy-${policy}`}
              className="cursor-pointer"
            />

            <FieldLabel
              htmlFor={`policy-${policy}`}
              className="font-normal cursor-pointer"
            >
              {policy}
            </FieldLabel>
          </Field>
        ))}
      </FieldGroup>
    </div>
  );
};

export default ReservationPolicy;