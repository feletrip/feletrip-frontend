export type PropertyStatus = "Pending" | "Approved" | "Rejected";

export interface Property {
    id: number;
    propertyName: string;
    ownerName: string;
    location: string;
    status: PropertyStatus;
}

export const propertiesData: Property[] = [
    {
        id: 1,
        propertyName: "Luxury Villa",
        ownerName: "John Doe",
        location: "New York",
        status: "Pending",
    },
    {
        id: 2,
        propertyName: "Modern Apartment",
        ownerName: "Sarah Smith",
        location: "California",
        status: "Approved",
    },
    {
        id: 3,
        propertyName: "Beach House",
        ownerName: "Michael Lee",
        location: "Miami",
        status: "Rejected",
    },
    {
        id: 4,
        propertyName: "City Tower Flat",
        ownerName: "Emma Watson",
        location: "Chicago",
        status: "Pending",
    },
];