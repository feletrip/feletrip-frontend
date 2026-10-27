interface InfoCardProps {
  icon: React.ReactNode;
  title: string;
  content: React.ReactNode;
}
const OfferInfoCard = ({ icon, title, content }: InfoCardProps) => {
  return (
    <div className="bg-muted relative flex items-center justify-center flex-col text-center p-16 rounded-xl space-y-1">
      {/* Floating Icon */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background p-8 rounded-full">
        {icon}
      </div>
      <h4 className="text-2xl font-bold mt-4 mb-2">{title}</h4>
      <div className="text-lg space-y-1">{content}</div>
    </div>
  );
};

export default OfferInfoCard;
