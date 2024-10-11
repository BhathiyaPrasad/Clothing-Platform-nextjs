import React from "react";

const SkeletonLoader = () => {
  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-4 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
            <div className="skeleton h-64 w-full rounded bg-gray-200 mt-5"></div>
            <div className="mainDiv mt-4 flex">
              {[1, 2, 3, 4].map((_, index) => (
                <div
                  key={index}
                  className={`skeleton w-24 h-24 mr-2 rounded bg-gray-200`}
                ></div>
              ))}
            </div>
          </div>
          <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0 lg:">
            <h2 className="skeleton text-sm title-font text-gray-500 tracking-widest bg-gray-200 h-4 mb-2 ml-5"></h2>
            <h1 className="skeleton text-3xl title-font font-medium mb-4 bg-gray-200 h-8 ml-5"></h1>
            <div className="flex mb-4  ml-5">
              {['Description', 'Size Chart'].map((tab, index) => (
                <div
                  key={index}
                  className="skeleton flex-grow py-2 text-lg px-1 bg-gray-200 h-6 mr-2 "
                ></div>
              ))}
            </div>
            <div className="skeleton leading-relaxed mb-4 bg-gray-200 h-20 ml-5"></div>
            <div className="flex  py-2 ml-5">
              <span className="skeleton w-16 h-6 bg-gray-200 "></span>
              <span className="skeleton w-24 h-8 ml-auto bg-gray-200"></span>
            </div>
            <div className="flex border-t border-gray-200 py-2 ml-5">
              <span className="skeleton w-16 h-6 bg-gray-200"></span>
              <span className="skeleton w-24 h-8 ml-auto bg-gray-200 "></span>
            </div>
            <div className="flex items-center justify-between mt-4">
              <span className="skeleton w-24 h-8 bg-gray-200 ml-5"></span>
              <div className="flex space-x-5">
                <div className="skeleton btn btn-primary w-32 h-8 bg-gray-200 ml-2"></div>
                <div className="skeleton btn btn-primary w-32 h-8 bg-gray-200"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkeletonLoader;
