import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import {
  getProductsByStoreId,
  removeProduct,
  IProduct,
  storeProductImageUrl,
} from '../product/api-product';
import { uploadImage } from '../utils/uploadImage';

const ProductListStyle = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
`;

export default function Products({ storeId }: { storeId: string }) {
  const history = useHistory();
  const [products, setProducts] = useState([]);

  const handleProductDelete = async (productId: string, name: string) => {
    try {
      let options = {
        title: 'Are you sure you want to delete this product?',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'Delete',
        denyButtonText: 'Cancel',
      };

      Swal.fire(options).then(async (result) => {
        if (result.isConfirmed) {
          const newProducts = products.filter(
            (p: IProduct) => p._id !== productId
          );
          await removeProduct(productId);
          Swal.fire('Product Deleted Successfully', '', 'success');
          setProducts(newProducts);
        } else if (result.isDenied) {
          Swal.fire({
            icon: 'success',
            text: `${name} is safe`,
          });
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  const [files, setFiles] = useState({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files as any;
    setFiles(files[0]);
  };

  const handleUpload = async (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    e.preventDefault();
    uploadImage(files, storeProductImageUrl, id);
  };

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    getProductsByStoreId(storeId, signal)
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => {
        console.log(err);
      });

    return function cleanup() {
      abortController.abort();
    };
  }, [storeId]);

  return (
    <div>
      <ProductListStyle>
        {products?.map((product: IProduct) => (
          <div key={product._id}>
            <img src={product?.image} alt="" height="100px" width="150px" />
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>
              {product.quantity} {product.quantity > 1 ? 'units' : 'unit'} left
            </p>
            <p>{product.price} Naira per unit</p>

            <div>
              <h3>Upload Store Image</h3>
              <form>
                <div>
                  <input type="file" name="file" onChange={handleChange} />
                  <button
                    onClick={(e) => handleUpload(e, product?._id as string)}
                  >
                    Upload
                  </button>
                </div>
              </form>
            </div>

            <div>
              <button
                onClick={() => history.push(`/products/edit/${product._id}`)}
              >
                Edit
              </button>
              <button
                onClick={() =>
                  handleProductDelete(product._id as string, product.name)
                }
              >
                Delete
              </button>
            </div>
            <hr />
          </div>
        ))}
      </ProductListStyle>
    </div>
  );
}
