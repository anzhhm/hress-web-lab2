import React, { useState, useEffect, memo } from "react";
import { createPortal } from "react-dom";

export interface CreateAircraftDto {
  Model: string;
  Capacity: number;
  ManufacturerId: number;
  CompanyId: number;
}

interface AircraftFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  handleSubmit: (data: CreateAircraftDto) => void;
  defaultValues?: Partial<CreateAircraftDto>;
  title?: string;
}

export const AircraftFormModal = memo(
  ({
    isOpen,
    onClose,
    handleSubmit,
    defaultValues,
    title = "Aircraft Form",
  }: AircraftFormModalProps) => {
    const [formData, setFormData] = useState<CreateAircraftDto>({
      Model: "",
      Capacity: 0,
      ManufacturerId: 0,
      CompanyId: 0,
      ...defaultValues,
    });

    useEffect(() => {
      if (defaultValues) {
        setFormData((prev) => ({
          ...prev,
          ...defaultValues,
        }));
      }
    }, [defaultValues]);

    // Form validation errors
    const [errors, setErrors] = useState<
      Partial<Record<keyof CreateAircraftDto, string>>
    >({});

    // Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      let parsedValue: string | number = value;

      // Parse numeric fields
      if (
        name === "Capacity" ||
        name === "ManufacturerId" ||
        name === "CompanyId"
      ) {
        parsedValue = value === "" ? 0 : parseInt(value, 10);
      }

      setFormData((prev) => ({
        ...prev,
        [name]: parsedValue,
      }));

      if (errors[name as keyof CreateAircraftDto]) {
        setErrors((prev) => ({
          ...prev,
          [name]: undefined,
        }));
      }
    };

    // Validate form data
    const validateForm = (): boolean => {
      const newErrors: Partial<Record<keyof CreateAircraftDto, string>> = {};
      let isValid = true;

      if (!formData.Model?.trim()) {
        newErrors.Model = "Model is required";
        isValid = false;
      }

      if (!formData.Capacity || formData.Capacity <= 0) {
        newErrors.Capacity = "Capacity must be greater than 0";
        isValid = false;
      }

      if (!formData.ManufacturerId || formData.ManufacturerId <= 0) {
        newErrors.ManufacturerId = "Manufacturer ID must be greater than 0";
        isValid = false;
      }

      if (!formData.CompanyId || formData.CompanyId <= 0) {
        newErrors.CompanyId = "Company ID must be greater than 0";
        isValid = false;
      }

      setErrors(newErrors);
      return isValid;
    };

    const onSubmit = (e: React.FormEvent) => {
      e.preventDefault();

      if (validateForm()) {
        handleSubmit(formData as CreateAircraftDto);
        onClose();
      }
    };

    if (!isOpen) return null;

    return createPortal(
      <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md mx-auto animate-fadeIn">
          <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {title}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white text-2xl transition-colors"
              aria-label="Close modal"
            >
              &times;
            </button>
          </div>

          <div className="p-6">
            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="Model"
                  className="block mb-2 font-medium text-gray-700 dark:text-gray-200"
                >
                  Model
                </label>
                <input
                  type="text"
                  id="Model"
                  name="Model"
                  value={formData.Model || ""}
                  onChange={handleChange}
                  className={`w-full p-2.5 border rounded-lg ${
                    errors.Model
                      ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500"
                  } bg-white dark:bg-gray-700 text-gray-900 dark:text-white outline-none transition-colors`}
                  placeholder="Enter model name"
                />
                {errors.Model && (
                  <p className="text-red-500 text-sm mt-1">{errors.Model}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="Capacity"
                  className="block mb-2 font-medium text-gray-700 dark:text-gray-200"
                >
                  Capacity
                </label>
                <input
                  type="number"
                  id="Capacity"
                  name="Capacity"
                  min="1"
                  value={formData.Capacity || ""}
                  onChange={handleChange}
                  className={`w-full p-2.5 border rounded-lg ${
                    errors.Capacity
                      ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500"
                  } bg-white dark:bg-gray-700 text-gray-900 dark:text-white outline-none transition-colors`}
                  placeholder="Enter capacity"
                />
                {errors.Capacity && (
                  <p className="text-red-500 text-sm mt-1">{errors.Capacity}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="ManufacturerId"
                  className="block mb-2 font-medium text-gray-700 dark:text-gray-200"
                >
                  Manufacturer ID
                </label>
                <input
                  type="number"
                  id="ManufacturerId"
                  name="ManufacturerId"
                  min="1"
                  value={formData.ManufacturerId || ""}
                  onChange={handleChange}
                  className={`w-full p-2.5 border rounded-lg ${
                    errors.ManufacturerId
                      ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500"
                  } bg-white dark:bg-gray-700 text-gray-900 dark:text-white outline-none transition-colors`}
                  placeholder="Enter manufacturer ID"
                />
                {errors.ManufacturerId && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.ManufacturerId}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="CompanyId"
                  className="block mb-2 font-medium text-gray-700 dark:text-gray-200"
                >
                  Company ID
                </label>
                <input
                  type="number"
                  id="CompanyId"
                  name="CompanyId"
                  min="1"
                  value={formData.CompanyId || ""}
                  onChange={handleChange}
                  className={`w-full p-2.5 border rounded-lg ${
                    errors.CompanyId
                      ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500"
                  } bg-white dark:bg-gray-700 text-gray-900 dark:text-white outline-none transition-colors`}
                  placeholder="Enter company ID"
                />
                {errors.CompanyId && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.CompanyId}
                  </p>
                )}
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700 mt-6">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>,
      document.body
    );
  }
);

AircraftFormModal.displayName = "AircraftFormModal";
