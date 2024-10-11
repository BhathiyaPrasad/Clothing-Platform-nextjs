'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { doc, getDoc, collection } from 'firebase/firestore';
import { db } from '../utils/firebase';
import Image from 'next/image';
import SizeChart from './common/SizeChart';
import './Styles/productDetails.css';
import { formatPrice } from '../utils/price';
import { ref, getStorage, getDownloadURL } from 'firebase/storage';
import { formatColor } from '@utils/color';
import ProductDetailsLoading from './common/ProductDetailsLoading';
import { Heart } from 'lucide-react';
const orgDocId = "20240711-1011-SaluniFashion";
const storage = getStorage();

type ProductDetailsProps = {
  productId: string;

};

type Product = {
  Item_Name: string;
  description: string;
  Sales_Price: number;
  id: string;

  quantity: number;
  Cat_Name: string;
  src: string;
  UUID: string;
  imageUrl?: string;
  imageUrl2?: string;
  imageUrl3?: string;
  imageUrl4?: string;
  sizeChart?: string;
  Remark: string;
  Item_ID_Auto: number;
  colorCodes: string;
  colorNames: string;
  color: string;
  code: string;
};



async function getImageDownloadURL(imagePath: string) {
  try {
    const imageRef = ref(storage, imagePath);
    const imageUrl = await getDownloadURL(imageRef);
    return imageUrl;
  } catch (error) {
    console.error("Error getting image download URL:", error);
    return '';
  }
}

