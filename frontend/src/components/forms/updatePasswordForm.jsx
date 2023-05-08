import { Formik } from "formik";
import * as Yup from "yup";
import { IoEye } from "react-icons/io5";

export default function UpdatePasswordForm() {
  return (
    <Formik
      initialValues={{
        newPassword: "",
        oldPassword: "",
      }}
      validationSchema={Yup.object({
        oldPassword: Yup.string()
          .min(8, "Password must be atleast 8 characters")
          .required("Please enter your old password"),
        newPassword: Yup.string()
          .min(8, "Password must be atleast 8 characters")
          .required("Please enter a new password"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          console.log(JSON.stringify(values, null, 2));
        }, 1000);
      }}
    >
      {(formik) => (
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col items-center justify-start space-y-8 py-4"
        >
          <div>
            <div className="relative flex gap-2 lg:gap-4 items-center">
              <label htmlFor="oldPassword" className="w-20 text-right">
                Old password
              </label>
              <input
                className={`w-52 lg:w-72 h-12  border px-4 rounded-md focus:outline-0 focus:ring-2 focus:ring-primary-default/50 text-dark ${
                  formik.errors.oldPassword && formik.touched.oldPassword
                    ? " ring ring-danger-default/50"
                    : ""
                } `}
                id="oldPassword"
                type="password"
                {...formik.getFieldProps("oldPassword")}
              />
              <span
                onClick={(e) => {
                  e.currentTarget.previousSibling.type === "password"
                    ? (e.currentTarget.previousSibling.type = "text")
                    : (e.currentTarget.previousSibling.type = "password");
                }}
                className="absolute cursor-pointer right-2 text-dark-default/40"
              >
                <IoEye />
              </span>
            </div>
            {formik.errors.oldPassword && formik.touched.oldPassword ? (
              <div className="ml-20 px-4 py-2 text-xs text-danger-default/50">
                {formik.errors.oldPassword}
              </div>
            ) : null}
          </div>
          <div>
            <div className="relative flex gap-2 lg:gap-4 items-center">
              <label htmlFor="new_password" className="w-20 text-right">
                New password
              </label>
              <input
                className={`w-52 lg:w-72 h-12  border px-4 rounded-md focus:outline-0 focus:ring-2 focus:ring-primary-default/50 text-dark ${
                  formik.errors.newPassword && formik.touched.newPassword
                    ? " ring ring-danger-default/50"
                    : ""
                } `}
                id="newPassword"
                type="password"
                {...formik.getFieldProps("newPassword")}
              />
              <span
                onClick={(e) => {
                  e.currentTarget.previousSibling.type === "password"
                    ? (e.currentTarget.previousSibling.type = "text")
                    : (e.currentTarget.previousSibling.type = "password");
                }}
                className="absolute cursor-pointer right-2 text-dark-default/40"
              >
                <IoEye />
              </span>
            </div>
            {formik.errors.newPassword && formik.touched.newPassword ? (
              <div className="text-xs ml-20 px-4 py-2 text-danger-default/50">
                {formik.errors.newPassword}
              </div>
            ) : null}
          </div>
          <button
            type="submit"
            className="mt-10  btn-primary w-40 hover:bg-primary-default/80 transition"
          >
            Save Changes
          </button>
        </form>
      )}
    </Formik>
  );
}