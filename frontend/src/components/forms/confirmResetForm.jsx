import { Formik } from "formik";
import * as Yup from "yup";
import authResolver from "../../presentation/resolvers/auth.resolver";
import authActions from "../../presentation/actions/auth.actions";
import { useState } from "react";
import Link from "next/link";

export default function ConfirmResetForm() {
  const [reset, setReset] = useState(false);

  if (reset) {
    return (
      <div className="w-full ">
        <h6 className="text-xl text-center">
          Password reset completed, now{" "}
          <Link href="/login" className="link">
            Login
          </Link>{" "}
          to access your acccount
        </h6>
      </div>
    );
  } else {
    return (
      <Formik
        initialValues={{ password: "", confirmPassword: "" }}
        validationSchema={Yup.object({
          password: Yup.string()
            .min(8, "Must be atleast 15 characters")
            .required("Please enter a new password"),
          confirmPassword: Yup.string()
            .min(8, "Must be atleast 15 characters")
            .required("Please confirm the password"),
        })}
        onSubmit={(values, { setSubmitting }) => {}}
      >
        {(formik) => (
          <form className="w-full ">
            <div className="space-y-4 mb-4">
              <div className="w-full">
                <label>Enter new password</label>
                <input
                  type="password"
                  id="password"
                  {...formik.getFieldProps("password")}
                  className={`h-12 w-full border px-4 rounded-md focus:outline-0 focus:ring-2 focus:ring-primary-default/50 text-dark ${
                    formik.errors.password && formik.touched.password
                      ? " ring ring-danger-default/50"
                      : ""
                  }`}
                />
                {formik.errors.password && formik.touched.password ? (
                  <div className="text-xs text-danger-default/50 my-2">
                    {formik.errors.password}
                  </div>
                ) : null}
              </div>
              <div className="w-full">
                <label>Repeat password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  {...formik.getFieldProps("confirmPassword")}
                  className={`h-12 w-full border px-4 rounded-md focus:outline-0 focus:ring-2 focus:ring-primary-default/50 text-dark ${
                    formik.errors.confirmPassword &&
                    formik.touched.confirmPassword
                      ? " ring ring-danger-default/50"
                      : ""
                  }`}
                />
                {formik.errors.confirmPassword &&
                formik.touched.confirmPassword ? (
                  <div className="text-xs text-danger-default/50 my-2">
                    {formik.errors.password}
                  </div>
                ) : null}
              </div>

              <button
                disabled={formik.isSubmitting}
                type="submit"
                className={`btn-primary ${
                  formik.isSubmitting
                    ? "cursor-not-allowed opacity-50"
                    : "hover:bg-[#4900EB]"
                }`}
              >
                {formik.isSubmitting ? (
                  <span>Confirming</span>
                ) : (
                  <span>Confirm</span>
                )}
              </button>
            </div>
          </form>
        )}
      </Formik>
    );
  }
}
