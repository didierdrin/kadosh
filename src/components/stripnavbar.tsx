"use client";
import React from "react";
import { useRouter } from "next/navigation";

const StripNavbar: React.FC = () => {
  const router = useRouter();

  const handleCategorySelect = (category: string) => {
    // Navigate to the /seeall page with the selected category as a query parameter
    router.push(`/seeall?category=${category}`);
    // Force a page reload after navigation to apply the filters properly
    window.location.href = `/seeall?category=${category}`;
  };

  return (
    <div className="text-xs hidden sm:flex h-[10px] py-3 items-center justify-center space-x-[70px] text-black bg-yellow-50">
      <button onClick={() => handleCategorySelect("All")} className="hover:text-teal-500">
        All
      </button>
      <button onClick={() => handleCategorySelect("Apple")} className="hover:text-teal-500">
        Apple
      </button>
      <button onClick={() => handleCategorySelect("HP")} className="hover:text-teal-500">
        HP
      </button>
      <button onClick={() => handleCategorySelect("Dell")} className="hover:text-teal-500">
        Dell
      </button>
      <button onClick={() => handleCategorySelect("Accessories")} className="hover:text-teal-500">
        Accessories
      </button>
      <button onClick={() => handleCategorySelect("Samsung")} className="hover:text-teal-500">
        Samsung
      </button>
      <button onClick={() => handleCategorySelect("Sony")} className="hover:text-teal-500">
        Sony
      </button>
      <button onClick={() => handleCategorySelect("Huawei")} className="hover:text-teal-500">
        Huawei
      </button>
    </div>
  );
};

export default StripNavbar;


// "use client";
// import React from "react";

// interface StripNavbarProps {
//   onCategorySelect: (category: string) => void; // Callback function for category selection
// }

// const StripNavbar: React.FC<StripNavbarProps> = ({ onCategorySelect }) => {
//   return (
//     <div className="text-xs hidden sm:flex h-[10px] py-3 items-center justify-center space-x-[70px] text-black bg-yellow-50">
//       <button onClick={() => onCategorySelect("All")} className="hover:text-teal-500">
//         All
//       </button>
//       <button onClick={() => onCategorySelect("Apple")} className="hover:text-teal-500">
//         Apple
//       </button>
//       <button onClick={() => onCategorySelect("HP")} className="hover:text-teal-500">
//         HP
//       </button>
//       <button onClick={() => onCategorySelect("Dell")} className="hover:text-teal-500">
//         Dell
//       </button>
//       <button onClick={() => onCategorySelect("Accessories")} className="hover:text-teal-500">
//         Accessories
//       </button>
//       <button onClick={() => onCategorySelect("Samsung")} className="hover:text-teal-500">
//         Samsung
//       </button>
//       <button onClick={() => onCategorySelect("Sony")} className="hover:text-teal-500">
//         Sony
//       </button>
//       <button onClick={() => onCategorySelect("Huawei")} className="hover:text-teal-500">
//         Huawei
//       </button>
//     </div>
//   );
// };

// export default StripNavbar;

