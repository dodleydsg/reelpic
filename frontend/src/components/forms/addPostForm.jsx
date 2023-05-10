import { useState } from "react";
import InputElement from "./input";
import UploadLabel from "./uploadLabel";
import { IoChevronBack, IoChevronForward, IoClose } from "react-icons/io5";
import { Formik } from "formik";
import * as Yup from "yup";
import { storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Image from "next/image";

export default function AddPostForm() {
  const MAX_STEPS = 2;
  const [steps, updateSteps] = useState(1);
  const [files, updateFiles] = useState([]);

  const MediaDisplay = ({ files }) => {
    if (files) {
      return (
        <div className="h-2/3 lg:h-72 bg-gray-100 aspect-video">
          {files.map((val, idx) => (
            <Image
              id={idx}
              src={val}
              height={240}
              width={240}
              className="object-cover"
            />
          ))}
        </div>
      );
    } else {
      return <div className="h-2/3 lg:h-72 bg-gray-200"></div>;
    }
  };
  const _updateSteps = (direction) => {
    if (direction === "forward") {
      if (steps < MAX_STEPS) {
        updateSteps(steps + 1);
      }
    } else {
      if (steps > 1) {
        updateSteps(steps - 1);
      }
    }
  };

  const _updateFiles = async (e, formik) => {
    e.preventDefault();
    e.stopPropagation();
    let files = e.target.files;
    for (let i = 0; i < files.length; i++) {
      const itemStorageRef = ref(
        storage,
        `images/dodley/${files.item(i).name}`
      );
      await uploadBytes(itemStorageRef, files.item(i)).then((snapshot) => {
        console.log(
          `Uploaded file ${snapshot.metadata.name} and web path is ${snapshot.metadata.fullPath}`
        );
        formik.setValues({
          ...formik.values,
          media: [...formik.values.media, snapshot.metadata.fullPath],
        });
      });
      await getDownloadURL(itemStorageRef).then((url) =>
        updateFiles([...files, url])
      );
    }
  };

  const formValidator = (values) => {
    let errors = {};
    if (values.media.length === 0) {
      errors.media = "Posts must contain atleast an image";
    }
    if (values.tags.length === 0) {
      errors.tags = "Please add atleast a tag";
    }

    return errors;
  };
  return (
    <>
      <Formik
        initialValues={{
          body: "",
          tags: [],
          media: [],
        }}
        validate={formValidator}
        onSubmit={(values, { setSubmitting, validate }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            router.push("/home");
            // Call external API
          }, 5900);
        }}
      >
        {(formik) => (
          <form
            onSubmit={formik.handleSubmit}
            className="lg:w-3/5  mx-auto py-4 space-y-4 flex flex-col items-center h-full"
          >
            <div className="flex w-full items-center justify-between py-2">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  _updateSteps("backward");
                }}
                className="p-2 border-primary-default/10 rounded border hover:bg-primary-default/10 transition duration-200"
              >
                <IoChevronBack />
              </button>
              <h5 className="font-medium text-xl">
                {steps === 1 ? "Media" : null}
                {steps === 2 ? "Content" : null}
              </h5>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  _updateSteps("forward");
                }}
                className="p-2 border-primary-default/10 rounded border hover:bg-primary-default/10 transition duration-200"
              >
                <IoChevronForward />
              </button>
            </div>
            {steps === 1 ? (
              <>
                <MediaDisplay files={files} />
                <input
                  onChange={(e) => _updateFiles(e, formik)}
                  type="file"
                  multiple
                  id="media"
                  className="hidden"
                />
                <UploadLabel
                  htmlFor="media"
                  text="Add images"
                  className="mx-auto inline-block"
                  onBlur={formik.onBlur}
                />
              </>
            ) : null}
            {steps === 2 ? (
              <div className="w-full space-y-4 ">
                <div className="flex items-start gap-4 ">
                  <label htmlFor="body">Body</label>
                  <textarea
                    id="body"
                    rows="5"
                    className="grow border p-4 rounded-md focus:outline-0 focus:ring-2 focus:ring-primary-default/50 text-dark resize-none h-64"
                    placeholder="Give a useful description to your post"
                    {...formik.getFieldProps("body")}
                  />
                </div>
                <div>
                  <div className="flex gap-4">
                    <label htmlFor="tag">Tags</label>
                    <div className="flex-col flex gap-2">
                      <div className="w-52 lg:w-72 flex items-center gap-2">
                        <div className="flex gap-2 items-center">
                          <InputElement
                            id="tag"
                            type="text"
                            placeholder="Add tags"
                            onBlur={formik.onBlur}
                          />
                          <button
                            onClick={(e) => {
                              e.preventDefault();

                              formik.setValues({
                                ...formik.values,
                                tags: [
                                  ...formik.values.tags,
                                  e.target.previousSibling.value,
                                ],
                              });
                              console.log(formik.values);
                            }}
                            className="border h-full block px-4 py-2 rounded text-primary-default bg-light-default hover:text-dark-default transition"
                          >
                            Add
                          </button>
                        </div>
                      </div>
                      <div className="flex w-full flex-wrap gap-2">
                        {formik.values.tags.map((val, idx) => (
                          <div
                            key={idx}
                            className="flex py-2 gap-1 items-center px-4 rounded border border-dark-default/60 "
                          >
                            <span className="block">{val}</span>
                            <IoClose className="block text-danger-default cursor-pointer" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  {formik.errors.media ? (
                    <div className="text-danger-default/50 text-xs">
                      {formik.errors.media}
                    </div>
                  ) : null}
                  {formik.errors.tags ? (
                    <div className="text-danger-default/50 text-xs">
                      {formik.errors.tags}
                    </div>
                  ) : null}
                </div>
                <button
                  type="submit"
                  className="btn-primary hover:bg-[#4900EB]"
                >
                  Add post
                </button>
              </div>
            ) : null}
          </form>
        )}
      </Formik>
    </>
  );
}
