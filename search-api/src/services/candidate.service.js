const candidates = [
   {
      id: "1",
      name: "Aisha Khan",
      email: "aisha@example.com",
      status: "interviewing",
      updatedAt: "2026-08-20T10:00:00.000Z"
   },
   {
      id: "2",
      name: "Marco Silva",
      email: "marco@example.com",
      status: "new",
      updatedAt: "2026-08-21T10:00:00.000Z"
   },
   {
      id: "3",
      name: "Priya Shah",
      email: "priya@example.com",
      status: "hired",
      updatedAt: "2026-08-22T10:00:00.000Z"
   },
   {
      id: "4",
      name: "Daniel Brooks",
      email: "daniel@example.com",
      status: "rejected",
      updatedAt: "2026-08-23T14:30:00.000Z"
   },
   {
      id: "5",
      name: "Sofia Martinez",
      email: "sofia@example.com",
      status: "interviewing",
      updatedAt: "2026-08-24T09:15:00.000Z"
   },
   {
      id: "6",
      name: "James Wilson",
      email: "james@example.com",
      status: "new",
      updatedAt: "2026-08-25T11:45:00.000Z"
   },
   {
      id: "7",
      name: "Mei Chen",
      email: "mei@example.com",
      status: "hired",
      updatedAt: "2026-08-26T16:20:00.000Z"
   },
   {
      id: "8",
      name: "Lucas Anderson",
      email: "lucas@example.com",
      status: "interviewing",
      updatedAt: "2026-08-27T13:10:00.000Z"
   },
   {
      id: "9",
      name: "Nadia Ibrahim",
      email: "nadia@example.com",
      status: "new",
      updatedAt: "2026-08-28T08:50:00.000Z"
   },
   {
      id: "10",
      name: "Ethan Thompson",
      email: "ethan@example.com",
      status: "rejected",
      updatedAt: "2026-08-29T15:05:00.000Z"
   },
   {
      id: "11",
      name: "Camila Rodriguez",
      email: "camila@example.com",
      status: "interviewing",
      updatedAt: "2026-08-30T10:25:00.000Z"
   },
   {
      id: "12",
      name: "Noah Williams",
      email: "noah@example.com",
      status: "hired",
      updatedAt: "2026-08-31T12:40:00.000Z"
   },
   {
      id: "13",
      name: "Fatima Hassan",
      email: "fatima@example.com",
      status: "new",
      updatedAt: "2026-09-01T09:00:00.000Z"
   },
   {
      id: "14",
      name: "Oliver Brown",
      email: "oliver@example.com",
      status: "interviewing",
      updatedAt: "2026-09-02T14:15:00.000Z"
   },
   {
      id: "15",
      name: "Valentina Rossi",
      email: "valentina@example.com",
      status: "hired",
      updatedAt: "2026-09-03T11:30:00.000Z"
   }
];

export const listCandidates = (search, status, page, pageSize) => {
   const startIndex = (page - 1) * pageSize;
   const endIndex = startIndex + pageSize;

   const list = candidates
      .filter((value) => (
         (!search || value.email.toLowerCase().includes(search.toLowerCase()) || value.name.toLowerCase().includes(search.toLowerCase()))
         && (!status || value.status === status)));

   return  {
      list: list.slice(startIndex, endIndex),
      total: list.length
   }
}