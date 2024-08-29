"use client"; // Indicates that this file is a client-side component in Next.js

// Import necessary libraries and modules
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Product, NewProduct } from "@/utils/types/productTypes";
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap CSS for styling
import { ENDPOINT, PASSWORD } from "@/utils/constants/environmentConstants"; // Environment constants
import { onlyValidInputs } from "@/utils/functions/validationFunctions";

// HomePage component - Main component for managing products
function HomePage(): JSX.Element {
  // State hooks for managing product data, form inputs, and messages
  const [products, setProducts] = useState<Product[]>(); // List of products
  const [newProduct, setNewProduct] = useState<NewProduct>({
    name: "",
    description: "",
    price: 0,
    isAvailable: false,
  }); // Form data for new product
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Error message
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // Success message

  const router = useRouter(); // Router for navigation

  // useEffect to fetch products on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Fetch products from the server
        const response = await axios.get(ENDPOINT, {
          headers: {
            Authorization: PASSWORD,
          },
        });
        setProducts(response.data.products); // Update state with fetched products
      } catch (error) {
        setErrorMessage("Error fetching products. Please try again later.");
        console.error("Error fetching products:", error); // Log error to console
      }
    };

    fetchProducts(); // Call the fetch function
  }, []); // Empty dependency array to run only on mount

  // Function to add a new product
  async function addProduct(): Promise<void> {

    if(!onlyValidInputs(newProduct, setErrorMessage)){
      return 
    }
    
    try {
      // Send a POST request to add the new product
      await axios.post(ENDPOINT, newProduct, {
        headers: {
          Authorization: PASSWORD,
        },
      });
      setSuccessMessage("Product added successfully! Please, refresh the page");
      setErrorMessage(null); // Clear error message on success
    } catch (error) {
      setErrorMessage("Error adding product. Please try again.");
      setSuccessMessage(null); // Clear success message on error
      console.log(error); // Log error to console
    }
  }

  // Function to navigate to the update page for a specific product
  function updateProduct(productId: string) {
    router.push(`/update/${productId}`); // Navigate to the update page with product ID
  }

  // Function to delete a product
  async function deleteProduct(productId: string) {
    try {
      // Send a DELETE request to remove the product
      await axios.delete(`${ENDPOINT}/${productId}`, {
        headers: {
          Authorization: PASSWORD,
        },
      });
      // Update state to remove the deleted product from the list
      setProducts((prevProducts) =>
        prevProducts?.filter((product) => product._id !== productId)
      );
      setSuccessMessage("Product deleted successfully!");
      setErrorMessage(null); // Clear error message on success
    } catch (error) {
      setErrorMessage("Error deleting product. Please try again.");
      setSuccessMessage(null); // Clear success message on error
      console.log(error); // Log error to console
    }
  }

  return (
    <div className="container my-5">
      <header className="mb-4">
        <h1 className="text-center">Product Management</h1> {/* Page title */}
      </header>

      <main>
        <section className="mb-5">
          <h2>Add a New Product</h2>
          {/* Display error or success messages */}
          {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
          {successMessage && <div className="alert alert-success">{successMessage}</div>}
          <form
            onSubmit={(e) => {
              e.preventDefault(); // Prevent default form submission
              addProduct(); // Call addProduct on form submission
            }}
            className="needs-validation"
            noValidate
          >
            {/* Product Name Input */}
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
                  setNewProduct({ ...newProduct, name: e.target.value }); // Update product name state
                }}
                required
              />
              <div className="invalid-feedback">Please provide a product name.</div>
            </div>

            {/* Product Price Input */}
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
                  setNewProduct({ ...newProduct, price: Number(e.target.value) }); // Update product price state
                }}
                required
              />
              <div className="invalid-feedback">Please provide a price.</div>
            </div>

            {/* Product Description Input */}
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
                  setNewProduct({ ...newProduct, description: e.target.value }); // Update product description state
                }}
                required
              ></textarea>
              <div className="invalid-feedback">Please provide a description.</div>
            </div>

            {/* Product Availability Checkbox */}
            <div className="form-check mb-3">
              <input
                className="form-check-input"
                type="checkbox"
                id="isAvailable"
                checked={newProduct.isAvailable}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    isAvailable: e.target.checked, // Update product availability state
                  })
                }
              />
              <label className="form-check-label" htmlFor="isAvailable">
                Available
              </label>
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn btn-primary">
              Add Product
            </button>
          </form>
        </section>

        <section>
          <h2>Product List</h2>
          {/* Display product list or message if no products available */}
          {products?.length ? (
            <ul className="list-group">
              {products.map((product) => (
                <li
                  key={product._id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <div>
                    <strong>{product.name}</strong> - {product.description} - ${product.price} -{" "}
                    {product.isAvailable ? (
                      <span className="badge bg-success">Available</span>
                    ) : (
                      <span className="badge bg-danger">Unavailable</span>
                    )}
                  </div>
                  <div>
                    {/* Buttons to update or delete a product */}
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
            <p>No products available.</p> // Message if no products are available
          )}
        </section>
      </main>

      <footer className="text-center mt-5">
        <p>&copy; 2024 Davi Arruda Navarro Albuquerque. All rights reserved.</p> {/* Footer */}
      </footer>
    </div>
  );
}

export default HomePage; // Export HomePage component as default
