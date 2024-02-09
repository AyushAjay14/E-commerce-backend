import React, { useState, useEffect } from "react";
import { HashLoader } from "react-spinners";
import Product from "./Product";
import axios from "axios";
function Products({ cat, filters, Sort }) {
  const [products, setproducts] = useState([]);
  const [filteredproducts, setFilteredProducts] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await axios.get(
          cat
            ? `https://e-commerse-t187.onrender.com/api/products?catagory=${cat}`
            : "https://e-commerse-t187.onrender.com/api/products/"
        );
        setproducts(res.data);
      } catch (err) {}
    };
    getProduct();
  }, [cat]);
  setTimeout(() => {
    setisLoading(false);
  }, 2000);
  useEffect(() => {
    setFilteredProducts(
      products.filter((item) =>
        Object.entries(filters).every(([key, value]) =>
          item[key].includes(value)
        )
      )
    );
  }, [cat, filters, products]);

  return (
    <>
      {isLoading ? (
        <HashLoader
          color="#000"
          size="35"
          cssOverride={{
            marginBottom : "3.2em",
          }}
        />
      ) : (
        filteredproducts.map((product, id) => {
          return <Product product={product} id={id} />;
        })
      )}
    </>
  );
}

export default Products;
