export const lots = [
  {
    id: "lot1",
    name: "North Campus Lot",
    location: { lat: 37.7749, lng: -122.4194 },
    totalSlots: 10,
  },
  {
    id: "lot2",
    name: "South Campus Lot",
    location: { lat: 37.7849, lng: -122.4094 },
    totalSlots: 8,
  },
];

export const slots = {
  lot1: [
    { id: "s1", number: 1, status: "available" },
    { id: "s2", number: 2, status: "booked" },
    { id: "s3", number: 3, status: "available" },
  ],
  lot2: [
    { id: "s4", number: 4, status: "available" },
    { id: "s5", number: 5, status: "booked" },
    { id: "s6", number: 6, status: "available" },
  ],
};
