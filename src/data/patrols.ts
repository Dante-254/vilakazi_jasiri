export const PATROLS = [
  {
    id: "dove",
    name: "Dove Patrol",
    status: "Novices",
    description:
      "Novices preparing for investment. Focus on learning values and basic skills.",
    pl: { name: "Alice N.", role: "PL" },
    apl: { name: "Ben K.", role: "APL" },
    members: [
      { name: "Sam", role: "Treasurer", duty: "treasurer" },
      { name: "Maya", role: "Quartermaster", duty: "quartermaster" },
    ],
    color: "#9CA3AF",
  },
  {
    id: "cat",
    name: "Cat Patrol",
    description:
      "A patrol focused on leadership, community service and skill development.",
    pl: { name: "Charles M.", role: "PL" },
    apl: { name: "Diana R.", role: "APL" },
    members: [
      { name: "Peter", role: "Discipline Master", duty: "discipline" },
      { name: "Lina", role: "Member", duty: "member" },
    ],
    color: "#0EA5A4",
  },
  {
    id: "leo",
    name: "Leo Patrol",
    description:
      "Experienced patrol with emphasis on roving and advanced service projects.",
    color: "#F59E0B",
    pl: { name: "Ethan Z.", role: "PL" },
    apl: { name: "Fiona Q.", role: "APL" },
    members: [
      { name: "Leo", role: "Quartermaster", duty: "quartermaster" },
      { name: "Zara", role: "Member", duty: "member" },
    ],
  },
];

export default PATROLS;
