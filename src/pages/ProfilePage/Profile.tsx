import React, { useState, useContext, useEffect } from 'react';
import { 
  TextField, 
  PrimaryButton, 
  Stack,
  Persona,
  PersonaSize,
  mergeStyles,
  Dialog,
  DialogType,
  DialogFooter
} from '@fluentui/react';
import { GlobalContext } from '../../Context/GlobalContext';
import { userUpdate } from '../../utils/API.services';
import FooterComponent from '../../components/Footer/Footer';
import { useNavigate } from 'react-router-dom';

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: number;
  address: string;
  state: string;
  country: string;
  pinCode: number;
  profileImage: {
    imageUrl: string;
    imgPublicId: string | null;
  };
}

const Profile = () => {
  const { setUser, user } = useContext(GlobalContext);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState(user?.profileImage?.imageUrl || '');
  const [loading, setLoading] = useState(false);
const navigate=useNavigate()
  const [updateUser, setUpdateUser] = useState<User>(
    user || {
      _id: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: 0,
      address: '',
      state: '',
      country: '',
      pinCode: 0,
      profileImage: {
        imageUrl: '',
        imgPublicId: null,
      },
    }
  );

  useEffect(() => {
    if (user && Object.keys(user).length > 0) {
      setUpdateUser(user);
    }
  }, [user]);

  // Handle input changes safely
  const handleInputChange = (field: keyof User) => 
    (_: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
      setUpdateUser((prev) => ({
        ...prev!,
        [field]: newValue || ''
      }));
    };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setPreviewImage(URL.createObjectURL(file)); // Show preview before upload
    }
  };

  const handleSave = async () => {
    setLoading(true);
    console.log('Saving updateUser:', updateUser);

    const formData = new FormData();
    formData.append("firstName", updateUser?.firstName || '');
    formData.append("lastName", updateUser?.lastName || '');
    formData.append("phone", updateUser?.phone?.toString() || '');
    formData.append("address", updateUser?.address || '');
    formData.append("state", updateUser?.state || '');
    formData.append("country", updateUser?.country || '');
    formData.append("pinCode", updateUser?.pinCode?.toString() || '');

    if (selectedImage) {
      formData.append("file", selectedImage);
    }

    try {
      const response = await userUpdate(formData);
      if (response.status === 200) {
        setUser(response.data);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data));
        localStorage.setItem("userType", response.data.isAdmin);

        setPreviewImage(response.data.profileImage.imageUrl);
        setSelectedImage(null);
      }
    } catch (error) {
      console.error("Update failed:", error);
    }

    setLoading(false);
    setIsEditing(false);
  };

  const containerClass = mergeStyles({
    maxWidth: 800,
    margin: '0 auto',
    padding: 20,
  });

  const dialogContentProps = {
    type: DialogType.normal,
    title: 'Login Required',
    closeButtonAriaLabel: 'Close',
    subText: 'Please login to access your profile.',
  };

  return (
    <>
      <div className={containerClass}>
        {Object.keys(user || {}).length > 0 ? (
          <Stack tokens={{ childrenGap: 20 }}>
            <Persona
              imageUrl={previewImage || updateUser?.profileImage.imageUrl}
              text={`${updateUser?.firstName || ''} ${updateUser?.lastName || ''}`}
              secondaryText={updateUser?.email || ''}
              size={PersonaSize.size72}
              imageAlt="Profile image"
            />

            {isEditing && (
              <input type="file" accept="image/*" onChange={handleImageChange} />
            )}

            <Stack horizontal tokens={{ childrenGap: 20 }}>
              <TextField label="First Name" value={updateUser?.firstName || ''} onChange={handleInputChange('firstName')} disabled={!isEditing} styles={{ root: { flex: 1 } }} />
              <TextField label="Last Name" value={updateUser?.lastName || ''} onChange={handleInputChange('lastName')} disabled={!isEditing} styles={{ root: { flex: 1 } }} />
            </Stack>

            <Stack horizontal tokens={{ childrenGap: 20 }}>
              <TextField label="Email" value={updateUser?.email || ''} disabled type="email" styles={{ root: { flex: 1 } }} />
              <TextField label="Phone" value={updateUser?.phone?.toString() || ''} onChange={handleInputChange('phone')} disabled={!isEditing} type="tel" styles={{ root: { flex: 1 } }} />
            </Stack>

            <TextField label="Address" value={updateUser?.address || ''} onChange={handleInputChange('address')} disabled={!isEditing} multiline rows={3} />

            <Stack horizontal tokens={{ childrenGap: 20 }}>
              <TextField label="State" value={updateUser?.state || ''} onChange={handleInputChange('state')} disabled={!isEditing} styles={{ root: { flex: 1 } }} />
              <TextField label="Country" value={updateUser?.country || ''} onChange={handleInputChange('country')} disabled={!isEditing} styles={{ root: { flex: 1 } }} />
              <TextField label="PIN Code" value={updateUser?.pinCode?.toString() || ''} onChange={handleInputChange('pinCode')} disabled={!isEditing} styles={{ root: { flex: 1 } }} />
            </Stack>

            {isEditing ? (
              <PrimaryButton text={loading ? "Saving..." : "Save Changes"} onClick={handleSave} disabled={loading} styles={{ root: { maxWidth: 200, marginTop: 20 } }} />
            ) : (
              <PrimaryButton text="Edit Profile" onClick={() => setIsEditing(true)} styles={{ root: { maxWidth: 200, marginTop: 20 } }} />
            )}
          </Stack>
        ) : (
          <Dialog
            hidden={Object.keys(user || {}).length > 0}
            dialogContentProps={dialogContentProps}
            modalProps={{
              isBlocking: true, 
            }}
          >
            <DialogFooter>
              <PrimaryButton text="Click To Login" onClick={() => {navigate("/login")}}  /> Disabled close button
            </DialogFooter>
          </Dialog>
        )}
      </div>
      <FooterComponent />
    </>
  );
};

export default Profile;