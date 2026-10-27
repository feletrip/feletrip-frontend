import { Container } from "../../Shared/Container";
import SectionTitle from "../../Typography";
import CategoryCard from "./CategoryCard";
import { getCategories } from "@/Server/Admin/category.admin.action";

export default async function PopularCategories() {
  const result = await getCategories();
  const categoryData = Array.isArray(result?.data) ? result.data : [];

  // sorting and slicing
  const categories = categoryData
    .sort((a, b) => (b._count?.hotels || 0) - (a._count?.hotels || 0))
    .slice(0, 4);

  return (
    <section className="py-20">
      <Container>
        <SectionTitle
          title="Browse By Categories"
          subtitle="Explore a wide range of stays tailored for every travel style"
          className="text-center mb-12"
          divClassName="justify-center"
          subtitleClassName="max-w-3xl mx-auto"
        />

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {categories.map((category, i) => (
            <CategoryCard key={category.id || i} index={i} {...category} />
          ))}
        </div>
      </Container>
    </section>
  );
}
