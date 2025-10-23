import { Formik, Form } from "formik";
import SelectCategory from "./selectCategory";

// Test component to verify SelectCategory works
export default function TestSelectCategory() {
  const initialValues = {
    categories: [
      {
        _id: "",
        name: { en: "", ka: "" },
        key: "",
      },
    ],
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">
        Test SelectCategory Component
      </h2>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => console.log("Form values:", values)}
      >
        <Form>
          <SelectCategory
            name="categories.0"
            label="Test Category"
            placeholder="Select a category"
            required={true}
            selectedCategories={[]}
          />
          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Test Submit
          </button>
        </Form>
      </Formik>
    </div>
  );
}
