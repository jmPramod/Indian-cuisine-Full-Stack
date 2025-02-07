import React, { useState } from 'react';
import { 
  TextField, 
  Dropdown, 
  IDropdownOption, 
  PrimaryButton,
  Stack,
  StackItem,
  MessageBar,
  MessageBarType 
} from '@fluentui/react';
import axios from 'axios';
import FooterComponent from '../../components/Footer/Footer';

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
  img: string;
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
    img: ''
  });

  const [ingredientInput, setIngredientInput] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

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
      // Basic validation
      if (!formData.name || !formData.diet || !formData.course) {
        setError('Please fill in all required fields');
        return;
      }

      const response = await axios.post('/api/foods', {
        ...formData,
        createdBy: "user-id-here" // Replace with actual user ID
      });

      if (response.status === 201) {
        setSuccess(true);
        setError('');
        // Reset form
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
          img: ''
        });
      }
    } catch (err) {
      setError('Error submitting form. Please try again.');
      setSuccess(false);
    }
  };

  return (<>
  
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
      </Stack>

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

      <Stack horizontal tokens={{ childrenGap: 20 }}>
        <TextField
          label="State"
          value={formData.state}
          onChange={(_, val) => handleInputChange('state', val || '')}
        />
        <TextField
          label="Region"
          value={formData.region}
          onChange={(_, val) => handleInputChange('region', val || '')}
        />
      </Stack>

      <TextField
        label="Image URL"
        value={formData.img}
        onChange={(_, val) => handleInputChange('img', val || '')}
      />

      <PrimaryButton text="Submit" onClick={handleSubmit} style={{ marginTop: 20 }} />
    </Stack>
  </Stack>
  <FooterComponent/>
  </>
  );
};

export default CreateFood;