import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { userValidationSchema } from '../../validations';

export const UserForm = ({ onSubmit, data, isViewOnly = false }) => {
  const validationSchema = userValidationSchema;
  const [isDisabled, setIsDisabled] = useState(isViewOnly);
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      password: '',
      country: '',
      role: '',
      phone: '',
    },
    validationSchema,
    onSubmit: (values) => {
      const { address1, address2, city, state, country, phone, ...rest } = values;
      const addresses = [];
      const addressObj = {
        addressLine1: address1,
        addressLine2: address2,
        city,
        state,
        country,
      };
      addresses.push(addressObj);
      const finalData = { ...rest, phoneNumber: phone, addresses };
      onSubmit(finalData);
    },
  });

  useEffect(() => {
    if (data) {
      formik.setValues({
        name: data.name || '',
        email: data.email || '',
        address1: data?.addresses?.[0]?.addressLine1 || '',
        address2: data?.addresses?.[0]?.addressLine2 || '',
        city: data?.addresses?.[0]?.city || '',
        state: data?.addresses?.[0]?.state || '',
        country: data?.addresses?.[0]?.country || '',
        role: data.userType || '',
        phone: data.phone || '',
        password: '',
      });
    }
  }, [data]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="mb-4 flex flex-col">
        <label className="font-bold" htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
          disabled={isDisabled}
        />
        {formik.touched.name && formik.errors.name ? (
          <div className="text-red-500">{formik.errors.name}</div>
        ) : null}
      </div>

      <div className="mb-4 flex flex-col">
        <label className="font-bold" htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="text"
          //Disable email editing bc email cant be changed
          disabled={data || isDisabled ? true : false}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="text-red-500">{formik.errors.email}</div>
        ) : null}
      </div>

      <div className="mb-4 flex flex-col">
        <label className="font-bold" htmlFor="address1">Address 1</label>
        <input
          id="address1"
          name="address1"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.address1}
          disabled={isDisabled}
        />
        {formik.touched.address1 && formik.errors.address1 ? (
          <div className="text-red-500">{formik.errors.address1}</div>
        ) : null}
      </div>

      <div className="mb-4 flex flex-col">
        <label className="font-bold" htmlFor="address2">Address 2</label>
        <input
          id="address2"
          name="address2"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.address2}
          disabled={isDisabled}
        />
        {formik.touched.address2 && formik.errors.address2 ? (
          <div className="text-red-500">{formik.errors.address2}</div>
        ) : null}
      </div>

      <div className="mb-4 flex flex-col">
        <label className="font-bold" htmlFor="city">City</label>
        <input
          id="city"
          name="city"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.city}
          disabled={isDisabled}
        />
        {formik.touched.city && formik.errors.city ? (
          <div className="text-red-500">{formik.errors.city}</div>
        ) : null}
      </div>

      <div className="mb-4 flex flex-col">
        <label className="font-bold" htmlFor="state">State</label>
        <input
          id="state"
          name="state"
          disabled={isDisabled}
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.state}
        />
        {formik.touched.state && formik.errors.state ? (
          <div className="text-red-500">{formik.errors.state}</div>
        ) : null}
      </div>

      <div className="mb-4 flex flex-col">
        <label className="font-bold" htmlFor="country">Country</label>
        <input
          id="country"
          name="country"
          disabled={isDisabled}
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.country}
        />
        {formik.touched.country && formik.errors.country ? (
          <div className="text-red-500">{formik.errors.country}</div>
        ) : null}
      </div>

      <div className="mb-4 flex flex-col">
        <label className="font-bold" htmlFor="role">Role</label>
        {!isDisabled && <select
          id="role"
          name="role"
          disabled={isDisabled}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.role}
        >
          <option value="">Select Role</option>
          <option value="ADMIN">ADMIN</option>
          <option value="CLIENT">CLIENT</option>
        </select>}
        {isDisabled && <input
          id="role"
          name="role"
          disabled={isDisabled}
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.role}
        />}
        {formik.touched.role && formik.errors.role ? (
          <div className="text-red-500">{formik.errors.role}</div>
        ) : null}
      </div>

      <div className="mb-4 flex flex-col">
        <label className="font-bold" htmlFor="phone">Phone Number</label>
        <input
          id="phone"
          name="phone"
          type="text"
          disabled={isDisabled}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.phone}
        />
        {formik.touched.phone && formik.errors.phone ? (
          <div className="text-red-500">{formik.errors.phone}</div>
        ) : null}
      </div>

      {!data && <div className="mb-4 flex flex-col">
        <label className="font-bold" htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          disabled={isDisabled}
          type="password" // Changed to password type
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password ? (
          <div className="text-red-500">{formik.errors.password}</div>
        ) : null}
      </div>}

      {!isDisabled && <button type="submit" className="bg-blue-500 text-white px-4 py-2">
        Submit
      </button>}

      {isDisabled && <button onClick={onSubmit} className="bg-blue-500 text-white px-4 py-2">
        Done
      </button>}
    </form>
  );
};
