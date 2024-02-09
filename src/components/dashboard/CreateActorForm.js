import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Button from "../UI/Button";
import ImagePicker from "../UI/ImagePicker";
import { Select, TextArea } from "../UI/Input";
import FormInput from "../UI/FormInput";
import { useAddActor } from "../../hooks/actors/useAddActor";
import { useModalWindow } from "../UI/Modal";

const CreateActorForm = ({ addActorMutate }) => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      profile: null, // Assuming you want to handle files, initially there's no file
      gender: "", // Default to no gender selected
      name: "", // Empty string for name
      about: "", // Empty string for about
    },
  });

  const [imagePreview, setImagePreview] = useState(null);

  // ... other form state and handlers

  const onSubmit = (data) => {
    console.log(data);
    addActorMutate.mutate(data);

    // Process form data submission here
  };

  // Handle image change separately to update the preview and form value
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setImagePreview(fileUrl); // Update image preview
      setValue("profile", file); // Manually set form value
    }
  };

  const genderOptions = [
    { value: "", label: "Gender" },

    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
  ];

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-start w-full max-w-2xl text-white"
    >
      <div className="flex justify-between items-center w-full mb-8">
        <h1 className="text-xl font-bold">Create New Actor</h1>
        <Button
          isLoading={addActorMutate.isPending}
          type="submit"
          variant="solid"
        >
          Create
        </Button>
      </div>
      <div className="flex gap-10">
        <div className="w-full">
          <Controller
            name="profile"
            control={control}
            rules={{ required: "Profile picture is required" }}
            render={({ field: { onChange, value } }) => (
              <ImagePicker
                id="profile"
                rounded={true}
                imagePreview={imagePreview}
                error={errors.profile?.message}
                onImageChange={(e) => {
                  handleImageChange(e);
                  onChange(e.target.files[0]); // Update form value
                }}
                width="140px"
                height="140px"
              />
            )}
          />
          <Controller
            control={control}
            name="gender"
            rules={{ required: "Gender is required" }}
            render={({ field }) => (
              <Select
                className="mt-3"
                error={errors.gender?.message}
                options={genderOptions}
                {...field}
              />
            )}
          />
        </div>
        <div className="w-full">
          <Controller
            name="name"
            control={control}
            rules={{ required: "Name is required" }}
            render={({ field }) => (
              <FormInput
                error={errors.name?.message}
                label="Name"
                placeholder="Joan Doe"
                {...field}
              />
            )}
          />
          <Controller
            name="about"
            control={control}
            rules={{ required: "About is required" }}
            render={({ field }) => (
              <TextArea
                error={errors.about?.message}
                label="About"
                placeholder="About ..."
                {...field}
              />
            )}
          />
        </div>
      </div>
    </form>
  );
};

export default CreateActorForm;
