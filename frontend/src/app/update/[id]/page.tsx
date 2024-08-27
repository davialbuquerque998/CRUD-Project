"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import { useState } from "react";
import { NewProduct } from "@/utils/types/productTypes";


function MyComponent(): JSX.Element {
  const params = useParams();
  const id = params?.id;

  const [newProduct, setNewProduct] = useState<NewProduct>({
    name: "",
    description: "",
    price: 0,
    isAvailable: false,
  });

  async function updateProduct(){
    try {
        const response = await axios.put(`http://127.0.0.1:8080/products/${id}`, newProduct, {
            headers:{
                Authorization:"super-secret-password"
            }
        });
    } catch (error) {
        console.log(error);
        alert(error);
    }
  }

  return (
    <>
      <h1>Dynamic ID: {id}</h1>
      <header>
        <h1>Update Page</h1>
      </header>
      <main>
        <section>
          <h2>Update the Product of id = {id}</h2>
          <form method="POST" action={`/`}>
            <input type="text" placeholder="New name" value={newProduct.name} onChange={(e)=>{setNewProduct({...newProduct, name:e.target.value})}}required/>
            <input type="number" placeholder="New price" value={newProduct.price} onChange={(e) => {
                setNewProduct({ ...newProduct, price: Number(e.target.value) });
              }} />

            <input type="text" placeholder="New description" value={newProduct.description} onChange={(e)=>{setNewProduct({...newProduct, description:e.target.value})}} />
            <input
              type="checkbox"
              checked={newProduct.isAvailable}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  isAvailable: e.target.checked,
                })
              }
            />
            <button onClick={updateProduct}>Update Product</button>
          </form>
        </section>
        
      </main>

      <footer>
        <p>&copy; 2024 Davi Arruda Navarro Albuquerque. All rights reserved.</p>
      </footer>
    </>
  );
}

export default MyComponent;

