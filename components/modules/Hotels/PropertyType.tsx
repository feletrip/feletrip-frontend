"use client";

import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { TFilters } from "@/types/filters";
import { ICategory } from "@/types/category";
import { getCategories } from "@/Server/Admin/category.admin.action";

interface PropertyTypeProps {
  selected?: string[];
  setFilters?: React.Dispatch<React.SetStateAction<TFilters>>;
}

const PropertyType = ({ selected = [], setFilters }: PropertyTypeProps) => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    const fetchCategories = async () => {
      try {
        const result = await getCategories();
        if (isMounted) {
          setCategories(Array.isArray(result?.data) ? result.data : []);
        }
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchCategories();
    return () => {
      isMounted = false;
    };
  }, []);

  const toggle = (value: string) => {
    setFilters?.((prev) => {
      const exists = prev.propertyType.includes(value);

      return {
        ...prev,
        propertyType: exists
          ? prev.propertyType.filter((type) => type !== value)
          : [...prev.propertyType, value],
      };
    });
  };

  return (
    <div className="pb-4 border-b">
      <h2 className="font-semibold mb-2 text-lg">Property Type</h2>

      <FieldGroup className="gap-3">
        {loading ? (
          <p className="text-xs text-muted-foreground animate-pulse">
            Loading categories...
          </p>
        ) : categories.length === 0 ? (
          <p className="text-xs text-muted-foreground">
            No property types available.
          </p>
        ) : (
          categories.map((category) => {
            const categoryName = category.name;
            const isChecked = selected.includes(categoryName);

            return (
              <Field key={category.id || categoryName} orientation="horizontal">
                <Checkbox
                  checked={isChecked}
                  onCheckedChange={() => toggle(categoryName)}
                  id={`property-${category.id || categoryName}`}
                  className="cursor-pointer"
                />

                <FieldLabel
                  htmlFor={`property-${category.id || categoryName}`}
                  className="font-normal cursor-pointer"
                >
                  {categoryName}
                </FieldLabel>
              </Field>
            );
          })
        )}
      </FieldGroup>
    </div>
  );
};

export default PropertyType;
