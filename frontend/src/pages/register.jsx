import Head from "next/head";
import InputElement from "../components/formElements/input";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import {
  clearForm,
  updatePassword,
  updateEmail,
} from "../store/features/authForm/authSlice";

export default function Reset() {
  const { password, email } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  return (
    <>
      <Head>
        <title>Reelpic | Register</title>
      </Head>
      <div className="relative font-sans mx-auto min-h-screen bg-[url('../assets/images/Home_bg.png')] bg-cover">
        <div className="relative container mx-auto flex z-10 h-screen px-4">
          <div className="items-center bg-white max-w-3xl mx-auto my-auto rounded-xl px-[22px] sm:px-16 py-[35px] sm:py-[55px]">
            <div className="space-y-3 sm:space-y-7">
              <h1 className="text-heading text-center">Reelpic</h1>

              <p className="text-center text-subheading">
                Register and share your moments
              </p>
            </div>
            <div className="mt-7">
              {/* Form element and inputs */}
              <form
                className="w-full grid grid-cols-1 sm:grid-cols-2 sm:min-h-[280px] sm:divide-x-2"
                action="./getting_started"
              >
                <div className="space-y-4 sm:pr-6 mb-8">
                  <InputElement
                    value={email}
                    onChange={(e) => dispatch(updateEmail(e.target.value))}
                    type="email"
                    placeholder="Email"
                    name="email"
                  />
                  <InputElement
                    value={password}
                    onChange={(e) => dispatch(updatePassword(e.target.value))}
                    type="password"
                    placeholder="Password"
                    name="password"
                  />
                  <Link href="/getting_started" className="block">
                    <button
                      onClick={(e) => {
                        // e.preventDefault();
                        // dispatch(clearForm());
                      }}
                      className="btn-primary hover:bg-[#4900EB]"
                    >
                      Get started
                    </button>
                  </Link>
                </div>
                <div className="space-y-4 sm:pl-6">
                  <button className="btn-google hover:bg-[#DA3925]">
                    Sign up with Google
                  </button>
                  <button className="btn-apple ">Sign up with Apple</button>
                </div>
              </form>
              <p className="text-sm text-center mt-7">
                {" "}
                Already have an account ? <br />
              </p>
              <Link href="./login" className="block text-center mt-4 link">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
