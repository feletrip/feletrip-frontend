import { RoomAvailability } from "@/types/vendor/room";
import { X } from "lucide-react";

interface Props {
  availability: RoomAvailability[];
  roomName?: string;
}

const RoomAvailabilityList = ({ availability, roomName }: Props) => {
  if (!availability.length) {
    return null;
  }

  const columns = `220px repeat(${availability.length}, 70px)`;

  return (
    <div className="mt-6 border rounded-xl overflow-hidden bg-background">
      {/* Header */}

      <div className="px-4 py-3 border-b bg-muted/40">
        <h2 className="font-bold text-primary  uppercase">{roomName}</h2>

        <p className="text-xs text-muted-foreground">
          Base Allotment: {availability[0]?.availableRooms ?? 0}
        </p>
      </div>

      <div className="overflow-x-auto scroll-smooth scrollbar-thin scrollbar-thumb-primary/30 ">
        <div className="min-w-max">
          {/* Month Row */}

          <div
            style={{
              gridTemplateColumns: columns,
            }}
            className="
            grid
            border-b
            "
          >
            {/* Empty first column */}
            <div />

            {availability.map((item) => (
              <div
                key={item.date}
                className="
                  text-center
                  text-xs
                  font-semibold
                  py-2
                  
                  "
              >
                {new Date(item.date).toLocaleDateString("en-US", {
                  month: "short",
                })}
              </div>
            ))}
          </div>

          {/* Date */}

          <AvailabilityRow
            title="Date"
            items={availability}
            columns={columns}
            render={(item) => new Date(item.date).getDate()}
          />

          {/* Status */}

          <AvailabilityRow
            title="Room Status"
            items={availability}
            columns={columns}
            render={(item) => (
              <span
                className={
                  item.isAvailable
                    ? "text-green-600 font-semibold"
                    : "text-destructive font-semibold"
                }
              >
                {item.isAvailable ? "OK" : <X size={14} />}
              </span>
            )}
          />

          {/* Available */}

          <AvailabilityRow
            title="Available Allotment"
            items={availability}
            columns={columns}
            render={(item) => <span>{item.availableRooms}</span>}
          />

        </div>
      </div>
    </div>
  );
};

interface RowProps {
  title: string;

  items: RoomAvailability[];

  columns: string;

  render: (item: RoomAvailability) => React.ReactNode;
}

const AvailabilityRow = ({ title, items, columns, render }: RowProps) => {
  return (
    <div
      style={{
        gridTemplateColumns: columns,
      }}
      className="
      grid
      border-b
      "
    >
      {/* First column */}

      <div
        className="
        px-4
        py-3
        text-sm
        font-medium
        border-r
        bg-muted/30
        "
      >
        {title}
      </div>

      {items.map((item) => (
        <div
          key={`${title}-${item.date}`}
          className="
            flex
            items-center
            justify-center
            text-xs
            border-r
            "
        >
          {render(item)}
        </div>
      ))}
    </div>
  );
};

export default RoomAvailabilityList;
