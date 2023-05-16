import { Formik } from "formik";
import Link from "next/link";
import * as Yup from "yup";
import authResolver from "../../resolvers/auth.resolver";
import authRoutes from "../../routes/auth.routes";
import { useRouter } from "next/router";
import { setCookie } from "@/components/utils/cookie";

export default function LoginForm() {
  const router = useRouter();
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
        authResolver(authRoutes.LOGIN, "", "", {
          email: values.email,
          password: values.password,
        })
          .then(({ data }) => {
            setCookie("token", data.token);
            setCookie("id", data.user._id);
            router.push("/home");
          })
          .catch((error) => {
            // console.log(error)
            router.push("/_error");
          });
      }}
    >
      {(formik) => (
        <form
          className="w-full grid grid-cols-1 sm:grid-cols-2  sm:min-h-[280px] sm:divide-x-2"
          onSubmit={formik.handleSubmit}
        >
          <div className="space-y-4 sm:pr-6 mb-8">
            <div className="w-full">
              <label className="sr-only" htmlFor="email">
                Email
              </label>
              <input
                placeholder="Email"
                type="text"
                id="email"
                className={`h-12 w-full border px-4 rounded-md focus:outline-0 focus:ring-2 focus:ring-primary-default/50 text-dark ${
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
            <div className="w-full">
              <label className="sr-only" htmlFor="password">
                Password
              </label>
              <input
                placeholder="Password"
                className={`h-12 w-full border px-4 rounded-md focus:outline-0 focus:ring-2 focus:ring-primary-default/50 text-dark ${
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
              Login
            </button>
            <Link href="/reset" className="text-center block link">
              Forgot password
            </Link>
          </div>
          <div className="space-y-4 sm:pl-6">
            <button className="btn-google hover:bg-[#DA3925]">
              Login with Google
            </button>
            <button className="btn-apple ">Login with Apple</button>
          </div>
        </form>
      )}
    </Formik>
  );
}
