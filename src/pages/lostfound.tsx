// import { useState } from "react";

// interface LostItem {
//   id: number;
//   imageUrls: string[];
//   description: string;
//   claimedBy?: string;
// }

// const sampleImages = [
//   "https://cdn.mos.cms.futurecdn.net/t8DxZU65K3rL3Me6sxQUAA-1920-80.jpg",
//   "https://i5.walmartimages.com/asr/8b17a1dc-0276-4d9e-a72d-0785128f2faa.16ebe343924fd7f850e5df1791e18d1e.jpeg",
//   "https://tse1.mm.bing.net/th?id=OIP.dQ3-jaTgES8KgaKq-LwbaQHaJo&pid=Api&P=0&h=180",
//   "https://tse1.mm.bing.net/th?id=OIP.0omE9LzhetGt6UYYoEqV0wHaE7&pid=Api&P=0&h=180",
// ];

// const initialItems: LostItem[] = [
//   {
//     id: 1,
//     description: "Grey backpack near the library",
//     imageUrls: [sampleImages[2]],
//   },
//   {
//     id: 2,
//     description: "Phone found in the cafeteria",
//     imageUrls: [sampleImages[0]],
//   },
//   {
//     id: 3,
//     description: "Leather wallet found in corridor A block",
//     imageUrls: [sampleImages[1]],
//   },
//   {
//     id: 4,
//     description: "Keys found in Library",
//     imageUrls: [sampleImages[3]],
//   },
// ];

// const LostAndFound = () => {
//   const [foundItems, setFoundItems] = useState<LostItem[]>(initialItems);
//   const [description, setDescription] = useState("");
//   const [images, setImages] = useState<string[]>([]);

//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = e.target.files;
//     if (!files) return;

//     const urls = Array.from(files)
//       .slice(0, 4)
//       .map((file) => URL.createObjectURL(file));
//     setImages(urls);
//   };

//   const handleSubmit = () => {
//     if (!description || images.length === 0) return;

//     const newItem: LostItem = {
//       id: Date.now(),
//       imageUrls: images,
//       description,
//     };

//     setFoundItems([newItem, ...foundItems]);
//     setDescription("");
//     setImages([]);
//   };

//   const acknowledgeItem = (id: number) => {
//     const name = prompt("Enter your name to claim this item:");
//     if (!name) return;

//     setFoundItems((prev) =>
//       prev.map((item) =>
//         item.id === id ? { ...item, claimedBy: name } : item
//       )
//     );
//   };

//   return (
//     <div className="min-h-screen bg-white py-10 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-3xl mx-auto">
//         <h1 className="text-4xl font-bold text-center text-blue-700 mb-10">
//           🧭 Digital Lost & Found
//         </h1>

//         <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-12 shadow-md">
//           <h2 className="text-2xl font-semibold text-blue-700 mb-4">
//             Found something?
//           </h2>
//           <textarea
//             placeholder="Short description..."
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             className="w-full border border-blue-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <input
//             type="file"
//             accept="image/*"
//             multiple
//             onChange={handleImageUpload}
//             className="mb-4 text-blue-700"
//           />
//           <div className="flex flex-wrap gap-3 mb-4">
//             {images.map((src, i) => (
//               <img
//                 key={i}
//                 src={src}
//                 className="w-24 h-24 object-cover rounded-lg border border-blue-300"
//               />
//             ))}
//           </div>
//           <button
//             onClick={handleSubmit}
//             disabled={!description || images.length === 0}
//             className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded-lg transition disabled:opacity-50"
//           >
//             Add to Lost & Found
//           </button>
//         </div>

