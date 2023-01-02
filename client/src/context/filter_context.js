import { useContext, useEffect, useReducer, createContext } from "react";
import {
    CLEAR_FILTERS,
    FILTER_PRODUCTS,
    LOAD_PRODUCTS,
    SET_GRIDVIEW,
    SET_LISTVIEW,
    SORT_PRODUCTS,
    UPDATE_FILTERS,
    UPDATE_SORT
} from "../actions";
import reducer from '../reducers/filter_reducer';
import { useProductsContext } from "./products_context";

const initialState = {
    filtered_products: [],
    all_products: [],
    grid_view: true,
    sort: 'price-lowest',
    filters: {
        text: '',
        company: 'all',
        category: 'all',
        color: 'all',
        price: '0',
        min_price: '0',
        max_price: '0',
        shipping: false
    }
}

const FilterContext = createContext();

export const FilterContextProvider = ({ children }) => {
    const { products } = useProductsContext();
    const [state, dispatch] = useReducer(reducer, initialState);

    const setGridView = () => {
        dispatch({ type: SET_GRIDVIEW });
    }
    const setListView = () => {
        dispatch({ type: SET_LISTVIEW });
    }
    const updateSort = (e) => {
        // just for demonstration
        // const name = e.target.name
        const value = e.target.value;
        dispatch({ type: UPDATE_SORT, payload: value });
    }
    const updateFilters = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        if (name === 'category') {
            value = e.target.textContent;
        }
        if (name === 'color') {
            value = e.target.dataset.color;
        }
        if (name === 'price') {
            value = Number(value);
        }
        if (name === 'shipping') {
            value = e.target.checked;
        }
        dispatch({ type: UPDATE_FILTERS, payload: { name, value } });
    }
    const clearFilters = () => {
        dispatch({ type: CLEAR_FILTERS });
    }

    useEffect(() => {
        dispatch({ type: LOAD_PRODUCTS, payload: products });
    }, [products]);

    useEffect(() => {
        dispatch({ type: FILTER_PRODUCTS });
        dispatch({ type: SORT_PRODUCTS });
    }, [state.sort, state.filters]);

    return (
        <FilterContext.Provider value={{
            ...state,
            setGridView,
            setListView,
            updateSort,
            updateFilters,
            clearFilters
        }}>
            {children}
        </FilterContext.Provider>
    )
}

export const useFilterContext = () => {
    return useContext(FilterContext);
}