"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Product, NewProduct } from "@/utils/types/productTypes";
import "bootstrap/dist/css/bootstrap.min.css";
import { ENDPOINT, PASSWORD } from "@/utils/constants/environmentConstants";



function HomePage(): JSX.Element {
  const [products, setProducts] = useState<Product[]>();
  const [newProduct, setNewProduct] = useState<NewProduct>({
    name: "",
    description: "",
    price: 0,
    isAvailable: false,
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(ENDPOINT, {
          headers: {
            Authorization: PASSWORD,
          },
        });
        setProducts(response.data.products);
      } catch (error) {
        setErrorMessage("Error fetching products. Please try again later.");
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  async function addProduct(): Promise<void> {
    try {
      await axios.post(ENDPOINT, newProduct, {
        headers: {
          Authorization: PASSWORD,
        },
      });
      setSuccessMessage("Product added successfully! Please, refresh the page");
      setErrorMessage(null);
    } catch (error) {
      setErrorMessage("Error adding product. Please try again.");
      setSuccessMessage(null);
      console.log(error);
    }
  }

  function updateProduct(productId: string) {
    router.push(`/update/${productId}`);
  }

  async function deleteProduct(productId: string) {
    try {
      await axios.delete(`${ENDPOINT}/${productId}`, {
        headers: {
          Authorization: PASSWORD,
        },
      });
      setProducts((prevProducts) =>
        prevProducts?.filter((product) => product._id !== productId)
      );
      setSuccessMessage("Product deleted successfully!");
      setErrorMessage(null);
    } catch (error) {
      setErrorMessage("Error deleting product. Please try again.");
      setSuccessMessage(null);
      console.log(error);
    }
  }

  return (
    <div className="container my-5">
      <header className="mb-4">
        <h1 className="text-center">Product Management</h1>
      </header>

      <main>
        <section className="mb-5">
          <h2>Add a New Product</h2>
          {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
          {successMessage && <div className="alert alert-success">{successMessage}</div>}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addProduct();
            }}
            className="needs-validation"
            noValidate
          >
            <div className="mb-3">
              <label htmlFor="productName" className="form-label">
                Product Name
              </label>
              <input
                type="text"
                className="form-control"
                id="productName"
                name="productName"
                placeholder="Name"
                value={newProduct.name}
                onChange={(e) => {
                  setNewProduct({ ...newProduct, name: e.target.value });
                }}
                required
              />
              <div className="invalid-feedback">Please provide a product name.</div>
            </div>

            <div className="mb-3">
              <label htmlFor="productPrice" className="form-label">
                Price
              </label>
              <input
                type="number"
                className="form-control"
                id="productPrice"
                name="productPrice"
                placeholder="Price"
                value={newProduct.price}
                onChange={(e) => {
                  setNewProduct({ ...newProduct, price: Number(e.target.value) });
                }}
                required
              />
              <div className="invalid-feedback">Please provide a price.</div>
            </div>

            <div className="mb-3">
              <label htmlFor="productDescription" className="form-label">
                Description
              </label>
              <textarea
                className="form-control"
                id="productDescription"
                name="productDescription"
                placeholder="Write a description of your product"
                value={newProduct.description}
                onChange={(e) => {
                  setNewProduct({ ...newProduct, description: e.target.value });
                }}
                required
              ></textarea>
              <div className="invalid-feedback">Please provide a description.</div>
            </div>

            <div className="form-check mb-3">
              <input
                className="form-check-input"
                type="checkbox"
                id="isAvailable"
                checked={newProduct.isAvailable}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    isAvailable: e.target.checked,
                  })
                }
              />
              <label className="form-check-label" htmlFor="isAvailable">
                Available
              </label>
            </div>

            <button type="submit" className="btn btn-primary">
              Add Product
            </button>
          </form>
        </section>

        <section>
          <h2>Product List</h2>
          {products?.length ? (
            <ul className="list-group">
              {products.map((product) => (
                <li key={product._id} className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <strong>{product.name}</strong> - {product.description} - ${product.price} -{" "}
                    {product.isAvailable ? (
                      <span className="badge bg-success">Available</span>
                    ) : (
                      <span className="badge bg-danger">Unavailable</span>
                    )}
                  </div>
                  <div>
                    <button
                      onClick={() => updateProduct(product._id)}
                      className="btn btn-sm btn-warning me-2"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => deleteProduct(product._id)}
                      className="btn btn-sm btn-danger"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No products available.</p>
          )}
        </section>
      </main>

      <footer className="text-center mt-5">
        <p>&copy; 2024 Davi Arruda Navarro Albuquerque. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default HomePage;