const ProductDetails = ({ productId }: ProductDetailsProps) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [activeTab, setActiveTab] = useState<"description" | "sizeChart">("description");
  const [mainImage, setMainImage] = useState<string>('');
  const [thumbnail1, setThumbnail1] = useState<string>('');
  const [thumbnail2, setThumbnail2] = useState<string>('');
  const [thumbnail3, setThumbnail3] = useState<string>('');
  const [thumbnail4, setThumbnail4] = useState<string>('');
  const [size, setSize] = useState('');
  const [color, setColor] = useState('');
  const [thumsizechart, setSizechart] = useState<string>('');
  const [colorNameArray, setColorNamesArray] = useState()

  const router = useRouter();

  useEffect(() => {
    const fetchProduct = async () => {
      const productDocRef = doc(
        collection(doc(db, "organizations", orgDocId), "items"),
        productId
      );
      const productDoc = await getDoc(productDocRef);
      if (productDoc.exists()) {
        const productData = productDoc.data() as Product;
        const ID = productData.Item_ID_Auto.toString();
        const formattedProductId = ID.replace(/\//g, '_');
        const imageUrl = await getImageDownloadURL(`gs://freidea-pos-img/20240711-1011-SaluniFashion/Images/Products/Product_${formattedProductId}.png`);
        const imageUrl2 = await getImageDownloadURL(`gs://freidea-pos-img/20240711-1011-SaluniFashion/Images/Products/Product2_${formattedProductId}.png`);
        const imageUrl3 = await getImageDownloadURL(`gs://freidea-pos-img/20240711-1011-SaluniFashion/Images/Products/Product3_${formattedProductId}.png`);
        const imageUrl4 = await getImageDownloadURL(`gs://freidea-pos-img/20240711-1011-SaluniFashion/Images/Products/Product4_${formattedProductId}.png`);
        const sizeChart = await getImageDownloadURL(`gs://freidea-pos-img/20240711-1011-SaluniFashion/Images/SizeCharts/Product_${formattedProductId}.png`);

        productData.imageUrl = imageUrl;
        productData.imageUrl2 = imageUrl2;
        productData.imageUrl3 = imageUrl3;
        productData.imageUrl4 = imageUrl4;
        productData.sizeChart = sizeChart;
        // productData.colorsarray = colorsarray;

        setProduct(productData);
        setMainImage(imageUrl);
        setThumbnail1(imageUrl);
        setThumbnail2(imageUrl2);
        setThumbnail3(imageUrl3);
        setThumbnail4(imageUrl4);
        setSizechart(sizeChart);
        // useColors(colorsarray);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleImageClick = (src: string) => {
    setMainImage(src);
  };

  const handleSizeClick = (selectedSize: string) => {
    setSize(selectedSize);
  };

  const handleColorClick = (selectedColor: string) => {
    setColor(selectedColor);
  };

  if (!product) {
    return <ProductDetailsLoading />
  }

  const addToCart = (product: Product) => {
    console.log("Order is processing", product);

    let existingItems = localStorage.getItem('Items');
    let itemsArray;

    try {
      itemsArray = existingItems ? JSON.parse(existingItems) : [];
    } catch (error) {
      console.error("Error parsing existing items from localStorage", error);
      itemsArray = [];
    }

    if (!Array.isArray(itemsArray)) {
      itemsArray = [];
    }

    const productIndex = itemsArray.findIndex(item => item.UUID === product.UUID);

    if (productIndex > -1) {
      itemsArray[productIndex].quantity += 1;
      itemsArray[productIndex].selectedsize = size;
      itemsArray[productIndex].selectedcolor = color;
      console.log("Product quantity incremented");
    } else {
      itemsArray.push({ ...product, quantity: 1, selectedsize: size, selectedcolor: color });
      console.log("Product added to cart");
    }

    localStorage.setItem('Items', JSON.stringify(itemsArray));
    router.push('/product/cart');
  };

  const buyNow = () => {
    router.push('/product/cart');
  };

  const colorNamesArray = product.colorNames.split(";;");
  const colorCodesArray = product.colorCodes.split(";;");

  const result = colorNamesArray.reduce<{ color: string; code: string }[]>((accumulator, currentColor, index) => {
    return accumulator.concat({
      color: currentColor,
      code: colorCodesArray[index]
    });
  }, []); // Start with an empty array of the correct type


  console.log(result);



  return (
    <>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-4 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
              <Image
                alt="ecommerce"
                id="main"
                className="w-full sm:w-3/4 md:w-2/3 lg:w-full h-auto object-cover object-center rounded"
                src={mainImage}
                style={{ maxHeight: "500px", objectFit: "contain" }}
                width={500}
                height={500}
                priority
              />
              <div className="mainDiv mt-4">
                <Image
                  src={thumbnail1}
                  alt="Thumbnail 1"
                  onClick={() => handleImageClick(thumbnail1)}
                  className="w-24 h-auto cursor-pointer border-2 border-gray-300 mr-2 rounded"
                  style={{ width: "100px", marginRight: "10px", borderRadius: "10px" }}
                  width={100}
                  height={100}
                  loading="lazy"
                />
                <Image
                  src={thumbnail2}
                  alt="Thumbnail 2"
                  onClick={() => handleImageClick(thumbnail2)}
                  className="w-24 h-auto cursor-pointer border-2 border-gray-300 mr-2 rounded"
                  style={{ width: "100px", marginRight: "10px", borderRadius: "10px" }}
                  width={100}
                  height={100}
                  loading="lazy"
                />
                <Image
                  src={thumbnail3}
                  alt="Thumbnail 3"
                  onClick={() => handleImageClick(thumbnail3)}
                  className="w-24 h-auto cursor-pointer border-2 border-gray-300 mr-2 rounded"
                  style={{ width: "100px", marginRight: "10px", borderRadius: "10px" }}
                  width={100}
                  height={100}
                  loading="lazy"
                />
                <Image
                  src={thumbnail4}
                  alt="Thumbnail 4"
                  onClick={() => handleImageClick(thumbnail4)}
                  className="w-24 h-auto cursor-pointer border-2 border-gray-300 mr-2 rounded"
                  style={{ width: "100px", marginRight: "10px", borderRadius: "10px" }}
                  width={100}
                  height={100}
                  loading="lazy"
                />
              </div>
            </div>
            <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest font-Roboto">
                {product.Cat_Name}
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-4 font-sans">
                {product.Item_Name}
              </h1>
              <div className="flex mb-4  border-gray-300">
                <a
                  className={`flex-grow py-2 text-lg px-1 font-Roboto cursor-pointer ${activeTab === "description"
                    ? "text-indigo-500 border-b-2 border-indigo-500"
                    : ""
                    }`}
                  onClick={() => setActiveTab("description")}
                >
                  Description
                </a>
                <a
                  className={`flex-grow py-2 text-lg px-1 font-Roboto cursor-pointer ${activeTab === "sizeChart"
                    ? "text-indigo-500 border-b-2 border-indigo-500"
                    : ""
                    }`}
                  onClick={() => setActiveTab("sizeChart")}
                >
                  Size Chart
                </a>
              </div>
              {activeTab === "sizeChart" && <div className='' > <Image
                src={thumsizechart}
                alt="Thumbnail 4"
                className="w-full"
                style={{ width: "800", marginLeft: "10px", borderRadius: "10px" }}
                width={600}
                height={600}
                loading="lazy"
              /></div>}
              {activeTab === "description" && (
                <>
                  <p className="leading-relaxed mb-4 font-sans">
                    {product.Remark}
                  </p>
                  <div className="flex border-t border-gray-200 py-2">
                    <span className="text-gray-500 font-Roboto text-sm">Size</span>
                    <span className="ml-auto text-gray-900 flex space-x-2">
                      {["XS", "S", "M", "L", "XL", "XXL"].map((sizeOption) => (
                        <button
                          key={sizeOption}
                          className={`w-8 h-8 rounded-full border-2 ${size === sizeOption
                            ? 'border-blue-600 bg-blue-100 text-blue-600 shadow-lg'
                            : 'border-gray-300 bg-white text-gray-500'
                            } flex items-center justify-center hover:border-blue-500 hover:shadow-xl active:border-blue-700 active:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out`}
                          style={{ fontSize: '0.7rem' }} // Adjusted font size for better visibility
                          onClick={() => handleSizeClick(sizeOption)}
                        >
                          {sizeOption}
                        </button>
                      ))}
                    </span>
                  </div>

                  <div className="flex border-t border-gray-200 py-2">
                    <span className="text-gray-500 font-Roboto text-sm mar">Color</span>
                    <span className="ml-auto flex space-x-2">
                      {result.map((colorOption, index) => (
                        <button
                          key={index}
                          className={`w-8 h-8 rounded-full border-2 ${color === colorOption.color ? 'border-blue-600 ring-2 ring-blue-200' : 'border-gray-300'} flex items-center justify-center transition-transform transform hover:scale-110 hover:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                          style={{ backgroundColor: colorOption.color }}
                          onClick={() => handleColorClick(colorOption.color)}
                          aria-label={colorOption.code}
                          title={colorOption.code} // Add tooltip for better accessibility
                        >
                          {color === colorOption.code && (
                            <svg className="w-5 h-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </button>
                      ))}
                    </span>

                  </div>
                  {/* <span>
                    
                    {colorCodesArray}
                    
                    
                    </span>
                
                  <div className="flex border-t mb-6 border-gray-200 py-2">    <span>
                   
                   {colorNamesArray}
                  
                   </span></div> */}
                  <div className="flex items-center justify-between mt-4">
                    <span className=" title-font font-medium  text-lg sm:text-2xl font-Roboto  tracking-tight  leading-none mb-2  text-red-600">
                      {formatPrice(product.Sales_Price)}
                    </span>

                    <div className="flex space-x-5">
                    <button className="btn btn-outline btn-primary  hover:btn-primary  text-sm sm:text-base  px-4 py-2 sm:px-6 sm:py-3  transition-all duration-300 ease-in-out  flex items-center justify-center gap-2 group">
                    <Heart 
                   size={20} 
                     className="
                     transform group-hover:scale-110 group-hover:fill-current
                     transition-all duration-300 ease-in-out "/>
                   
                     </button>
                      <button className="btn btn-outline btn-primary  hover:btn-primary  text-sm sm:text-base  px-4 py-2 sm:px-6 sm:py-3  transition-all duration-300 ease-in-out  flex items-center justify-center gap-2 group" onClick={() => addToCart(product)}>
                        Add To
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 sm:h-6 sm:w-6 ml-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.5 6h13l-1.5-6M7 13H3m6 9a1 1 0 11-2 0 1 1 0 012 0zm10 0a1 1 0 11-2 0 1 1 0 012 0z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetails;
