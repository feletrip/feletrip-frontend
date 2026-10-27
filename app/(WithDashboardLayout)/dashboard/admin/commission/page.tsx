import CommissionPage from "@/components/modules/Booking/Commission/CommissionPage";
import { getWithdrawalLimitAndCommission } from "@/Server/Admin/limitAndCommission.action";

const CommissionPageDetails = async () => {
  const response = await getWithdrawalLimitAndCommission();
  const initialData = response?.success && response.data ? response.data : null;

  return (
    <div>
      <CommissionPage initialData={initialData} />
    </div>
  );
};

export default CommissionPageDetails;