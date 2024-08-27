"use client";

import axios from "axios";
import { useEffect, useState } from "react";

// Define the Product type to match your ProductModel
type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  isAvailable: boolean;
};

type NewProduct = {
  name: string;
  description: string;
  price: number;
  isAvailable: boolean;
};

function HomePage(): JSX.Element {
  const [products, setProducts] = useState<Product[]>();
  const [newProduct, setNewProduct] = useState<NewProduct>({
    name: "",
    description: "",
    price: 0,
    isAvailable: false,
  });

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

  async function addProduct() {
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

/* 
const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: "",
    description: "",
    price: 0,
    isAvailable: false,
  });

  // Fetch products from the API
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

  // Add a new product
  const addProduct = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8080/products",
        newProduct,
        { headers: { Authorization: "super-secret-password" } }
      );
      
      setProducts([...products, newProduct as Product]);
      setNewProduct({
        name: "",
        description: "",
        price: 0,
        isAvailable: false,
      });
    } catch (error) {
      alert(error)
      console.error("Error adding product:", error);
    }
  };

  // Update an existing product
  const updateProduct = async (id: string) => {
    try {
      const updatedProduct = {
        name: prompt("Enter new name:") || "",
        description: prompt("Enter new description:") || "",
        price: Number(prompt("Enter new price:")),
        isAvailable: confirm("Is the product available?"),
      };
      const response = await axios.put(
        `http://127.0.0.1:8080/products/${id}`,
        updatedProduct
      );
      setProducts(
        products.map((product) =>
          product._id === id ? { ...product, ...updatedProduct } : product
        )
      );
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  // Delete a product
  const deleteProduct = async (id: string) => {
    try {
      await axios.delete(`http://127.0.0.1:8080/products/${id}`);
      setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div>
      <h1>Product List</h1>
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            {product.name} - {product.description} - ${product.price} -{" "}
            {product.isAvailable ? "Available" : "Unavailable"}
            <button onClick={() => updateProduct(product._id)}>Update</button>
            <button onClick={() => deleteProduct(product._id)}>Delete</button>
          </li>
        ))}
      </ul>

      <h2>Add New Product</h2>
      <input
        type="text"
        placeholder="Name"
        value={newProduct.name}
        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Description"
        value={newProduct.description}
        onChange={(e) =>
          setNewProduct({ ...newProduct, description: e.target.value })
        }
      />
      <input
        type="number"
        placeholder="Price"
        value={newProduct.price}
        onChange={(e) =>
          setNewProduct({ ...newProduct, price: Number(e.target.value) })
        }
      />
      <label>
        Available
        <input
          type="checkbox"
          checked={newProduct.isAvailable}
          onChange={(e) =>
            setNewProduct({ ...newProduct, isAvailable: e.target.checked })
          }
        />
      </label>
      <button onClick={addProduct}>Add Product</button>
    </div>
  );
};

export default HomePage;
 */
