import { useEffect, useRef, useState } from 'react';
import './CandidateSearch.css';
import { listCandidates, type Candidate, type CandidateStatus } from './api/candidates.api';

export function CandidateSearch() {
   const [candidates, setCandidates] = useState<Candidate[]>([]);
   const [search, setSearch] = useState<string>('');

   const [pages, setPages] = useState<number[]>([]);
   const [page, setPage] = useState<number>(1);
   const [pageSize, setPageSize] = useState<number>(5);
   const [query, setQuery] = useState<string>(search);
   const [status, setStatus] = useState<CandidateStatus | ''>('');

   const [loading, setLoading] = useState<boolean>(false);
   const debounceRef = useRef<NodeJS.Timeout | null>(null);
   const loadingRef = useRef<boolean>(false);

   const loadCandidates = async (query: string, status: CandidateStatus | '', page: number, pageSize: number) => {
      if (loadingRef.current) {
         return;
      }

      setLoading(true);
      loadingRef.current = true;

      try {
         const response = await listCandidates(query, status, page, pageSize);

         setCandidates(response.data ?? []);
         setPage(response.page);
         setPages(Array.from({ length: Math.ceil(response.total / response.pageSize) }, (_, i) => i + 1) );
      } catch (error: unknown) {
         console.error('Failed to load candidates:', error);
         alert('An unexpected error has ocurred while loading the candidates.');
      }

      setLoading(false);
      loadingRef.current = false;
   }

   const debounce = (search: string) => {
      setSearch(search);

      if (debounceRef.current != null) {
         clearTimeout(debounceRef.current);
         debounceRef.current = null;
      }

      debounceRef.current = setTimeout(() => {
         setQuery(search);
      }, 500);
   }

   const changePage = (page: number) => {
      loadCandidates(query, status, page, pageSize);
   }

   useEffect(() => {
      loadCandidates(query, status, 1, pageSize);

      return () => {
         if (debounceRef.current != null) {
            clearTimeout(debounceRef.current);
         }
      };
   }, [query, status, pageSize]);

   return (
      <div className="search">
         <div className="filter">
            <input type="search" name="search" id="search" placeholder="Search..." readOnly={loading} value={search} onChange={(e) => debounce(e.target.value)} />
            <select name="status" id="status" value={status} disabled={loading} onChange={(e) => setStatus(e.target.value as CandidateStatus | '')}>
               <option value="">all</option>
               <option value="new">new</option>
               <option value="contacted">contacted</option>
               <option value="interviewing">interviewing</option>
               <option value="hired">hired</option>
            </select>
         </div>
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
                  {candidates.map((item) => (
                     <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.status}</td>
                        <td>{item.updatedAt}</td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
         <div className="pages">
            <ul>
               {pages.map((item) => (
                  <li key={item}>
                     <button type="button" className={item == page ? 'active' : ''} disabled={loading} onClick={() => changePage(item)}>{item}</button>
                  </li>
               ))}
            </ul>
            <select name="pageSize" id="page-size" value={pageSize} disabled={loading} onChange={(e) => setPageSize(parseInt(e.target.value))}>
               <option value="5">5</option>
               <option value="10">10</option>
               <option value="25">25</option>
               <option value="50">50</option>
            </select>
         </div>

      </div>
   )
}