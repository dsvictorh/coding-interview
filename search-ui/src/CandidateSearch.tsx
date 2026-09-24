import { useEffect, useState } from 'react';
import './CandidateSearch.css';
import { listCandidates, type Candidate, type CandidateStatus } from './api/candidates.api';

export function CandidateSearch() {
   const [candidates, setCandidates] = useState<Candidate[]>([]);
   const [totalCandidates, setTotalCandidates] = useState<number>(0);

   const [page, setPage] = useState<number>(1);
   const [pageSize, setPageSize] = useState<number>(10);
   const [query, setQuery] = useState<string>('');
   const [status, setStatus] = useState<CandidateStatus>('new');

   const loadCandidates = async () => {
      const response = await listCandidates(query, status, page, pageSize);

      setCandidates(response.data);
      setTotalCandidates(response.total);
   }

   useEffect(() => {
      loadCandidates();
   }, []);

   return (
      <div className="search">
         <div className="candidates-wrapper">
            <table className="candidates">
               <thead>
                  <tr>
                     <th style={{ width: '200%' }}>Name</th>
                     <th style={{ width: '200%' }}>Email</th>
                     <th style={{ width: '50%' }}>Status</th>
                     <th style={{ width: '100%' }}>Updated At</th>
                  </tr>
               </thead>
               <tbody>
                  {candidates.map((item, index) => (
                     <tr key={index}>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.status}</td>
                        <td>{item.updatedAt}</td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
   )
}