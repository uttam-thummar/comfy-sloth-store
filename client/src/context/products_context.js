import { useContext, useReducer, createContext, useEffect } from "react";
import axios from 'axios';
import { products_url as url } from "../utils/constants";
import reducer from '../reducers/products_reducer';
import {
    GET_PRODUCTS_BEGIN,
    GET_PRODUCTS_ERROR,
    GET_PRODUCTS_SUCCESS,
    GET_SINGLE_PRODUCT_BEGIN,
    GET_SINGLE_PRODUCT_ERROR,
    GET_SINGLE_PRODUCT_SUCCESS,
    SIDEBAR_CLOSE,
    SIDEBAR_OPEN
} from "../actions";

const initialState = {
    isSidebarOpen: false,
    products_loading: false,
    products_error: false,
    products: [],
    featured_products: [],
    single_product_loading: false,
    single_product_error: false,
    single_product: {}
}

const ProductsContext = createContext();

export const ProductsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const openSidebar = () => {
        dispatch({ type: SIDEBAR_OPEN });
    }
    const closeSidebar = () => {
        dispatch({ type: SIDEBAR_CLOSE });
    }

    const fetchProducts = async (url) => {
        dispatch({ type: GET_PRODUCTS_BEGIN});
        try {
            const response = await axios.get(url);
            const products = response.data;
            dispatch({type: GET_PRODUCTS_SUCCESS, payload: products});
        } catch (error) {
            dispatch({type: GET_PRODUCTS_ERROR});
        }
    }
    const fetchSingleProduct = async (url) => {
        dispatch({type: GET_SINGLE_PRODUCT_BEGIN});
        try {
            const response = await axios.get(url);
            const singleProduct = response.data;
            dispatch({type: GET_SINGLE_PRODUCT_SUCCESS, payload: singleProduct});
        } catch (error) {
            dispatch({type: GET_SINGLE_PRODUCT_ERROR});
        }
    }

    useEffect(() => {
        fetchProducts(url);
    }, []);

    return (
        <ProductsContext.Provider value={{
            ...state,
            openSidebar,
            closeSidebar,
            fetchSingleProduct
        }}>
            {children}
        </ProductsContext.Provider>
    )
}

export const useProductsContext = () => {
    return useContext(ProductsContext);
}