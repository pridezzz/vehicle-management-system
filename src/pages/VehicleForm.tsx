import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import toast from 'react-hot-toast';
import { 
  useGetModelQuery, 
  useGetMakesQuery, 
  useCreateModelMutation, 
  useUpdateModelMutation 
} from '../api';
import { validationUtils } from '../utils';

interface VehicleFormData {
  name: string;
  abrv: string;
  makeId: number;
}

const VehicleForm: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const modelId = id ? parseInt(id) : undefined;

  const { data: model, isLoading: modelLoading } = useGetModelQuery(modelId!, {
    skip: !isEdit,
  });
  const { data: makes = [], isLoading: makesLoading } = useGetMakesQuery();
  const [createModel, { isLoading: creating }] = useCreateModelMutation();
  const [updateModel, { isLoading: updating }] = useUpdateModelMutation();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<VehicleFormData>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      abrv: '',
      makeId: 0,
    },
  });

  useEffect(() => {
    if (isEdit && model) {
      reset({
        name: model.name,
        abrv: model.abrv,
        makeId: model.makeId,
      });
    }
  }, [isEdit, model, reset]);

  const onSubmit = async (data: VehicleFormData) => {
    const actionText = isEdit ? 'Updating' : 'Creating';
    const loadingToast = toast.loading(`${actionText} vehicle model...`);
    
    try {
      if (isEdit && modelId) {
        const result = await updateModel({ id: modelId, data }).unwrap();
        toast.success(`"${result.name}" updated successfully`, { id: loadingToast });
      } else {
        const result = await createModel(data).unwrap();
        toast.success(`"${result.name}" created successfully`, { id: loadingToast });
      }
      navigate('/');
    } catch (error) {
      console.error('Failed to save model:', error);
      const errorMessage = (error as any)?.message || 'Failed to save model. Please try again.';
      toast.error(errorMessage, { id: loadingToast });
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  if (modelLoading || makesLoading) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <p>Loading...</p>
      </div>
    );
  }

  if (isEdit && !model) {
    return (
      <div style={{ textAlign: 'center', padding: '40px', color: 'red' }}>
        <p>Vehicle model not found.</p>
        <button
          onClick={handleCancel}
          style={{
            padding: '8px 16px',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Go Back
        </button>
      </div>
    );
  }

  const formStyle = {
    maxWidth: '500px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
  };

  const fieldStyle = {
    marginBottom: '20px',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold' as const,
    fontSize: '14px',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px',
    boxSizing: 'border-box' as const,
  };

  const errorInputStyle = {
    ...inputStyle,
    borderColor: '#dc3545',
  };

  const errorStyle = {
    color: '#dc3545',
    fontSize: '12px',
    marginTop: '5px',
  };

  const buttonStyle = {
    padding: '10px 20px',
    margin: '0 10px 0 0',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
  };

  const submitButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#28a745',
    color: 'white',
  };

  const cancelButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#6c757d',
    color: 'white',
  };

  const disabledButtonStyle = {
    ...submitButtonStyle,
    backgroundColor: '#6c757d',
    cursor: 'not-allowed',
  };

  return (
    <div>
      <h2>{isEdit ? 'Edit Vehicle Model' : 'Create Vehicle Model'}</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} style={formStyle}>
        <div style={fieldStyle}>
          <label style={labelStyle}>Model Name *</label>
          <Controller
            name="name"
            control={control}
            rules={{
              required: 'Model name is required',
              validate: {
                notEmpty: (value) => validationUtils.isNotEmpty(value) || 'Model name cannot be empty',
                validLength: (value) => validationUtils.isValidLength(value, 2, 50) || 'Model name must be between 2 and 50 characters',
              },
            }}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder="Enter model name (e.g., 325i, X5)"
                style={errors.name ? errorInputStyle : inputStyle}
              />
            )}
          />
          {errors.name && <div style={errorStyle}>{errors.name.message}</div>}
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>Abbreviation *</label>
          <Controller
            name="abrv"
            control={control}
            rules={{
              required: 'Abbreviation is required',
              validate: {
                notEmpty: (value) => validationUtils.isNotEmpty(value) || 'Abbreviation cannot be empty',
                validLength: (value) => validationUtils.isValidLength(value, 1, 10) || 'Abbreviation must be between 1 and 10 characters',
              },
            }}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder="Enter abbreviation (e.g., 325i, X5)"
                style={errors.abrv ? errorInputStyle : inputStyle}
              />
            )}
          />
          {errors.abrv && <div style={errorStyle}>{errors.abrv.message}</div>}
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>Make *</label>
          <Controller
            name="makeId"
            control={control}
            rules={{
              required: 'Make selection is required',
              validate: {
                validId: (value) => validationUtils.isValidId(value) || 'Please select a valid make',
              },
            }}
            render={({ field }) => (
              <select
                {...field}
                style={errors.makeId ? errorInputStyle : inputStyle}
                onChange={(e) => field.onChange(parseInt(e.target.value))}
              >
                <option value={0}>Select a make...</option>
                {makes.map(make => (
                  <option key={make.id} value={make.id}>
                    {make.name}
                  </option>
                ))}
              </select>
            )}
          />
          {errors.makeId && <div style={errorStyle}>{errors.makeId.message}</div>}
        </div>

        <div style={{ marginTop: '30px' }}>
          <button
            type="submit"
            disabled={!isValid || creating || updating}
            style={!isValid || creating || updating ? disabledButtonStyle : submitButtonStyle}
          >
            {creating || updating ? 'Saving...' : (isEdit ? 'Update Model' : 'Create Model')}
          </button>
          <button
            type="button"
            onClick={handleCancel}
            style={cancelButtonStyle}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default VehicleForm;