import React, { useEffect, useState } from 'react';
import { 
  TextField, 
  Dropdown, 
  IDropdownOption, 
  PrimaryButton,
  Stack,
  StackItem,
  MessageBar,
  MessageBarType,
  Modal
} from '@fluentui/react';
import FooterComponent from '../../components/Footer/Footer';
import { createFood } from '../../utils/API.services';
import { GlobalContext } from '../../Context/GlobalContext';
import { useNavigate } from 'react-router-dom';

const regionOptions: IDropdownOption[] = [
  { key: 'Central', text: 'Central' },
  { key: 'East', text: 'East' },
  { key: 'North', text: 'North' },
  { key: 'North East', text: 'North East' },
  { key: 'South', text: 'South' },
  { key: 'West', text: 'West' },
];

const stateOptions: IDropdownOption[] = [
  { key: 'Andhra Pradesh', text: 'Andhra Pradesh' },
  { key: 'Assam', text: 'Assam' },
  { key: 'Bihar', text: 'Bihar' },
  { key: 'Chhattisgarh', text: 'Chhattisgarh' },
  { key: 'Goa', text: 'Goa' },
  { key: 'Gujarat', text: 'Gujarat' },
  { key: 'Haryana', text: 'Haryana' },
  { key: 'Jammu & Kashmir', text: 'Jammu & Kashmir' },
  { key: 'Karnataka', text: 'Karnataka' },
  { key: 'Kerala', text: 'Kerala' },
  { key: 'Madhya Pradesh', text: 'Madhya Pradesh' },
  { key: 'Maharashtra', text: 'Maharashtra' },
  { key: 'Manipur', text: 'Manipur' },
  { key: 'NCT of Delhi', text: 'NCT of Delhi' },
  { key: 'Nagaland', text: 'Nagaland' },
  { key: 'Odisha', text: 'Odisha' },
  { key: 'Punjab', text: 'Punjab' },
  { key: 'Rajasthan', text: 'Rajasthan' },
  { key: 'Tamil Nadu', text: 'Tamil Nadu' },
  { key: 'Telangana', text: 'Telangana' },
  { key: 'Tripura', text: 'Tripura' },
  { key: 'Uttar Pradesh', text: 'Uttar Pradesh' },
  { key: 'Uttarakhand', text: 'Uttarakhand' },
  { key: 'West Bengal', text: 'West Bengal' },
];

interface IFoodForm {
  name: string;
  ingredients: string[];
  diet: string;
  prep_time: number;
  cook_time: number;
  flavor_profile: string;
  course: string;
  state: string;
  region: string;
}

const dietOptions: IDropdownOption[] = [
  { key: 'vegetarian', text: 'Vegetarian' },
  { key: 'non-vegetarian', text: 'Non-Vegetarian' },
];

const flavorProfileOptions: IDropdownOption[] = [
  { key: 'spicy', text: 'Spicy' },
  { key: 'sweet', text: 'Sweet' },
  { key: 'savory', text: 'Savory' },
  { key: 'bitter', text: 'Bitter' },
];

const courseOptions: IDropdownOption[] = [
  { key: 'main course', text: 'Main Course' },
  { key: 'side dish', text: 'Side Dish' },
  { key: 'dessert', text: 'Dessert' },
  { key: 'snack', text: 'Snack' },
];

