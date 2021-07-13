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
import productImg from '../assets/prod.jpeg';

const ProductListStyle = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;

  .products {
    margin: 1rem 0;
    box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.05);
    width: 75%;
  }

  .img-product {
    height: 12.5em;
  }

  .img-product img {
    width: 100%;
    height: 100%;
  }

  .details {
    padding: 1rem;
  }

  .btn {
    margin: 0.5rem;
  }
  .error {
    padding: 1rem;
    color: red;
    font-style: italic;
  }

  @media screen and (max-width: 767px) {
    grid-template-columns: 1fr;
  }
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
          <div className='products' key={product._id}>
            <div className="img-product">
              {product?.image ? 
                <img src={product?.image} alt="" height="100px" width="150px" /> 
                : <img src={productImg} height="100px" width="150px" />
              }
            </div>

            <div>
              <label htmlFor="fileInput" className="form-label">
                <i className="icon fa fa-plus" style={{marginLeft: '1em'}}></i>
              </label>
              <input type="file" name="file" onChange={handleChange} id='fileInput' style={{display: 'none'}} />
              <button
                onClick={(e) => handleUpload(e, product?._id as string)}
              >
                Upload
              </button>
            </div>
            
            <div className='details'>
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <p>
                {product.quantity} {product.quantity > 1 ? 'units' : 'unit'} left
              </p>
              <p>{product.price} Naira per unit</p>
            </div>

            <div className='flex'>
              <button
                className='pad-btn'
                onClick={() => history.push(`/products/edit/${product._id}`)}
              >
                Edit
              </button>
              <button
                className='pad-btn'
                onClick={() =>
                  handleProductDelete(product._id as string, product.name)
                }
              >
                Delete
              </button>
            </div>

            
          </div>
        ))}
      </ProductListStyle>
    </div>
  );
}