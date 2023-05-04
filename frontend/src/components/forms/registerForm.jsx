import { Formik } from "formik";
import * as Yup from "yup";

export default function RegisterForm({ router }) {
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={Yup.object({
        email: Yup.string().email("Invalid email address").required(),
        password: Yup.string()
          .min(8, "Must be atleast 15 characters")
          .required(),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          router.push("/getting_started");
          // Call external API
        }, 400);
      }}
    >
      {(formik) => (
        <form
          className="classNamew-full grid grid-cols-1 sm:grid-cols-2 sm:min-h-[280px] sm:divide-x-2"
          onSubmit={formik.handleSubmit}
        >
          <div className="space-y-4 sm:pr-6 mb-8">
            <div>
              <label className="sr-only" htmlFor="email">
                Email
              </label>
              <input
                placeholder="Email"
                type="text"
                id="email"
                className={`h-12 border px-4 rounded-md focus:outline-0 focus:ring-2 focus:ring-primary-default/50 text-dark ${
                  formik.errors.email && formik.touched.email
                    ? " ring ring-danger-default/50"
                    : ""
                }`}
                {...formik.getFieldProps("email")}
              />
              {formik.errors.email && formik.touched.email ? (
                <div className="text-xs text-danger-default/50 my-2">
                  {formik.errors.email}
                </div>
              ) : null}
            </div>
            <div>
              <label className="sr-only" htmlFor="password">
                Password
              </label>
              <input
                placeholder="Password"
                className={`h-12 border px-4 rounded-md focus:outline-0 focus:ring-2 focus:ring-primary-default/50 text-dark ${
                  formik.errors.password && formik.touched.password
                    ? " ring ring-danger-default/50"
                    : ""
                }`}
                type="password"
                id="password"
                {...formik.getFieldProps("password")}
              />
              {formik.errors.password && formik.touched.password ? (
                <div className="text-xs text-danger-default/50 my-2">
                  {formik.errors.password}
                </div>
              ) : null}
            </div>
            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="btn-primary hover:bg-[#4900EB]"
            >
              Get started
            </button>
          </div>
          <div className="space-y-4 sm:pl-6">
            <button className="btn-google hover:bg-[#DA3925]">
              Sign up with Google
            </button>
            <button className="btn-apple ">Sign up with Apple</button>
          </div>
        </form>
      )}
    </Formik>
  );
}
