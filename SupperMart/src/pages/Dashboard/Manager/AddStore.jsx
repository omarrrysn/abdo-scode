import React, { useState, useEffect } from "react";

const AddStore = ({ formData, onFormChange, onNext }) => {
  const [formValues, setFormValues] = useState({
    storeName: "",
    email: "",
    openTime: "",
    closingTime: "",
    offerAmount: null,
    offerTime: null,
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(formData.image || null);

  useEffect(() => {
    if (formValues.image) {
      setImagePreview(formValues.image);
    }
  }, [formValues.image]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormValues({ ...formValues, image: reader.result });
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
      setFormValues({ ...formValues, image: null });
    }
  };

  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return emailPattern.test(email);
  };

  const validateTime = (time) => {
    const timePattern = /^(0[1-9]|1[0-2]):([0-5][0-9]) ?([AaPp][Mm])$/;
    return timePattern.test(time);
  };

  const validateForm = () => {
    console.log(formValues);
    return (
      formValues.storeName.trim() !== "" &&
      validateEmail(formValues.email) &&
      validateTime(formValues.openTime) &&
      validateTime(formValues.closingTime) &&
      formValues.offerAmount >= 0 &&
      formValues.offerAmount <= 100 &&
      formValues.image !== null
    );
  };

  const handleNext = () => {
    if (validateForm()) {
      onNext();
      onFormChange([formValues]);
    } else {
      alert("Please fill in all required fields correctly.");
    }
  };

  return (
    <div>
      <div className="rounded-sm border bg-white shadow-default dark:bg-graydark">
        <div className="border-b py-4 px-6.5">
          <h3 className="font-medium text-black dark:text-white">
            File upload
          </h3>
        </div>
        <div className="flex flex-col gap-5.5 p-6.5">
          <div>
            <label className="mb-3 block text-black dark:text-white">
              Attach Store Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className=" w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary "
            />
          </div>

          {imagePreview && (
            <div className="mt-5">
              <h4 className="text-black">Image Preview:</h4>
              <img
                src={imagePreview}
                alt="Selected Store"
                className="mt-2 h-40 w-auto rounded border"
              />
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-9 ">
        <div className="rounded-sm border bg-white shadow-default dark:bg-graydark">
          <div className="border-b py-4 px-6.5">
            <h3 className="font-medium text-black dark:text-white">
              Store Information
            </h3>
          </div>
          <form action="#">
            <div className="p-6.5">
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Store Name
                  </label>
                  <input
                    type="text"
                    value={formValues.storeName}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        storeName: e.target.value,
                      })
                    }
                    placeholder="Enter your store name"
                    className=" w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary "
                  />
                </div>
                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formValues.email}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        email: e.target.value,
                      })
                    }
                    placeholder="Enter your email address"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
              </div>
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Open Time
                  </label>
                  <input
                    type="text"
                    value={formValues.openTime}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        openTime: e.target.value,
                      })
                    }
                    placeholder="08:00am"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Closing Time
                  </label>
                  <input
                    type="text"
                    value={formValues.closingTime}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        closingTime: e.target.value,
                      })
                    }
                    placeholder="10:00pm"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
              </div>

              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Offer Amount
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={formValues.offerAmount}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        offerAmount: e.target.value,
                      })
                    }
                    placeholder="Offer Amount"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Offer Time
                  </label>
                  <input
                    type="number"
                    value={formValues.offerTime}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        offerTime: e.target.value,
                      })
                    }
                    placeholder="Offer Time"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={handleNext}
                className="mt-4 inline-flex items-center justify-center rounded-md border border-transparent
               bg-green-500  hover:bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-primary-dark w-full"
              >
                Next
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddStore;
