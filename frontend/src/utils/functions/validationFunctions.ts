import { Dispatch, SetStateAction } from "react";
import { NewProduct } from "../types/productTypes";

export function onlyValidInputs(newProduct:NewProduct, setErrorMessage: Dispatch<SetStateAction<string | null>>){
    // Validate product name length
    if (newProduct.name.length < 3 || newProduct.name.length > 20) {
        setErrorMessage("Product name must be between 3 and 20 characters.");
        return false;
      }
  
      // Validate product description length
      if (newProduct.description.length < 7 || newProduct.description.length > 40) {
        setErrorMessage("Product description must be between 7 and 40 characters.");
        return false;
      }
  
      // Validate product price interval
      if (newProduct.price < 20 || newProduct.price > 100000) {
        setErrorMessage("Product price must be between $20 and $100000");
        return false;
      }

      return true;
}