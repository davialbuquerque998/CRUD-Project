"use client";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { NewProduct, Product } from "@/utils/types/productTypes";
import "bootstrap/dist/css/bootstrap.min.css";
import { ENDPOINT, PASSWORD } from "@/utils/constants/environmentConstants";

function UpdateComponent(): JSX.Element {
  const params = useParams();
  const id = params?.id;
  const router = useRouter();

  const [product, setProduct] = useState<Product>();
  const [newProduct, setNewProduct] = useState<NewProduct>({
    name: "",
    description: "",
    price: 0,
    isAvailable: false,
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSingleProduct() {
      try {
        const result = await axios.get(`${ENDPOINT}/${id}`, {
          headers: {
            Authorization: PASSWORD,
          },
        });
        setProduct(result.data.product);
      } catch (error) {
        setErrorMessage("Error fetching product details. Please try again.");
        console.log(error);
      }
    }

    fetchSingleProduct();
  }, [id]);

  async function updateProduct() {
    try {
      await axios.put(`${ENDPOINT}/${id}`, newProduct, {
        headers: {
          Authorization: PASSWORD,
        },
      });
      setSuccessMessage("Product updated successfully!");
      setErrorMessage(null);
      router.push("/");
    } catch (error) {
      setErrorMessage("Error updating product. Please try again.");
      setSuccessMessage(null);
      console.log(error);
    }
  }

  return (
    <div className="container my-5">
      <header className="mb-4">
        <h1 className="text-center">Update Page</h1>
      </header>

      <main>
        <section className="mb-5">
          {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
          {successMessage && <div className="alert alert-success">{successMessage}</div>}
          
          <div className="mb-4">
            <p><strong>Current Name:</strong> {product?.name}</p>
            <p><strong>Current Description:</strong> {product?.description}</p>
            <p><strong>Current Price:</strong> ${product?.price}</p>
            <p><strong>Availability:</strong> {product?.isAvailable ? "Available" : "Unavailable"}</p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              updateProduct();
            }}
            className="needs-validation"
            noValidate
          >
            <div className="mb-3">
              <label htmlFor="productName" className="form-label">
                New Name
              </label>
              <input
                type="text"
                className="form-control"
                id="productName"
                placeholder="New name"
                value={newProduct.name}
                onChange={(e) => {
                  setNewProduct({ ...newProduct, name: e.target.value });
                }}
                required
              />
              <div className="invalid-feedback">Please provide a new product name.</div>
            </div>

            <div className="mb-3">
              <label htmlFor="productPrice" className="form-label">
                New Price
              </label>
              <input
                type="number"
                className="form-control"
                id="productPrice"
                placeholder="New price"
                value={newProduct.price}
                onChange={(e) => {
                  setNewProduct({ ...newProduct, price: Number(e.target.value) });
                }}
              />
              <div className="invalid-feedback">Please provide a new price.</div>
            </div>

            <div className="mb-3">
              <label htmlFor="productDescription" className="form-label">
                New Description
              </label>
              <textarea
                className="form-control"
                id="productDescription"
                placeholder="New description"
                value={newProduct.description}
                onChange={(e) => {
                  setNewProduct({ ...newProduct, description: e.target.value });
                }}
              ></textarea>
              <div className="invalid-feedback">Please provide a new description.</div>
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
              Update Product
            </button>
          </form>
        </section>
      </main>

      <footer className="text-center mt-5">
        <p>&copy; 2024 Davi Arruda Navarro Albuquerque. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default UpdateComponent;
