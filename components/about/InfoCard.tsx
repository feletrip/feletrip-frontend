// components/about/InfoCard.tsx

type InfoCardProps = {
  title: string;
  description: string;
};

export default function InfoCard({ title, description }: InfoCardProps) {
  return (
    <div className="bg-card p-6 rounded-xl shadow-sm">
      <h4 className="font-semibold text-lg mb-3">{title}</h4>
      <p className="text-gray-600 dark:text-gray-100">{description}</p>
    </div>
  );
}
