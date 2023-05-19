import catalogueResolver from "../../resolvers/catalogue.resolver";
import catalogueActions from "../../actions/catalogue.actions";
import { updateCatalogueList } from "../../store/features/userSlice";
import InputElement from "./input";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { toggleSuccessModal } from "../../store/features/uiSlice";

export default function AddCatalogueForm() {
  const dispatch = useDispatch();
  return (
    <Formik
      initialValues={{
        title: "",
        description: "",
      }}
      validationSchema={Yup.object({
        title: Yup.string().required("The catalogue needs a title"),
        description: Yup.string()
          .max(3000, "Please a concise description less than 3000 characters")
          .required("A little description for the title will help"),
      })}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("id");
        catalogueResolver(catalogueActions.CREATE_CATALOGUE, userId, token, {
          title: values.title,
          description: values.description,
        })
          .then(({ data }) => {
            dispatch(updateCatalogueList(data._id));
            dispatch(toggleSuccessModal());
          })
          .catch((error) => {
            // console.log(error.response.data.error);
          });
        resetForm();
        setSubmitting(false);
      }}
    >
      {(formik) => (
        <form onSubmit={formik.handleSubmit} className="space-y-4 py-4">
          <div>
            <label htmlFor="title" className="sr-only">
              Title
            </label>
            <InputElement
              type="text"
              className="w-full"
              placeholder="Title"
              id="title"
              {...formik.getFieldProps("title")}
            />
          </div>
          <div>
            <label htmlFor="description" className="sr-only">
              Description
            </label>
            <textarea
              type="textarea"
              rows="5"
              placeholder="Description"
              id="description"
              className="border p-4 w-full rounded-md focus:outline-0 focus:ring-2 focus:ring-primary-default/50 text-dark "
              {...formik.getFieldProps("description")}
            />
          </div>
          <div className="space-y-1">
            {formik.errors.title && formik.touched.title ? (
              <div className="text-xs text-danger-default/50">
                {formik.errors.title}
              </div>
            ) : null}{" "}
            {formik.errors.description && formik.touched.description ? (
              <div className="text-xs text-danger-default/50">
                {formik.errors.description}
              </div>
            ) : null}
          </div>
          <button
            disabled={formik.isSubmitting}
            type="submit"
            className="btn-primary hover:bg-[#4900EB] disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            Confirm
          </button>
        </form>
      )}
    </Formik>
  );
}
