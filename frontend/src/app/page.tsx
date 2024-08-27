"use client";

import axios from "axios";
import {useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Product } from "@/utils/types/productTypes";
import { NewProduct } from "@/utils/types/productTypes";


function HomePage(): JSX.Element {
  const [products, setProducts] = useState<Product[]>();
  const [newProduct, setNewProduct] = useState<NewProduct>({
    name: "",
    description: "",
    price: 0,
    isAvailable: false,
  });

  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8080/products", {
          headers: {
            Authorization: "super-secret-password",
          },
        });
        setProducts(response.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  async function addProduct(): Promise<void> {
    try {
      const response = await axios.post("http://127.0.0.1:8080/products", newProduct, {
        headers: {
          Authorization: "super-secret-password",
        },
      });

      console.log(products);
    } catch (error) {
      alert(error);
      console.log(error);
    }
  }

  function updateProduct(productId:string) {
    router.push(`/update/${productId}`);
  }

  async function deleteProduct(productId:string) {
    try {
      const response = await axios.delete(`http://127.0.0.1:8080/products/${productId}`, {
        headers:{
          Authorization:"super-secret-password"
        }
      });
      setProducts((prevProducts) =>
        prevProducts?.filter((product) => product._id !== productId)
      );

    } catch (error) {
      console.log(error);
      alert(error);
    }
  }

  return (
    <>
      <header>
        <h1>Product Management</h1>
      </header>

      <main>
        <section>
          <h2>Add a New Product</h2>
          <form method="POST" action={"/"}>
            <input
              type="text"
              id="productName"
              name="productName"
              placeholder="Name"
              value={newProduct.name}
              onChange={(e) => {
                setNewProduct({ ...newProduct, name: e.target.value });
              }}
              required
            />
            <input
              type="number"
              id="productPrice"
              name="productPrice"
              placeholder="Price"
              value={newProduct.price}
              onChange={(e) => {
                setNewProduct({ ...newProduct, price: Number(e.target.value) });
              }}
              required
            />
            <textarea
              id="productDescription"
              name="productDescription"
              placeholder="write a description of your product"
              value={newProduct.description}
              onChange={(e) => {
                setNewProduct({ ...newProduct, description: e.target.value });
              }}
              required
            ></textarea>
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

            <button onClick={addProduct}>Add Product</button>
          </form>
        </section>
        <section>
          <ul>
            {products?.map((product) => (
              <li key={product._id}>
                {product.name} - {product.description} - ${product.price} -{" "}
                {product.isAvailable ? "Available" : "Unavailable"}
                <button onClick={() => updateProduct(product._id)}>Update</button>
                <button onClick={()=>deleteProduct(product._id)}>Delete</button>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <footer>
        <p>&copy; 2024 Davi Arruda Navarro Albuquerque. All rights reserved.</p>
      </footer>
    </>
  );
}

export default HomePage;