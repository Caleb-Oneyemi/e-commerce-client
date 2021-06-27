import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getMerchantDetails, storeMerchantImageUrl } from './api-user';
import Header from '../Header';
import { uploadImage } from '../utils/uploadImage';

export default function Profile() {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    image: '',
  });
  const [files, setFiles] = useState({});
  const history = useHistory();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files as any;
    setFiles(files[0]);
  };

  const handleUpload = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    uploadImage(files, storeMerchantImageUrl, null);
  };

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    getMerchantDetails(signal)
      .then((data) => {
        setUser(data);
      })
      .catch((err) => console.log(err));

    return function cleanup() {
      abortController.abort();
    };
  }, []);

  return (
    <div>
      <Header />
      <div>
        <div>
          <h3>Upload Image</h3>
          <form>
            <div>
              <input type="file" name="file" onChange={handleChange} />
              <button onClick={handleUpload}>Upload</button>
            </div>
          </form>
        </div>
      </div>

      <hr />

      <div>
        <div>
          <div>
            <img src={user?.image} alt="" />
            <p>
              First Name <b>{user?.firstName}</b>
            </p>
            <p>
              Last Name <b>{user?.lastName}</b>
            </p>
            <p>
              Email <b>{user?.email}</b>
            </p>
            <p>
              Phone Number <b>{user?.phoneNumber}</b>
            </p>
          </div>
          <button onClick={() => history.push('/user/edit')}>
            Edit Profile
          </button>
          <button onClick={() => history.push('/user/editpass')}>
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
}
