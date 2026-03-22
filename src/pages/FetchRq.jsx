import { useQuery } from "@tanstack/react-query"
import { fetchPosts } from "../API/api";
import { NavLink } from "react-router-dom";

export const FetchRq = () => {

    const {data, isError, isLoading, error} = useQuery({
        queryKey: ['posts'],
        queryFn: () => fetchPosts()
        // staleTime: 10000
        // refetchInterval: 5000,
        // refetchIntervalInBackground: true
    })

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p> Error: {error.message || "Something went wrong!"}</p>;


    return (
        <>
        <div>
            <ul className="section-accordance">
                {
                    data.map((curElem) => {
                        const {id, title, body} = curElem;
                        return(
                            <li key={id}>
                                <NavLink to={`/rq/${id}`}>
                                    <p>{id}</p>
                                    <p>{title}</p>
                                    <p>{body}</p>
                               </NavLink>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
        </>
    )

}