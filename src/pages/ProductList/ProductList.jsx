import { useEffect, useState } from "react";
import Product from "../../components/Product/Product";
import "./productList.css";

const ProductList = () => {
  const [list, setList] = useState([]);
  useEffect(()=>{
        fetch("http://localhost:8080/api/product/all").then((response)=>response.json()).then(result=> setList(result));
  },[]);

  const data = list.length !==0 ? list.map((item)=>{
    return <Product item={item} key={item.name}/>
  }):null;
  return (
    <>
      <div className="product-list">
        {data}
      </div>
    </>
  );
};
export default ProductList;
