import { BookingDetails } from "@/types/booking";
import { format, parse, differenceInDays, isValid } from "date-fns";

interface Props {
  booking: BookingDetails;
}

const DATE_FORMAT = "dd-MM-yy";

const HotelBookingSummary = ({ booking }: Props) => {
  const { checkInDate, checkOutDate } = booking;

  // Parse once
  const checkIn = parse(checkInDate, DATE_FORMAT, new Date());
  const checkOut = parse(checkOutDate, DATE_FORMAT, new Date());

  // Guard against invalid dates
  if (!isValid(checkIn) || !isValid(checkOut)) {
    return (
      <div className="border border-destructive rounded-md p-4">
        Invalid booking dates.
      </div>
    );
  }

  const nights = Math.max(differenceInDays(checkOut, checkIn), 0);
  const daysRemaining = differenceInDays(checkIn, new Date());

  // Reusable formatter
  const formatBookingDate = (date: Date) => ({
    day: format(date, "EEEE"),
    fullDate: format(date, "d MMMM yyyy"),
  });

  const checkInFormatted = formatBookingDate(checkIn);
  const checkOutFormatted = formatBookingDate(checkOut);

  return (
    <div className="border border-primary rounded-md bg-background my-8 overflow-hidden">
      <div className="border-b border-primary bg-primary/10 px-4 py-2 font-semibold">
        Your Booking Details
      </div>

      <div className="space-y-4 p-4">
        {/* Check-in */}
        <div>
          <h4 className="text-sm font-semibold">Check-in</h4>
          <p className="text-sm text-muted-foreground">
            {checkInFormatted.day} <strong>{checkInFormatted.fullDate}</strong>
          </p>
        </div>

        {/* Check-out */}
        <div>
          <h4 className="text-sm font-semibold">Check-out</h4>
          <p className="text-sm text-muted-foreground">
            {checkOutFormatted.day}{" "}
            <strong>{checkOutFormatted.fullDate}</strong>
          </p>
        </div>

        {/* Length of stay */}
        <div>
          <h4 className="text-sm font-semibold">Total Length of stay</h4>
          <p className="text-sm text-muted-foreground">
            {nights} {nights === 1 ? "night" : "nights"}
          </p>
        </div>

        {/* Days remaining */}
        <div>
          {daysRemaining > 0 && (
            <p className="text-primary text-sm font-medium">
              Just {daysRemaining} day{daysRemaining > 1 ? "s" : ""} away!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HotelBookingSummary;
