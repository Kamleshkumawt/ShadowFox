import { useEffect, useRef, useState } from "react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Link, useNavigate } from "react-router-dom";
import ProfileDropdown from "./ProfileDropdown";
import { useGetProductBySearchQuery } from "../store/api/productApi";
import Loading from "./Loading";

const popularSearches = [
  "saree",
  "short kurti",
  "tshirt",
  "watch",
  "kurti",
  "earring",
  "shoes",
  "kurti set",
  "top for women",
  "jeans",
  "slipper",
  "top",
  "bangle",
  "blouse",
  "cotton saree",
  "shirt for men",
];

const Navbar = () => {
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const containerRef = useRef(null);
  // const [open, setOpen] = useState(false);

  const navigate = useNavigate();

 const [searchTrigger, setSearchTrigger] = useState(""); // trigger RTK Query manually

  // RTK Query
  const { data, isLoading } = useGetProductBySearchQuery(searchTrigger, {
    skip: searchTrigger.length < 1
  });

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("recentSearches");
    if (stored) {
      setRecentSearches(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    if (data?.success) {
      // console.log("Search Results:", data.products);
      // Navigate to search results page with query param
      navigate(`/products/search?query=${encodeURIComponent(searchTrigger)}`);
    }
  }, [data, navigate, searchTrigger]);

  // Close dropdown when clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSearch(term) {
    const trimmed = term.trim();
    if (!trimmed) return;

    const updated = [trimmed, ...recentSearches.filter((s) => s !== trimmed)];
    const limited = updated.slice(0, 5);
    setRecentSearches(limited);
    localStorage.setItem("recentSearches", JSON.stringify(limited));

    setSearchTrigger(trimmed);

    setQuery(trimmed);
    setShowDropdown(false);
    console.log("Search:", trimmed);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      handleSearch(query);
    }
  }

  const filteredRecent = recentSearches.filter((item) =>
    item.toLowerCase().includes(query.toLowerCase())
  );

  const filteredPopular = popularSearches.filter((item) =>
    item.toLowerCase().includes(query.toLowerCase())
  );


  return !isLoading ? (
    <div className="fixed bg-white w-full z-50">
      <div className=" w-full h-[70px] flex items-center justify-between px-20 py-2 border-b-2 border-gray-300 z-50">
        <span onClick={()=>{navigate("/");scrollTo(0,0);}} className="text-2xl cursor-pointer">ApanaStore</span>
        <div
          className="relative w-full max-w-2xl mx-auto px-4"
          ref={containerRef}
        >
          {/* Search Bar */}
          <div className="w-full border border-gray-400 rounded-sm flex items-center gap-2 shadow-sm shadow-gray-300 p-[10px] bg-white">
            {/* Left Icon */}
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.7695 18.6698L16.0096 14.9098C17.3296 13.3298 18.1296 11.2999 18.1296 9.07989C18.1296 4.05995 14.0697 0 9.05978 0C4.0599 0 0 4.05995 0 9.07989C0 14.0998 4.0599 18.1598 9.05978 18.1598C11.2897 18.1598 13.3297 17.3498 14.9096 16.0098L18.6695 19.7698C18.9695 20.0698 19.4695 20.0698 19.7695 19.7698C20.0795 19.4698 20.0795 18.9698 19.7695 18.6698ZM9.05978 16.5998C4.91988 16.5998 1.54996 13.2298 1.54996 9.07989C1.54996 4.92994 4.91988 1.55998 9.05978 1.55998C13.1997 1.55998 16.5696 4.92994 16.5696 9.07989C16.5696 13.2298 13.1997 16.5998 9.05978 16.5998Z"
                fill="#8B8BA3"
              />
            </svg>

            {/* Input */}
            <input
              type="text"
              placeholder="Try Saree, Kurti or Search by Product Code"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setShowDropdown(true)}
              onKeyDown={handleKeyDown}
              className="outline-none w-full bg-transparent placeholder:font-medium placeholder:text-[16px] placeholder:text-gray-400"
            />

            {/* Close Icon (optional) */}
            {query.length > 0 && (
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="hover:cursor-pointer"
                onClick={() => {
                  setQuery(""); // clear input
                  setShowDropdown(false); // optionally hide dropdown
                }}
              >
                <path
                  d="M14.3034 15.7767L10.0124 11.4858L5.70897 15.7892C5.24694 16.2512 4.58159 16.3419 4.11956 15.8799C3.65753 15.4178 3.76954 14.7738 4.23157 14.3117L8.53496 10.0083L4.22267 5.69605C3.76064 5.23402 3.65753 4.58108 4.11956 4.11905C4.58159 3.65702 5.22039 3.77427 5.68243 4.2363L9.99472 8.54859L14.3123 4.23106C14.7743 3.76902 15.4183 3.65702 15.8804 4.11905C16.3424 4.58108 16.2517 5.24643 15.7897 5.70846L11.4721 10.026L15.7631 14.317C16.2251 14.779 16.3424 15.4178 15.8804 15.8799C15.4183 16.3419 14.7654 16.2388 14.3034 15.7767Z"
                  fill="#666666"
                />
              </svg>
            )}
          </div>

          {/* Dropdown */}
          {showDropdown &&
            (filteredRecent.length > 0 || filteredPopular.length > 0) && (
              <div className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-200 shadow-lg rounded-md z-50 max-h-72 overflow-y-auto">
                {/* Recent Searches */}
                {filteredRecent.length > 0 && (
                  <div className="px-4 py-3 border-b">
                    <h4 className="text-base text-gray-700 font-semibold mb-2">
                      Recent Searches
                    </h4>
                    <ul className="space-y-2">
                      {filteredRecent.map((item) => (
                        <li
                          key={item}
                          className="cursor-pointer text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2 px-2 py-1 rounded"
                          onClick={() => handleSearch(item)}
                        >
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M3.167 2.717A10 10 0 0 1 10 0c5.523 0 10 4.477 10 10s-4.477 10-10 10S0 15.523 0 10a.833.833 0 1 1 1.667 0 8.333 8.333 0 1 0 2.608-6.042h1.8a.833.833 0 0 1 0 1.667H2.333a.833.833 0 0 1-.833-.833V1.05a.833.833 0 0 1 1.667 0v1.667Zm6 3.95a.833.833 0 1 1 1.667 0v3.591l3.774.742a.838.838 0 0 1-.166 1.667h-.167l-4.441-.892a.833.833 0 0 1-.667-.833V6.667Z"
                              fill="#666"
                            />
                          </svg>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Popular Searches */}
                {filteredPopular.length > 0 && (
                  <div className="px-4 py-3">
                    <h4 className="text-base text-gray-700 font-semibold mb-2">
                      Popular Searches
                    </h4>
                    <ul className="flex flex-wrap gap-2">
                      {filteredPopular.map((item) => (
                        <li
                          key={item}
                          className="cursor-pointer text-sm text-gray-700 bg-gray-100 border border-gray-300 px-4 py-2 rounded-full"
                          onClick={() => handleSearch(item)}
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
        </div>

        <div className="flex items-center justify-between gap-7">
          <span onClick={()=> {navigate('/sellerSignUp');scrollTo(0,0)}} className="text-[16px] cursor-pointer">Become a Supplier</span>
          <span className="w-[2px] h-9 bg-gray-300"></span>
          <span className="text-[16px] cursor-pointer">Investor Relations</span>
          <span className="w-[2px] h-9 bg-gray-300"></span>

          <div className="flex items-center gap-6">
            {/* Profile Icon */}
            <div
              className="flex flex-col items-center  group"
              aria-label="Profile"
            >
              {/* <DropdownMenu open={open} onOpenChange={setOpen} >
                <div onMouseEnter={() => setOpen(true)}
                  onMouseLeave={() => setOpen(false)}
                  className="relative p-4 z-50 transition-all duration-200 ease-out " >

                
                <DropdownMenuTrigger className="flex flex-col items-center gap-1 pt-2 cursor-pointer group">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-gray-800 group-hover:text-yellow-600 transition-colors"
                  >
                    <path
                      fill="currentColor"
                      d="M15.316 13.016c1.512-1.058 2.516-2.797 2.516-4.784A5.835 5.835 0 0 0 12 2.4a5.835 5.835 0 0 0-5.832 5.832 5.79 5.79 0 0 0 2.517 4.784C4.343 14.291 1.2 17.996 1.2 22.37v.022c0 .896.843 1.609 1.825 1.609h17.95c.983 0 1.825-.713 1.825-1.61v-.02c0-4.375-3.143-8.08-7.484-9.354ZM7.853 8.232a4.148 4.148 0 0 1 8.294 0 4.148 4.148 0 0 1-8.294 0Zm13.122 14.083H3.025a.245.245 0 0 1-.14-.032c.054-4.45 4.126-8.057 9.115-8.057 4.99 0 9.05 3.596 9.115 8.057a.245.245 0 0 1-.14.032Z"
                    />
                  </svg>
                  <span className="text-[16px] group-hover:text-yellow-600 transition-colors">
                    Profile
                  </span>

                  <span className="w-20 h-[3px] mt-1 bg-gray-300 opacity-0 group-hover:opacity-100 group-hover:bg-yellow-600 transition-colors"></span>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="p-4">
                  <DropdownMenuLabel className="text-lg font-semibold flex items-center gap-3 justify-center">
                    <img
                      src="https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=76&q=80"
                      className="h-10 w-10 rounded-full"
                      alt="profile"
                    />
                    <div>
                      <h1 className="text-lg font-semibold">Hello User</h1>
                      <p className="text-sm text-gray-600">+91 1234567890</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-lg font-semibold">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 text-gray-700"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16 11V7a4 4 0 00-8 0v4M5 11h14l-1.5 9h-11L5 11z"
                      />
                    </svg>
                    My Orders
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="flex items-center gap-2 text-lg font-semibold bg-transparent border-none p-0 m-0 text-gray-800 px-2"
                      >
                        Edit Profile
                      </Button>
                    </DialogTrigger>

                    <DialogContent
                      showCloseButton={false}
                      className="sm:max-w-[425px]"
                    >
                      <DialogHeader>
                        <DialogTitle>Edit Profile</DialogTitle>
                        <DialogClose asChild>
                          <button
                            className="absolute top-4 right-4 text-gray-500 hover:text-red-600 transition-colors cursor-pointer"
                            aria-label="Close"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-5 h-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </DialogClose>
                        <DialogDescription>
                          Make changes to your profile here. Click save when
                          you&apos;re done.
                        </DialogDescription>
                      </DialogHeader>

                      <form className="grid gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="name">Name</Label>
                          <Input id="name" defaultValue="Pedro Duarte" />
                        </div>

                        <div className="grid gap-2">
                          <Label htmlFor="username">Username</Label>
                          <Input id="username" defaultValue="@peduarte" />
                        </div>

                        <DialogFooter className="mt-4">
                          <DialogClose asChild>
                            <Button
                              variant="outline"
                              type="button"
                              className="cursor-pointer"
                            >
                              Cancel
                            </Button>
                          </DialogClose>
                          <Button type="submit" className="cursor-pointer">
                            Save changes
                          </Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>

                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-lg font-semibold">
                    Delete Account
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-lg font-semibold">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-10 h-10"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1"
                      />
                    </svg>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
                </div>
              </DropdownMenu> */}
              <ProfileDropdown/>
            </div>

            {/* Cart Icon */}
            <Link 
              to="/cart"
              className="flex flex-col items-center gap-1 cursor-pointer"
              aria-label="Cart"
            >
              <svg
                viewBox="0 0 20 20"
                fill="none"
                width="20"
                height="20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="m4.987 5.469 1.848 7.2a1 1 0 0 0 .968.752h8.675a1 1 0 0 0 .962-.726l1.697-5.952a1 1 0 0 0-.962-1.274H4.987Zm0 0-.943-3.248a1 1 0 0 0-.96-.721H1"
                  stroke="#666"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <ellipse
                  cx="9.421"
                  cy="16.744"
                  rx="1.243"
                  ry="1.256"
                  stroke="#666"
                  strokeWidth="1.5"
                />
                <ellipse
                  cx="15.221"
                  cy="16.744"
                  rx="1.243"
                  ry="1.256"
                  stroke="#666"
                  strokeWidth="1.5"
                />
              </svg>
              <span>Cart</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="w-full h-[40px] bg-white border-b-2 border-gray-300">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Women Ethnic</NavigationMenuTrigger>

              {/* <NavigationMenuContent className="p-4 grid grid-cols-3 gap-6 max-w-4xl"> */}
              <NavigationMenuContent
                style={{
                  width: "1410px",
                  maxHeight: "400px",
                  overflowY: "auto",
                }}
                className="p-4 bg-white shadow-lg flex items-start justify-start gap-6"
              >
                {/* Sarees */}
                <div className="flex flex-col leading-0">
                  <div className="font-semibold mb-2">Sarees</div>
                  <NavigationMenuLink>All Sarees</NavigationMenuLink>
                  <NavigationMenuLink>Silk Sarees</NavigationMenuLink>
                  <NavigationMenuLink>Banarasi Silk Sarees</NavigationMenuLink>
                  <NavigationMenuLink>Cotton Sarees</NavigationMenuLink>
                  <NavigationMenuLink>Georgette Sarees</NavigationMenuLink>
                  <NavigationMenuLink>Chiffon Sarees</NavigationMenuLink>
                  <NavigationMenuLink>Heavy Work Sarees</NavigationMenuLink>
                  <NavigationMenuLink>Net Sarees</NavigationMenuLink>
                </div>

                {/* Kurtis */}
                <div>
                  <div className="font-semibold mb-2">Kurtis</div>
                  <NavigationMenuLink>All Kurtis</NavigationMenuLink>
                  <NavigationMenuLink>Anarkali Kurtis</NavigationMenuLink>
                  <NavigationMenuLink>Rayon Kurtis</NavigationMenuLink>
                  <NavigationMenuLink>Cotton Kurtis</NavigationMenuLink>
                  <NavigationMenuLink>Chikankari Kurtis</NavigationMenuLink>
                </div>

                {/* Kurta Sets */}
                <div>
                  <div className="font-semibold mb-2">Kurta Sets</div>
                  <NavigationMenuLink>All Kurta Sets</NavigationMenuLink>
                  <NavigationMenuLink>Kurta Palazzo Sets</NavigationMenuLink>
                  <NavigationMenuLink>Rayon Kurta Sets</NavigationMenuLink>
                  <NavigationMenuLink>Kurta Pant Sets</NavigationMenuLink>
                  <NavigationMenuLink>Cotton Kurta Sets</NavigationMenuLink>
                  <NavigationMenuLink>Sharara Sets</NavigationMenuLink>
                </div>

                {/* Kurta Sets */}
                <div>
                  <div className="font-semibold mb-2">Dupatta Sets</div>
                  <NavigationMenuLink>Cotton Sets</NavigationMenuLink>
                  <NavigationMenuLink>Rayon Sets</NavigationMenuLink>
                  <NavigationMenuLink>Printed Sets</NavigationMenuLink>
                </div>

                {/* Suits & Dress Material */}
                <div>
                  <div className="font-semibold mb-2">
                    Suits & Dress Material
                  </div>
                  <NavigationMenuLink>
                    All Suits & Dress Material
                  </NavigationMenuLink>
                  <NavigationMenuLink>Cotton Suits</NavigationMenuLink>
                  <NavigationMenuLink>Embroidered Suits</NavigationMenuLink>
                  <NavigationMenuLink>Crepe Suits</NavigationMenuLink>
                  <NavigationMenuLink>Silk Suits</NavigationMenuLink>
                  <NavigationMenuLink>Patiala Suits</NavigationMenuLink>
                </div>

                {/* Lehengas */}
                <div>
                  <div className="font-semibold mb-2">Lehengas</div>
                  <NavigationMenuLink>Lehenga Cholis</NavigationMenuLink>
                  <NavigationMenuLink>Net Lehenga</NavigationMenuLink>
                  <NavigationMenuLink>Bridal Lehenga</NavigationMenuLink>
                </div>

                {/* Other Ethnic */}
                <div>
                  <div className="font-semibold mb-2">Other Ethnic</div>
                  <NavigationMenuLink>Blouses</NavigationMenuLink>
                  <NavigationMenuLink>Dupattas</NavigationMenuLink>
                  <NavigationMenuLink>Lehanga</NavigationMenuLink>
                  <NavigationMenuLink>Gown</NavigationMenuLink>
                  <NavigationMenuLink>Skirts & Bottomwear</NavigationMenuLink>
                  <NavigationMenuLink>Islamic Fashion</NavigationMenuLink>
                  <NavigationMenuLink>Petticoats</NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Women Western</NavigationMenuTrigger>

              <NavigationMenuContent
                style={{
                  width: "1410px",
                  maxHeight: "400px",
                  overflowY: "auto",
                }}
                className="p-4 bg-white shadow-lg flex items-start justify-start gap-6"
              >
                {/* Sarees */}
                <div className="flex flex-col leading-0">
                  <div className="font-semibold mb-2">Topwear</div>
                  <NavigationMenuLink>All Topwear</NavigationMenuLink>
                  <NavigationMenuLink>Tops</NavigationMenuLink>
                  <NavigationMenuLink>Dresses</NavigationMenuLink>
                  <NavigationMenuLink>T-shirts</NavigationMenuLink>
                  <NavigationMenuLink>Jumpsuits</NavigationMenuLink>
                </div>

                {/* Kurtis */}
                <div>
                  <div className="font-semibold mb-2">Bottomwear</div>
                  <NavigationMenuLink>All Bottomwear</NavigationMenuLink>
                  <NavigationMenuLink>Jeans & Jeggings</NavigationMenuLink>
                  <NavigationMenuLink>Palazzos</NavigationMenuLink>
                  <NavigationMenuLink>CShorts</NavigationMenuLink>
                  <NavigationMenuLink>Skirts</NavigationMenuLink>
                </div>

                {/* Kurta Sets */}
                <div>
                  <div className="font-semibold mb-2">Innerwear</div>
                  <NavigationMenuLink>Bra</NavigationMenuLink>
                  <NavigationMenuLink>Women Innerwear</NavigationMenuLink>
                  <NavigationMenuLink>Briefs</NavigationMenuLink>
                </div>

                {/* Kurta Sets */}
                <div>
                  <div className="font-semibold mb-2">Sleepwear</div>
                  <NavigationMenuLink>Nightsuits</NavigationMenuLink>
                  <NavigationMenuLink>Women Nightdress</NavigationMenuLink>
                </div>

                {/* Suits & Dress Material */}
                <div>
                  <div className="font-semibold mb-2">Maternity Wear</div>
                  <NavigationMenuLink>
                    All Maternity & Feedingwear
                  </NavigationMenuLink>
                  <NavigationMenuLink>
                    Maternity Kurtis & Dresses
                  </NavigationMenuLink>
                </div>

                {/* Lehengas */}
                <div>
                  <div className="font-semibold mb-2">Sports Wear</div>
                  <NavigationMenuLink>All Women Sportwear</NavigationMenuLink>
                  <NavigationMenuLink>Sports Bra</NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  ) : <Loading/>
};

export default Navbar;
