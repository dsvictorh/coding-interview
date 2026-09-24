export type CandidateStatus = "new" | "contacted" | "interviewing" | "hired";

export type Candidate = {
  id: string;
  name: string;
  email: string;
  status: CandidateStatus;
  updatedAt: string;
};

export type CandidateResponse = {
  data: Candidate[];
  page: number;
  pageSize: number;
  total: number;
};

export const listCandidates = async (search: string, status: CandidateStatus, page: number, pageSize: number): Promise<CandidateResponse> => {
   const response = await fetch(`http://localhost:3000/api/v1/candidates?q=${search}&status=${status}&page=${page}&pageSize=${pageSize}`, {
      method: 'GET',
      headers: {
         'Content-Type': 'application/json'
      }
   }).then((response) => response.json());

   return response;
}