const CreateFood: React.FC = () => {
  const navigate = useNavigate();
  const { user } = React.useContext(GlobalContext);
  const [previewImage, setPreviewImage] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [formData, setFormData] = useState<IFoodForm>({
    name: '',
    ingredients: [],
    diet: '',
    prep_time: 0,
    cook_time: 0,
    flavor_profile: '',
    course: '',
    state: '',
    region: '',
  });

  const [ingredientInput, setIngredientInput] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setPreviewImage(URL.createObjectURL(file));  
    }
  };

  const handleInputChange = (field: keyof IFoodForm, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddIngredient = () => {
    if (ingredientInput.trim()) {
      setFormData(prev => ({
        ...prev,
        ingredients: [...prev.ingredients, ingredientInput.trim()]
      }));
      setIngredientInput('');
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const data = new FormData();
      data.append("name", formData.name);
      data.append("diet", formData.diet);
      data.append("course", formData.course);
      data.append("prep_time", formData.prep_time.toString());
      data.append("cook_time", formData.cook_time.toString());
      data.append("flavor_profile", formData.flavor_profile);
      data.append("state", formData.state);
      data.append("region", formData.region);
      formData.ingredients.forEach((ingredient, index) => {
        data.append(`ingredients[${index}]`, ingredient);
      });
      if (selectedImage) {
        data.append("image", selectedImage);
      }

      if (!formData.name || !formData.diet || !formData.course) {
        setError('Please fill in all required fields');
        return;
      }

      const response = await createFood(data);

      if (response.status === 200) {
        setSuccess(true);
        setError('');
        setFormData({
          name: '',
          ingredients: [],
          diet: '',
          prep_time: 0,
          cook_time: 0,
          flavor_profile: '',
          course: '',
          state: '',
          region: '',
        });
        setSelectedImage(null);
        setPreviewImage('');
      }
      setLoading(false);
    } catch (err) {
      setLoading(true);
      setError('Error submitting form. Please try again.');
      setSuccess(false);
      setLoading(false);
    }
  };
const dropdownStyles = {
    dropdown: { 
      minWidth: 300,
      width: '100%' 
    }
  };
  useEffect(() => {
    console.log("one",user);
    if (user&&(Object.keys(user).length > 0) && user.isAdmin === "admin") {
      console.log("one");
      
      setIsAdmin(true);
      setShowModal(false);
    } else if (user&&(Object.keys(user).length > 0) && user.isAdmin !== "admin") {
      console.log("one1");
      setShowModal(true); 
    } else if (Object.keys(user).length == 0) {
      console.log("one2");
      setShowModal(true); 
    }  
  }, [user]);

  return (
    <>
      {isAdmin ? (
        <Stack tokens={{ childrenGap: 20, padding: 20 }}>
          <h1>Create New Food Item</h1>
          
          {error && (
            <MessageBar messageBarType={MessageBarType.error} onDismiss={() => setError('')}>
              {error}
            </MessageBar>
          )}
          
          {success && (
            <MessageBar messageBarType={MessageBarType.success} onDismiss={() => setSuccess(false)}>
              Food item created successfully!
            </MessageBar>
          )}

          <Stack tokens={{ childrenGap: 10 }}>
            <TextField
              label="Name"
              required
              value={formData.name}
              onChange={(_, val) => handleInputChange('name', val || '')}
            />

            <StackItem>
              <TextField
                label="Ingredients"
                value={ingredientInput}
                onChange={(_, val) => setIngredientInput(val || '')}
                onKeyPress={e => e.key === 'Enter' && handleAddIngredient()}
                description="Type an ingredient and press Enter to add"
              />
              <div style={{ marginTop: 5 }}>
                {formData.ingredients.map((ingredient, index) => (
                  <span key={index} style={{ marginRight: 5, padding: '2px 5px', background: '#eee' }}>
                    {ingredient}
                  </span>
                ))}
              </div>
            </StackItem>

            <Dropdown
              label="Diet"
              required
              options={dietOptions}
              selectedKey={formData.diet}
              onChange={(_, option) => handleInputChange('diet', option?.key.toString() || '')}
            />

            <Stack horizontal tokens={{ childrenGap: 20 }}>
              <TextField
                label="Prep Time (minutes)"
                type="number"
                value={formData.prep_time.toString()}
                onChange={(_, val) => handleInputChange('prep_time', Number(val))}
              />
              <TextField
                label="Cook Time (minutes)"
                type="number"
                value={formData.cook_time.toString()}
                onChange={(_, val) => handleInputChange('cook_time', Number(val))}
              />
              <input type="file" accept="image/*" onChange={handleImageChange} />
            </Stack>

            {previewImage && (
              <div>
                <img src={previewImage} alt="Preview" style={{ maxWidth: '100px', height: 'auto', marginTop: 10 }} />
              </div>
            )}

            <Dropdown
              label="Flavor Profile"
              options={flavorProfileOptions}
              selectedKey={formData.flavor_profile}
              onChange={(_, option) => handleInputChange('flavor_profile', option?.key.toString() || '')}
            />

            <Dropdown
              label="Course"
              required
              options={courseOptions}
              selectedKey={formData.course}
              onChange={(_, option) => handleInputChange('course', option?.key.toString() || '')}
            />

            <Stack horizontal tokens={{ childrenGap: 20 }} style={{width:"100%"}}>
              <Dropdown
                label="State"
                
                styles={dropdownStyles}
                options={stateOptions}
                selectedKey={formData.state}
                onChange={(_, option) => handleInputChange('state', option?.key.toString() || '')}
              />
              <Dropdown
                label="Region"
                options={regionOptions}
                styles={dropdownStyles}
                selectedKey={formData.region}
                onChange={(_, option) => handleInputChange('region', option?.key.toString() || '')}
              />
            </Stack>

            <PrimaryButton text={loading ? "Submitting...." : "Submit"} disabled={loading} onClick={handleSubmit} style={{ marginTop: 20 }} />
          </Stack>
        </Stack>
      ) : (
        <Modal
          isOpen={showModal}
          isBlocking={true} 
          onDismiss={() => setShowModal(false)}
        >
          <div style={{ padding: 20 }}>
            <h2>Access Denied</h2>
            <p>
              {user &&Object.keys(user).length > 0  && user.isAdmin !== "admin" ? (
                <p>
                  You do not have permission to access this page. <u onClick={() => navigate("/")} style={{ cursor: "pointer", color: "blue" }}>Go Home</u>
                </p>
              ) : user &&Object.keys(user).length ==0? (
                <div>
                  <p>Please log in to access this page. <u onClick={() => navigate("/login")} style={{ cursor: "pointer", color: "blue" }}>Login</u></p>
                </div>
              ) : ""}
            </p>
          </div>
        </Modal>
      )}
      <FooterComponent />
    </>
  );
};

export default CreateFood;