import { Formik } from "formik";
import Link from "next/link";
import * as Yup from "yup";
import authResolver from "../../presentation/resolvers/auth.resolver";
import authRoutes from "../../presentation/actions/auth.actions";
import { setCookie } from "../../utils/cookie";
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase";

const googleSignUp = async () => {
  const provider = new GoogleAuthProvider();
  let cred = await signInWithPopup(auth, provider);
  const { email } = cred.user;
};
export default function LoginForm({ router }) {
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={Yup.object({
        email: Yup.string()
          .email("Please enter a valid email")
          .matches(
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please enter a valid email"
          )
          .required(),
        password: Yup.string()
          .min(8, "Must be atleast 15 characters")
          .required(),
      })}
      onSubmit={(values, { setSubmitting }) => {
        authResolver(authRoutes.LOGIN, {
          email: values.email,
          password: values.password,
        })
          .then(({ data }) => {
            setCookie("token", 7, data.token);
            router.push("/home");
          })
          .catch((error) => {
            console.log(error);
          });
        setSubmitting(false);
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
            <button
              type="button"
              onClick={async (e) => {
                e.target.disabled = "true";
                const provider = new GoogleAuthProvider();
                let cred = await signInWithPopup(auth, provider);
                const { email } = cred.user;
                authResolver(authRoutes.OAuthLOGIN, {
                  email: email,
                  provider: "google",
                })
                  .then(({ data }) => {
                    setCookie("token", 7, data.token);
                    router.push("/home");
                  })
                  .catch((error) => {
                    console.log(error);

                    // router.push("/_error");
                  });
                e.target.disabled = "false";
              }}
              className="btn-google hover:bg-[#DA3925] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Login with Google
            </button>
            <button type="button" className="btn-apple ">
              Login with Apple
            </button>
          </div>
        </form>
      )}
    </Formik>
  );
}
