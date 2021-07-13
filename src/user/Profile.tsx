import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getMerchantDetails, storeMerchantImageUrl } from './api-user';
import Header from '../Header';
import { uploadImage } from '../utils/uploadImage';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import usrImg from '../assets/user.jpeg';

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
        if (data.error) {
          Swal.fire('Error', data.error);
          setTimeout(() => {
            history.push('/signin')
          }, 3000)
        } else {
          setUser(data);
        }
      })
      .catch((err) => Swal.fire('Error', err.message));

    return function cleanup() {
      abortController.abort();
    };
  }, []);

  return (
    <>
      <Header />
      <ProfileWrapper>
        <div className="profile-details">
          <div className="profile-image">
            {user?.image ? <img src={user?.image} alt="" /> : <img src={usrImg} alt="" />}
          </div>

          <div className="forms">
            <label htmlFor="fileInput" className="form-label">
              <i className="icon fa fa-plus"></i>
              <button onClick={handleUpload} className="uploades">
                Upload Picture
              </button>
            </label>
            <input
              type="file"
              name="file"
              id="fileInput"
              style={{ display: 'none' }}
              onChange={handleChange}
            />
          </div>
          <p>
            First Name: <b>{user?.firstName}</b>
          </p>
          <p>
            Last Name: <b>{user?.lastName}</b>
          </p>
          <p>
            Email: <b>{user?.email}</b>
          </p>
          <p>
            Phone Number: <b>{user?.phoneNumber}</b>
          </p>

          <button
            className="profile-btn edit"
            onClick={() => history.push('/user/edit')}
          >
            Edit Profile
          </button>
          <button
            className="profile-btn profile"
            onClick={() => history.push('/user/editpass')}
          >
            Change Password
          </button>
        </div>
      </ProfileWrapper>
    </>
  );
}

const ProfileWrapper = styled.div`
padding: 4rem;
/* width: 50%; */
	/* position: fixed; */
	/* top: 50%;
	left: 50%; */
	/* display: flex; */
	/* transform: translate(-50%, -50%); */

.profile-image{
  width: 100px;
 
}
.uploades{
  margin-left:1rem;
}

.forms{
  margin: .5rem 0 .5rem 0rem;
}


.icon{
  width: 32px;
  height: 32px;
  border: 1px solid black;
  border-radius: 20px;
  //
  display:inline-block;
  padding-left: .5rem;
  line-height: 30px;
}

.profile-image img{
  width: 100%;
  height: 100%;
}

   .profile-details{
    display:inline-block;
    padding:2rem 0 1rem 2rem;
    width: 100%;
    /* height: 500px; */
    /* box-shadow: 1px 1px 2px 1px; */
    
  
    .profile-btn{
      margin:.7rem 0;
      display:block;

      &:hover{

        color: red;
        background-color:#fff;
        border: 1px solid red;
        
      }
    }
`;
