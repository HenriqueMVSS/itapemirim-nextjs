import { GoSearch } from "react-icons/go";

export function SearchBar(){

    return(
        <div className="search-bar">
           <div className="search">
            <GoSearch size={15}/>
           </div>
           
            <input type="search" placeholder="Pesquisar" />

            <style jsx>{`
                input{
                    border: 0;
                    outline: none;
                    width: 100%;
                    background:#fcec6d;
                }  

                .search-bar {
                    background-color: #fcec6d;
                    display:flex;
                    border: 1px solid #000;
                    border-radius: 5px;
                    align-items:center;
                    justify-content:center;
                    padding:4px 8px;

                }  

                .search {
                    display:flex;
                    align-items:center;
                    margin-right: 8px;
                    cursor:pointer;
                }
            `}</style>
        </div>   
    )
}