//         <div>
//           <h2 className="text-2xl font-semibold text-blue-700 mb-6">
//             📋 Reported Items
//           </h2>
//           <div className="grid gap-6">
//             {foundItems.map((item) => (
//               <div
//                 key={item.id}
//                 className="bg-blue-50 border border-blue-200 rounded-xl p-4 shadow"
//               >
//                 <div className="flex flex-wrap gap-3 mb-3">
//                   {item.imageUrls.map((url, idx) => (
//                     <img
//                       key={idx}
//                       src={url}
//                       alt="Lost Item"
//                       className="w-24 h-24 object-cover rounded-lg border border-blue-300"
//                     />
//                   ))}
//                 </div>
//                 <p className="text-blue-900 text-base">{item.description}</p>
//                 {item.claimedBy ? (
//                   <p className="text-green-700 font-semibold mt-2">
//                     ✅ Claimed by {item.claimedBy}
//                   </p>
//                 ) : (
//                   <button
//                     onClick={() => acknowledgeItem(item.id)}
//                     className="text-blue-600 text-sm mt-2 hover:underline"
//                   >
//                     I lost this!
//                   </button>
//                 )}
//               </div>
//             ))}
//             {foundItems.length === 0 && (
//               <p className="text-gray-500 text-center">No items yet.</p>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LostAndFound;
import { useState } from "react";
import { MainLayout } from "@/components/layout/main-layout";

interface LostItem {
  id: number;
  imageUrls: string[];
  description: string;
  claimedBy?: string;
}

const sampleImages = [
  "https://cdn.mos.cms.futurecdn.net/t8DxZU65K3rL3Me6sxQUAA-1920-80.jpg",
  "https://i5.walmartimages.com/asr/8b17a1dc-0276-4d9e-a72d-0785128f2faa.16ebe343924fd7f850e5df1791e18d1e.jpeg",
  "https://tse1.mm.bing.net/th?id=OIP.dQ3-jaTgES8KgaKq-LwbaQHaJo&pid=Api&P=0&h=180",
  "https://tse1.mm.bing.net/th?id=OIP.0omE9LzhetGt6UYYoEqV0wHaE7&pid=Api&P=0&h=180",
];

const initialItems: LostItem[] = [
  {
    id: 1,
    description: "Grey backpack near the library",
    imageUrls: [sampleImages[2]],
  },
  {
    id: 2,
    description: "Phone found in the cafeteria",
    imageUrls: [sampleImages[0]],
  },
  {
    id: 3,
    description: "Leather wallet found in corridor A block",
    imageUrls: [sampleImages[1]],
  },
  {
    id: 4,
    description: "keys found in Library",
    imageUrls: [sampleImages[3]],
  }
];

const LostAndFound = () => {
  const [foundItems, setFoundItems] = useState<LostItem[]>(initialItems);
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<string[]>([]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const urls = Array.from(files)
      .slice(0, 4)
      .map((file) => URL.createObjectURL(file));
    setImages(urls);
  };

  const handleSubmit = () => {
    if (!description || images.length === 0) return;

    const newItem: LostItem = {
      id: Date.now(),
      imageUrls: images,
      description,
    };

    setFoundItems([newItem, ...foundItems]);
    setDescription("");
    setImages([]);
  };

  const acknowledgeItem = (id: number) => {
    const name = prompt("Enter your name to claim this item:");
    if (!name) return;

    setFoundItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, claimedBy: name } : item
      )
    );
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-6">
            🧭 Digital Lost & Found
          </h1>

          <div className="bg-white shadow rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Found something?</h2>
            <textarea
              placeholder="Short description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 rounded p-2 mb-4"
            />
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="mb-4"
            />
            <div className="flex flex-wrap gap-2 mb-4">
              {images.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  className="w-24 h-24 object-cover rounded border"
                />
              ))}
            </div>
            <button
              onClick={handleSubmit}
              disabled={!description || images.length === 0}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            >
              Add to Lost & Found
            </button>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Reported Items</h2>
            <div className="grid gap-4">
              {foundItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white shadow-md rounded-lg p-4 space-y-2"
                >
                  <div className="flex flex-wrap gap-2">
                    {item.imageUrls.map((url, idx) => (
                      <img
                        key={idx}
                        src={url}
                        alt="Item"
                        className="w-24 h-24 object-cover rounded border"
                      />
                    ))}
                  </div>
                  <p className="text-gray-700">{item.description}</p>
                  {item.claimedBy ? (
                    <span className="text-green-600 font-semibold">
                      ✅ Claimed by {item.claimedBy}
                    </span>
                  ) : (
                    <button
                      onClick={() => acknowledgeItem(item.id)}
                      className="text-sm text-blue-500 hover:text-blue-700 underline"
                    >
                      I lost this!
                    </button>
                  )}
                </div>
              ))}
              {foundItems.length === 0 && (
                <p className="text-gray-500 text-center">No items yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default LostAndFound;