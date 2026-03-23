import {  useMutation, useQuery } from "@tanstack/react-query"
import { fetchPosts, deletePost } from "../API/api";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useQueryClient } from '@tanstack/react-query';


export const FetchRq = () => {

    const queryClient = useQueryClient();

    const [pageNum, setPageNum] = useState(1);


    const {data, isError, isLoading, error} = useQuery({
        queryKey: ['posts', pageNum],
        queryFn: () => fetchPosts(pageNum),
        // placeholderData: keepPreviousData
        // staleTime: 5000
        // refetchInterval: 5000,
        // refetchIntervalInBackground: true 
    })

    const deleteMutation = useMutation({
        mutationFn: (id) => deletePost(id),
        onSuccess: (data, id ) => {
             queryClient.setQueryData(['posts', pageNum], (curElem)=>{ 
                return curElem?.filter((post) => post.id !== id);
             } )
        }
    })

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p> Error: {error.message || "Something went wrong!"}</p>;


    return (
        <>
        <div>
            <ul className="section-accordance">
                {
                    data?.map((curElem) => {
                        const {id, title, body} = curElem;
                        return(
                            <li key={id}>
                                <NavLink to={`/rq/${id}`}>
                                    <p>{id}</p>
                                    <p>{title}</p>
                                    <p>{body}</p>
                               </NavLink>
                               <button onClick={() => deleteMutation.mutate(id) }>Delete</button>
                            </li>
                        )
                    })
                }
            </ul>

            <div className="pagination-section container">
                <button disabled={pageNum ===1} onClick={() => setPageNum((prev) => prev - 1)}>Prev</button>
                  <h2>{pageNum}</h2>
                <button onClick={() => setPageNum((prev) => prev + 1)}>Next</button>
            </div>


        </div>
        </>
    )

}