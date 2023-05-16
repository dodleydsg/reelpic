import { Formik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import authResolver from "../../resolvers/auth.resolver";
import authRoutes from "../../routes/auth.routes";
import { setCookie } from "../../utils/cookie";

export default function RegisterForm({ googleSignIn }) {
  const router = useRouter();
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={Yup.object({
        email: Yup.string().email("Invalid email address").required(),
        password: Yup.string()
          .min(8, "Must be atleast 8 characters")
          .required(),
      })}
      onSubmit={(values, { setSubmitting }) => {
        authResolver(authRoutes.REGISTER, "", "", {
          email: values.email,
          password: values.password,
        })
          .then(({ data }) => {
            authResolver(authRoutes.LOGIN, "", "", {
              email: values.email,
              password: values.password,
            })
              .then(({ data }) => {
                setCookie("token", data.token);
                setCookie("id", data.user._id);
              })
              .catch((error) => {
                router.push("/login");
                // console.log(error);
              });

            // router.push("/getting_started");
            setSubmitting(false);
          })
          .catch((error) => {
            if (error.response) {
              console.log(error.response.data.message);
              setSubmitting(false);
            } else if (error.request) {
              console.log(error.request);
            } else {
              null;
            }
          });

        // try {
        //   const resp = await authResolver(authRoutes.REGISTER, "", "", {
        //     email: values.email,
        //     password: values.password,
        //   });
        //   console.log(resp);
        //   localStorage.setItem("token", data.token);
        //   router.push("/getting_started");
        // } catch (error) {
        //   if (error.response) {
        //     // call error in formik
        //     console.log(error);
        //   } else if (error.request) {
        //     console.log("Heollo");

        //     null;
        //   } else {
        //     null;
        //     console.log(error);
        //   }
        // }
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
              className="btn-primary hover:bg-[#4900EB] disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Get started
            </button>
          </div>
          <div className="space-y-4 sm:pl-6">
            <button
              onClick={(e) => {
                e.preventDefault();
                googleSignIn();
              }}
              className="btn-google hover:bg-[#DA3925]"
            >
              Sign up with Google
            </button>
            <button className="btn-apple ">Sign up with Apple</button>
          </div>
        </form>
      )}
    </Formik>
  );
}
