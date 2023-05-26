import catalogueResolver from "../../resolvers/catalogue.resolver";
import catalogueActions from "../../actions/catalogue.actions";
import { updateCatalogueList } from "../../store/features/userSlice";
import InputElement from "./input";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import {
  toggleAddCatalogue,
  toggleAddCatalogueModal,
  toggleSuccessModal,
} from "../../store/features/uiSlice";
import ErrorMessage from "./errorMessage";

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
            dispatch(toggleAddCatalogueModal(false));
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
          <div className="space-y-2">
            <label htmlFor="title">
              Title
              {formik.errors.title && formik.touched.title ? (
                <ErrorMessage message={formik.errors.title} />
              ) : null}
            </label>
            <InputElement
              type="text"
              className="w-full"
              placeholder="A useful title is always beneficial"
              id="title"
              {...formik.getFieldProps("title")}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="description">
              Description
              {formik.errors.description && formik.touched.description ? (
                <ErrorMessage message={formik.errors.description} />
              ) : null}
            </label>

            <textarea
              type="textarea"
              rows="5"
              placeholder="Write a useful description to help organise your images/posts"
              id="description"
              className="border p-4 w-full rounded-md focus:outline-0 focus:ring-2 focus:ring-primary-default/50 text-dark "
              {...formik.getFieldProps("description")}
            />
          </div>
          <div className="space-y-1"> </div>
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
