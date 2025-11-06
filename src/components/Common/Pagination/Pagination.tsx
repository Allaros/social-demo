import { useAppDispatch, useAppSelector } from '../../../redux/typedHooks/hooks';
import { changePage } from '../../../redux/UsersReducer';
import classes from './Pagination.module.scss';

type Props = {
   currentPage: number
   className?: string
};

const Pagination: React.FC<Props> = ({currentPage, className}) => {
   const dispatch = useAppDispatch();

   
   const pageSize = useAppSelector(state => state.usersPage.pageSize);
   const totalUsersCount = useAppSelector(state => state.usersPage.totalUsersCount);
   const paginationLength = useAppSelector(state => state.usersPage.pageSize);
    
   let pagesCount = Math.ceil(totalUsersCount / pageSize); 
   let pages: Array<number> = [];
   for (let i = 1; i <= pagesCount; i++) {
      pages.push(i);
   }
   let portionSize = paginationLength;
   let portionCount = Math.ceil(pagesCount / portionSize);
   let currentPortion = Math.ceil(currentPage / portionSize);

   let leftPortionPageNumber = (currentPortion - 1) * portionSize + 1;
   let rightPortionPageNumber = currentPortion * portionSize;
   if (rightPortionPageNumber > pagesCount) {
      rightPortionPageNumber = pagesCount;
   }

   return (
      <div className={classes.pagination}>
         {currentPage > 1 && (
            <button onClick={() => dispatch(changePage(1))}>
               <svg xmlns="http://www.w3.org/2000/svg" style={{ fill: '#fff', transform: 'rotate(-90deg)' }} width="24" height="24">
                  <path d="m12 6.414 7.293 7.293 1.414-1.414L12 3.586l-8.707 8.707 1.414 1.414L12 6.414z" />
                  <path d="m3.293 18.293 1.414 1.414L12 12.414l7.293 7.293 1.414-1.414L12 9.586l-8.707 8.707z" />
               </svg>
            </button>
         )}
         <div className={classes.pagination__pages}>
            {currentPortion > 1 && (
               <button onClick={() => dispatch(changePage(leftPortionPageNumber - 1))}>
                  <svg style={{ fill: '#fff', transform: 'rotate(180deg)' }} xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                     <path d="M7.293 4.707 14.586 12l-7.293 7.293 1.414 1.414L17.414 12 8.707 3.293 7.293 4.707z" />
                  </svg>
               </button>
            )}
            {pages
               .filter((p) => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
               .map((p) => (
                  <button key={p} className={`${classes.pageButton} ${currentPage === p ? classes.active : ''}`} onClick={() => dispatch(changePage(p))}>
                     {p}
                  </button>
               ))}
            {currentPortion < portionCount && (
               <button onClick={() => dispatch(changePage(rightPortionPageNumber + 1))}>
                  <svg style={{ fill: '#fff' }} xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                     <path d="M7.293 4.707 14.586 12l-7.293 7.293 1.414 1.414L17.414 12 8.707 3.293 7.293 4.707z" />
                  </svg>
               </button>
            )}
         </div>
         {currentPage < pagesCount && (
            <button onClick={() => dispatch(changePage(pagesCount))}>
               <svg xmlns="http://www.w3.org/2000/svg" style={{ fill: '#fff', transform: 'rotate(90deg)' }} width="24" height="24">
                  <path d="m12 6.414 7.293 7.293 1.414-1.414L12 3.586l-8.707 8.707 1.414 1.414L12 6.414z" />
                  <path d="m3.293 18.293 1.414 1.414L12 12.414l7.293 7.293 1.414-1.414L12 9.586l-8.707 8.707z" />
               </svg>
            </button>
         )}
      </div>
   );
};

export default Pagination;
