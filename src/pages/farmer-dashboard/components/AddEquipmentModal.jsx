import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { equipmentService } from '../../../services/equipmentService';
import { storageService } from '../../../services/storageService';

const AddEquipmentModal = ({ isOpen, onClose, onSuccess }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category_id: '',
    brand: '',
    model: '',
    year_manufactured: '',
    condition: 'good',
    price_per_day: '',
    deposit_amount: '',
    address: '',
    city: '',
    state: '',
    features: [],
    delivery_available: false,
    delivery_radius: '',
    delivery_charge: '',
    insurance_required: true,
    operator_provided: false
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      loadCategories();
    }
  }, [isOpen]);

  const loadCategories = async () => {
    const { data } = await equipmentService.getCategories();
    if (data) {
      setCategories(data);
    }
  };

  const handleInputChange = (field, e) => {
    const value = e?.target?.value;
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter(file => {
      const validation = storageService.validateFile(file);
      return validation.isValid;
    });

    if (validFiles.length !== files.length) {
      alert('Some files were rejected. Please ensure images are under 10MB and in valid formats.');
    }

    setImages(prev => [...prev, ...validFiles]);

    // Create previews
    validFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreviews(prev => [...prev, e.target.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const addFeature = (feature) => {
    if (feature.trim() && !formData.features.includes(feature.trim())) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, feature.trim()]
      }));
    }
  };

  const removeFeature = (feature) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter(f => f !== feature)
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name || !formData.name.trim()) newErrors.name = 'Equipment name is required';
    if (!formData.description || !formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.category_id) newErrors.category_id = 'Category is required';
    if (!formData.price_per_day || formData.price_per_day <= 0) newErrors.price_per_day = 'Valid daily price is required';
    if (!formData.address || !formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city || !formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state || !formData.state.trim()) newErrors.state = 'State is required';
    if (formData.year_manufactured && (formData.year_manufactured < 1900 || formData.year_manufactured > new Date().getFullYear())) {
      newErrors.year_manufactured = 'Enter a valid year';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      // Upload images first
      let imageUrls = [];
      if (images.length > 0) {
        const tempId = `temp-${Date.now()}`;
        const uploadResult = await storageService.uploadEquipmentImages(images, tempId);
        if (uploadResult.data?.urls) {
          imageUrls = uploadResult.data.urls;
        }
      }

      // Prepare equipment data
      const equipmentData = {
        owner_id: user.id,
        category_id: formData.category_id,
        name: formData.name.trim(),
        description: formData.description.trim(),
        brand: formData.brand.trim() || null,
        model: formData.model.trim() || null,
        year_manufactured: formData.year_manufactured ? parseInt(formData.year_manufactured) : null,
        condition: formData.condition,
        price_per_day: parseFloat(formData.price_per_day),
        deposit_amount: formData.deposit_amount ? parseFloat(formData.deposit_amount) : null,
        location: {
          address: formData.address.trim(),
          city: formData.city.trim(),
          state: formData.state.trim(),
          coordinates: [0, 0] // Could be enhanced with geocoding
        },
        features: formData.features,
        images: imageUrls,
        delivery_available: formData.delivery_available,
        delivery_radius: formData.delivery_radius ? parseFloat(formData.delivery_radius) : null,
        delivery_charge: formData.delivery_charge ? parseFloat(formData.delivery_charge) : null,
        insurance_required: formData.insurance_required,
        operator_provided: formData.operator_provided
      };

      const { data, error } = await equipmentService.createEquipment(equipmentData);

      if (error) throw error;

      // Success
      alert('Equipment added successfully!');
      onSuccess && onSuccess(data);
      handleClose();

    } catch (error) {
      console.error('Error adding equipment:', error);
      alert('Failed to add equipment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      name: '',
      description: '',
      category_id: '',
      brand: '',
      model: '',
      year_manufactured: '',
      condition: 'good',
      price_per_day: '',
      deposit_amount: '',
      address: '',
      city: '',
      state: '',
      features: [],
      delivery_available: false,
      delivery_radius: '',
      delivery_charge: '',
      insurance_required: true,
      operator_provided: false
    });
    setImages([]);
    setImagePreviews([]);
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg shadow-organic-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">Add New Equipment</h2>
          <Button variant="ghost" size="sm" onClick={handleClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">Basic Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Input
                  label="Equipment Name *"
                  value={formData.name}
                  onChange={(value) => handleInputChange('name', value)}
                  error={errors.name}
                  placeholder="e.g., John Deere Tractor"
                />
              </div>

              <div>
                <Select
                  label="Category *"
                  value={formData.category_id}
                  onChange={(value) => handleInputChange('category_id', value)}
                  error={errors.category_id}
                  options={categories.map(cat => ({ value: cat.id, label: cat.name }))}
                  placeholder="Select category"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Description *</label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className={`w-full h-24 p-3 bg-muted rounded-lg border-0 focus:ring-2 focus:ring-primary/20 resize-none text-foreground placeholder-muted-foreground ${errors.description ? 'ring-2 ring-destructive/20' : ''}`}
                placeholder="Describe your equipment, its condition, and any special features..."
              />
              {errors.description && <p className="text-sm text-destructive mt-1">{errors.description}</p>}
            </div>
          </div>

          {/* Specifications */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">Specifications</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                label="Brand"
                value={formData.brand}
                onChange={(value) => handleInputChange('brand', value)}
                placeholder="e.g., John Deere"
              />

              <Input
                label="Model"
                value={formData.model}
                onChange={(value) => handleInputChange('model', value)}
                placeholder="e.g., 5050D"
              />

              <Input
                label="Year Manufactured"
                type="number"
                value={formData.year_manufactured}
                onChange={(value) => handleInputChange('year_manufactured', value)}
                error={errors.year_manufactured}
                placeholder="e.g., 2020"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Condition *"
                value={formData.condition}
                onChange={(value) => handleInputChange('condition', value)}
                options={[
                  { value: 'excellent', label: 'Excellent' },
                  { value: 'good', label: 'Good' },
                  { value: 'fair', label: 'Fair' },
                  { value: 'needs_repair', label: 'Needs Repair' }
                ]}
              />

              <div></div>
            </div>
          </div>

          {/* Pricing */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">Pricing</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Price per Day (₹) *"
                type="number"
                value={formData.price_per_day}
                onChange={(value) => handleInputChange('price_per_day', value)}
                error={errors.price_per_day}
                placeholder="1200"
              />

              <Input
                label="Deposit Amount (₹)"
                type="number"
                value={formData.deposit_amount}
                onChange={(value) => handleInputChange('deposit_amount', value)}
                placeholder="5000"
              />
            </div>
          </div>

          {/* Location */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">Location</h3>

            <div>
              <Input
                label="Address *"
                value={formData.address}
                onChange={(value) => handleInputChange('address', value)}
                error={errors.address}
                placeholder="Street address"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="City *"
                value={formData.city}
                onChange={(value) => handleInputChange('city', value)}
                error={errors.city}
                placeholder="Bangalore"
              />

              <Input
                label="State *"
                value={formData.state}
                onChange={(value) => handleInputChange('state', value)}
                error={errors.state}
                placeholder="Karnataka"
              />
            </div>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">Features</h3>

            <div className="flex flex-wrap gap-2 mb-2">
              {formData.features.map((feature, index) => (
                <span key={index} className="inline-flex items-center space-x-1 px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                  <span>{feature}</span>
                  <button type="button" onClick={() => removeFeature(feature)} className="hover:text-primary/70">
                    <Icon name="X" size={12} />
                  </button>
                </span>
              ))}
            </div>

            <div className="flex space-x-2">
              <Input
                placeholder="Add feature (e.g., GPS Navigation)"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addFeature(e.target.value);
                    e.target.value = '';
                  }
                }}
              />
              <Button type="button" variant="outline" onClick={(e) => {
                const input = e.target.previousElementSibling;
                addFeature(input.value);
                input.value = '';
              }}>
                Add
              </Button>
            </div>
          </div>

          {/* Images */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">Images</h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {imagePreviews.map((preview, index) => (
                <div key={index} className="relative">
                  <img src={preview} alt={`Preview ${index + 1}`} className="w-full h-24 object-cover rounded-lg" />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1 hover:bg-black/70"
                  >
                    <Icon name="X" size={12} />
                  </button>
                </div>
              ))}

              <label className="w-full h-24 border-2 border-dashed border-muted-foreground/25 rounded-lg flex items-center justify-center cursor-pointer hover:border-primary/50 transition-colors">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <div className="text-center">
                  <Icon name="Plus" size={24} className="text-muted-foreground mx-auto mb-1" />
                  <p className="text-sm text-muted-foreground">Add Images</p>
                </div>
              </label>
            </div>
          </div>

          {/* Additional Options */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">Additional Options</h3>

            <div className="space-y-3">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.delivery_available}
                  onChange={(e) => handleInputChange('delivery_available', e.target.checked)}
                  className="rounded"
                />
                <span className="text-sm">Delivery available</span>
              </label>

              {formData.delivery_available && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-6">
                  <Input
                    label="Delivery Radius (km)"
                    type="number"
                    value={formData.delivery_radius}
                    onChange={(value) => handleInputChange('delivery_radius', value)}
                    placeholder="50"
                  />

                  <Input
                    label="Delivery Charge (₹)"
                    type="number"
                    value={formData.delivery_charge}
                    onChange={(value) => handleInputChange('delivery_charge', value)}
                    placeholder="500"
                  />
                </div>
              )}

              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.insurance_required}
                  onChange={(e) => handleInputChange('insurance_required', e.target.checked)}
                  className="rounded"
                />
                <span className="text-sm">Insurance required</span>
              </label>

              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.operator_provided}
                  onChange={(e) => handleInputChange('operator_provided', e.target.checked)}
                  className="rounded"
                />
                <span className="text-sm">Operator provided</span>
              </label>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-border">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" variant="default" disabled={loading}>
              {loading ? 'Adding Equipment...' : 'Add Equipment'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEquipmentModal;
