import { useState } from "react";
import UploadLabel from "./uploadLabel";
import { IoChevronBack, IoChevronForward, IoClose } from "react-icons/io5";
import { Formik } from "formik";
import { storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import _ from "lodash";
import ErrorMessage from "./errorMessage";
import { useRouter } from "next/router";
import postResolver from "../../resolvers/post.resolver";
import postActions from "../../actions/post.actions";
import { useDispatch } from "react-redux";
import {
  toggleAddPostModal,
  toggleSuccessModal,
} from "../../store/features/uiSlice";
import FormCarousel from "./formCarousel";

export default function AddPostForm() {
  const dispatch = useDispatch();
  const id = localStorage.getItem("id");
  const token = localStorage.getItem("token");
  const router = useRouter();
  const MAX_STEPS = 2;
  const [steps, updateSteps] = useState(1);
  const [files, updateFiles] = useState([]);
  const [rawFiles, updateRawFiles] = useState([]);

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
    let container = [];
    for (let i = 0; i < files.length; i++) {
      let val = URL.createObjectURL(files[i]);
      container.push(val);
    }
    updateFiles(container);
    formik.setValues({
      ...formik.values,
      media: container,
    });
  };

  const formValidator = (values) => {
    let errors = {};
    if (values.media.length === 0) {
      errors.media = "Posts must contain atleast an image";
    }
    if (values.tags.length === 0) {
      errors.tags = "Please add atleast a tag";
    }
    if (values.body.length === 0) {
      errors.tags = "Every post must contain a body description";
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
        onSubmit={(values, { setSubmitting, resetForm }) => {
          let imageUrls = [];
          for (let i = 0; i < rawFiles.length; i++) {
            const itemStorageRef = ref(
              storage,
              `images/${id}/${rawFiles.item(i).name}`
            );
            uploadBytes(itemStorageRef, rawFiles.item(i))
              .then(() => {
                getDownloadURL(itemStorageRef).then((url) => {
                  imageUrls.push(url);
                });
              })
              .catch((error) => {
                console.log(error);
              });
          }
          postResolver(postActions.CREATE_POST, id, token, {
            content: {
              body: values.body,
              image: imageUrls,
            },
            tags: values.tags,
          })
            .then(({ data }) => {
              dispatch(toggleSuccessModal());
              dispatch(toggleAddPostModal());
              resetForm();
              updateFiles([]);
            })
            .catch((error) => {
              console.log(error);
              resetForm();
              updateFiles([]);
            });
        }}
      >
        {(formik) => (
          <form
            onSubmit={formik.handleSubmit}
            className="mx-auto space-y-4 flex flex-col items-center h-full"
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
                type="button"
                onClick={() => {
                  formik.validateForm().then((errors) => {
                    if (!errors.media) {
                      _updateSteps("forward");
                    }
                  });
                }}
                className="p-2 border-primary-default/10 rounded border hover:bg-primary-default/10 transition duration-200"
              >
                <IoChevronForward />
              </button>
            </div>
            {steps === 1 ? (
              <>
                <FormCarousel images={files} bookmark={false} />
                <input
                  onChange={(e) => {
                    _updateFiles(e, formik);
                  }}
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
                {formik.errors.media ? (
                  <ErrorMessage message={formik.errors.media} />
                ) : null}
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
                          <input
                            className="h-12 border px-4 rounded-md focus:outline-0 focus:ring-2 focus:ring-primary-default/50 text-dark "
                            id="tag"
                            type="text"
                            placeholder="Add tags"
                            onBlur={formik.onBlur}
                          />
                          <button
                            type="button"
                            onClick={(e) => {
                              let tag = e.target.previousSibling.value
                                .toLowerCase()
                                .trim();
                              if (
                                !_.includes(formik.values.tags, tag) &&
                                tag !== ""
                              ) {
                                formik.setValues({
                                  ...formik.values,
                                  tags: [
                                    ...formik.values.tags,
                                    e.target.previousSibling.value.toLowerCase(),
                                  ],
                                });
                                e.target.previousSibling.value = "";
                              }
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
