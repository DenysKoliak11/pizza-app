import React, { useEffect, useContext, useState, useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCategoryId, setCurrentPage, setFilter } from '../redux/slices/filterSlice';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination/Pagination';
import { SearchContext } from '../App';
import axios from 'axios';
import { useQuery } from '../hooks/useQuery';
import { sortTheList } from '../constants/sortTheList';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const query = useQuery();
  const { categoryId, sort, currentPage } = useSelector((state) => state.filter);

  const onChangeCategory = useCallback((id) => {
    dispatch(setCategoryId(id));
  }, []);

  const onChangePage = useCallback((page) => {
    dispatch(setCurrentPage(page))
  }, []);

  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { searchValue } = useContext(SearchContext)

  const fetchPizzas = async () => {
    setIsLoading(true);

    const params = {
      search: searchValue ? `${searchValue}` : '',
      sortBy: sort.sortProperty.replace('-', ''),
      order: sort.sortProperty.includes('-') ? 'asc' : 'desc',
      limit: 4,
      page: currentPage,
      category: searchValue ? undefined : categoryId || undefined,
    }

    try {
      const res = await axios.get('https://6402b563f61d96ac486f46ee.mockapi.io/pizzas', {
        params
      });
      setPizzas(res.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      alert('Ошибка  при полученние данних')
    }
    window.scrollTo(0, 0)
  };


  useEffect(() => {
    fetchPizzas();
  }, [categoryId, sort.sortProperty, searchValue, currentPage])


  
  useEffect(() => {
    query.set(`sortProperty`, sort.sortProperty || 'rating');
    query.set(`categoryId`, categoryId || '0');
    query.set(`currentPage`, currentPage || '1');

    navigate(`?${query.toString()}`)
  }, [categoryId, sort.sortProperty, currentPage]);


  useEffect(() => {
    const sortProperty = query.get('sortProperty') || '';
    const params = {
      sortProperty,
      categoryId: query.get('categoryId') || '',
      currentPage: query.get('currentPage') || '',
      sort: sortTheList.find(obj => obj.sortProperty === sortProperty) || ''
    }
    dispatch(
      setFilter(params),
    );
  }, []);


  const pizzasArray = useMemo(() => pizzas.map((obj) => <PizzaBlock key={obj.id} {...obj} />), [pizzas]);
  const skeletonArray = useMemo(() => [...new Array(6)].map((_, index) => <Skeleton key={index} />), []);

  return (
    <div className='container'>
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory}></Categories>
        <Sort></Sort>
      </div>

      <h2 className="content__title">Всі піци</h2>

      <div className="content__items">{isLoading ? skeletonArray : pizzasArray}</div>
      {pizzas.length > 3 && <Pagination categoryId={categoryId} currentPage={currentPage} onChangePage={onChangePage}></Pagination>}

    </div>
  );
}
export default Home;