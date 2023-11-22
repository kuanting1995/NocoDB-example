import React, { useEffect, useState,useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignatureCanvas from "react-signature-canvas";
import "./style/form.css";
import ReactToPrint from "react-to-print";

const Ref1117 = () => {
  //up.object()：創建一個 Yup 物件驗證器的方法
  //shape()：接受一個物件，該物件定義了每個欄位的驗證規則
  const validationSchema = Yup.object().shape({
    valueA: Yup.string().required("金額未填寫").max(8, "金額異常，過大"),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  function onSubmit(data) {
    // display form data on success
    toast("SUCCESS!! :-)\n\n" + JSON.stringify(data, null, 4));
    return false;
  }

  // 電子簽
  const [sign, setSign] = useState();
  const [url, setUrl] = useState();

  const handleClear = () => {
    sign.clear();
    setUrl("");
  };
  const handleGenerate = () => {
    setUrl(sign.getTrimmedCanvas().toDataURL("image/png"));
  };

  // 列印
  const componentRef =useRef();
  return (
    <>
      <ToastContainer />
      <body>
        {/* 列印範圍 */}
        <ReactToPrint
          trigger={() => (
            <button className="bg-blue-500 ml-5 text-white font-bold py-2 px-8 rounded hover:bg-blue-600 hover:text-white transition-all duration-150 hover:ring-4 hover:ring-blue-400">
              Print / Download
            </button>
          )}
          content={() => componentRef.current}
        />
        <div ref={componentRef} className="p-5">
          <div className="container my-4 py-5">
            {/* <!-- 正式FORM --> */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <div
                className="row w-100 py-3 px-1"
                style={{ backgroundColor: "lightgray" }}
              >
                {/* <!-- 第5行 --> */}
                <div className="d-flex justify-content-left col-md-12 pt-1">
                  <div className="theader col-auto me-3 align-self-center">
                    醫療費用金額
                  </div>
                  <div className="tbb col-9  flex-fill mx-2">
                    <input
                      type="number"
                      name="valueA"
                      {...register("valueA")}
                      className={`form-control px-5 ${
                        errors.valueA ? "is-invalid" : ""
                      }`}
                      placeholder="$A"
                    />
                    <div className="invalid-feedback">
                      {errors.valueA?.message}
                    </div>
                  </div>
                </div>
                {/* 電子簽 */}
                <div>
                  <div
                    className="signature-canvas"
                    style={{
                      border: "2px solid black",
                      width: 500,
                      height: 200,
                    }}
                  >
                    <SignatureCanvas
                      canvasProps={{
                        width: 500,
                        height: 200,
                        className: "sigCanvas",
                      }}
                      ref={(data) => setSign(data)}
                    />
                  </div>
                  <br></br>
                  <button
                    type="button"
                    style={{ height: "30px", width: "60px" }}
                    onClick={handleClear}
                  >
                    Clear
                  </button>
                  <button
                    type="button"
                    style={{ height: "30px", width: "60px" }}
                    onClick={handleGenerate}
                  >
                    Save
                  </button>

                  <br />
                  <br />
                  <img src={url} />
                </div>
              </div>
              {/* submitBTN */}
              <button type="submit" className="btn btn-primary me-1">
                Submit
              </button>
            </form>
          </div>
        </div>
      </body>
    </>
  );
};
export default Ref1117;
