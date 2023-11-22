import React, { useEffect, useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignatureCanvas from "react-signature-canvas";

const RefForm = () => {
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
    // get signature data
    data.sign = sigCanvas.current.getTrimmedCanvas().toDataURL("image/png");
    return false;
  }

  //簽名板
  // 建立一個 ref 以存取簽名畫布
  const sigCanvas = useRef({});

  // 建立一個函數清除簽名畫布
  const clear = () => {
    sigCanvas.current.clear();
  };

  //建立一個函數打印簽名
  const print = () => {
    const dataUrl = sigCanvas.current.getTrimmedCanvas().toDataURL("image/png");
    const newWindow = window.open();
    newWindow.document.write('<img src="' + dataUrl + '"/>');
    newWindow.print();
  };

  return (
    <>
      <ToastContainer />
      <body>
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

              <div className="d-flex justify-content-left col-md-12 pt-1">
                <div className="theader col-auto me-3 align-self-center">
                  電子簽
                </div>
                <div className="tbb col-9 flex-fill mx-2">
                  <SignatureCanvas
                    ref={sigCanvas}
                    canvasProps={{
                      className: "sigCanvas",
                    }}
                  />
                  <button className="btn btn-primary me-1" onClick={clear}>
                    清除
                  </button>
                </div>
              </div>
            </div>
            {/* submitBTN */}
            <button type="submit" className="btn btn-primary me-1">
              Submit
            </button>
            <button onClick={print}>打印</button>
          </form>
        </div>
      </body>
    </>
  );
};
export default RefForm;
