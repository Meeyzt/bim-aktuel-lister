import { useEffect, useMemo, useState } from "react";
import AktuelCard from "./components/AktuelCard";
import { AktuelProduct } from "./api/aktuel";
import {
  ArrowDown01Icon,
  ArrowDown10Icon,
  Grid2x2,
  Grid2x2Icon,
  GridIcon,
  Rows3Icon,
} from "lucide-react";

function App() {
  const [aktuelProducts, setAktuelProducts] = useState<AktuelProduct[]>([]);
  const [searchText, setSearchText] = useState("");
  const [hideSearchLabel, setHideSearchLabel] = useState(false);
  const [sort, setSort] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [viewType, setViewType] = useState("list");

  async function getAktuelProducts() {
    const response = await fetch("http://localhost:3001/scrape");
    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");

    let isRequestDone = false;

    while (!isRequestDone) {
      const { done, value } = await reader.read();

      if (done) {
        isRequestDone = true;
      }

      const chunkText = decoder.decode(value);

      // Parse and update state
      try {
        const parsedData: AktuelProduct[] = JSON.parse(chunkText);
        setAktuelProducts((prevProducts) => [...prevProducts, ...parsedData]);
        setIsLoading(false);
      } catch (e) {
        console.error("JSON parse error:", e);
      }
    }
  }

  const searchedProducts = useMemo(
    () =>
      aktuelProducts
        .filter((product) => {
          return (
            product.title.toLowerCase().includes(searchText.toLowerCase()) ||
            product.description
              .toLowerCase()
              .includes(searchText.toLowerCase()) ||
            product.date.toLowerCase().includes(searchText.toLowerCase())
          );
        })
        .sort((a, b) => {
          if (sort) {
            return (
              parseFloat(b.price.replace(/[^\d]/g, "")) -
              parseFloat(a.price.replace(/[^\d]/g, ""))
            );
          } else {
            return (
              parseFloat(a.price.replace(/[^\d]/g, "")) -
              parseFloat(b.price.replace(/[^\d]/g, ""))
            );
          }
        }),
    [aktuelProducts, searchText, sort]
  );

  function scrollToTop() {
    const scrollElement = document.getElementById("scrollContainer");
    if (scrollElement) {
      // scroll to top with behavior smooth
      scrollElement.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }

  useEffect(() => {
    scrollToTop();
  }, [sort, searchText, viewType]);

  useEffect(() => {
    setIsLoading(false);
    setAktuelProducts([
      {
        imageUrl:
          "https://www.bim.com.tr/Uploads/aktuel-urunler/1146_kucuk_543X467_23-temmuz-gida-2-019.jpg",
        title: "Osmancık Pirinç",
        price: "225,\n00\n₺",
        description: '<div class="gramajadet">• 5 Kg</div>',
        pageUrl: "https://www.bim.com.tr/?Bim_AktuelTarihKey=1146",
        date: "23 Temmuz Salı",
      },
      {
        imageUrl:
          "https://www.bim.com.tr/Uploads/aktuel-urunler/1146_kucuk_543X467_23-temmuz-gida-2-021.jpg",
        title: "Kırmızı Biber Dolgulu Yeşil Zeytin",
        price: "135,\n00\n₺",
        description:
          '<div class="gramajadet">• 1000 g</div><ul><li><span class="bullet">•</span><span class="text"> 201-260 adet/kg</span></li></ul>',
        pageUrl: "https://www.bim.com.tr/?Bim_AktuelTarihKey=1146",
        date: "23 Temmuz Salı",
      },
      {
        imageUrl:
          "https://www.bim.com.tr/Uploads/aktuel-urunler/1146_kucuk_543X467_23-temmuz-gida-2-020.jpg",
        title: "Pilavlık Bulgur",
        price: "49,\n00\n₺",
        description: '<div class="gramajadet">• 2,5 Kg</div>',
        pageUrl: "https://www.bim.com.tr/?Bim_AktuelTarihKey=1146",
        date: "23 Temmuz Salı",
      },
      {
        imageUrl:
          "https://www.bim.com.tr/Uploads/aktuel-urunler/1146_kucuk_543X467_23-temmuz-gida-2-018.jpg",
        title: "%0,5 Yağlı Süt",
        price: "21,\n90\n₺",
        description: '<div class="gramajadet">• 1 L</div>',
        pageUrl: "https://www.bim.com.tr/?Bim_AktuelTarihKey=1146",
        date: "23 Temmuz Salı",
      },
      {
        imageUrl:
          "https://www.bim.com.tr/Uploads/aktuel-urunler/1146_kucuk_543X467_23-temmuz-gida-2-022.jpg",
        title: "Ton Balığı",
        price: "79,\n75\n₺",
        description: '<div class="gramajadet">• 4x80 g</div>',
        pageUrl: "https://www.bim.com.tr/?Bim_AktuelTarihKey=1146",
        date: "23 Temmuz Salı",
      },
      {
        imageUrl:
          "https://www.bim.com.tr/Uploads/aktuel-urunler/1146_kucuk_543X467_23-temmuz-gida-2-014.jpg",
        title: "Margarin Kase 250 G Paket 250 G",
        price: "49,\n50\n₺",
        description: "",
        pageUrl: "https://www.bim.com.tr/?Bim_AktuelTarihKey=1146",
        date: "23 Temmuz Salı",
      },
      {
        imageUrl:
          "https://www.bim.com.tr/Uploads/aktuel-urunler/1146_kucuk_543X467_23-temmuz-gida-2-013.jpg",
        title: "Süt Karameli Süt Reçeli",
        price: "23,\n75\n₺",
        description: "",
        pageUrl: "https://www.bim.com.tr/?Bim_AktuelTarihKey=1146",
        date: "23 Temmuz Salı",
      },
      {
        imageUrl:
          "https://www.bim.com.tr/Uploads/aktuel-urunler/1146_kucuk_543X467_23-temmuz-gida-2-017.jpg",
        title: "Domates Salçası",
        price: "32,\n50\n₺",
        description: "",
        pageUrl: "https://www.bim.com.tr/?Bim_AktuelTarihKey=1146",
        date: "23 Temmuz Salı",
      },
      {
        imageUrl:
          "https://www.bim.com.tr/Uploads/aktuel-urunler/1146_kucuk_543X467_23-temmuz-gida-2-015.jpg",
        title: "Tatlı Biber Salçası",
        price: "28,\n50\n₺",
        description: '<div class="gramajadet">• 350 G</div>',
        pageUrl: "https://www.bim.com.tr/?Bim_AktuelTarihKey=1146",
        date: "23 Temmuz Salı",
      },
      {
        imageUrl:
          "https://www.bim.com.tr/Uploads/aktuel-urunler/1146_kucuk_543X467_23-temmuz-gida-2-016.jpg",
        title: "Domates Rendesi",
        price: "21,\n50\n₺",
        description: '<div class="gramajadet">• 700 G</div>',
        pageUrl: "https://www.bim.com.tr/?Bim_AktuelTarihKey=1146",
        date: "23 Temmuz Salı",
      },
      {
        imageUrl:
          "https://www.bim.com.tr/Uploads/aktuel-urunler/1146_kucuk_543X467_23-temmuz-gida-2-011.jpg",
        title: "Fıstık&Sade",
        price: "150,\n00\n₺",
        description: '<div class="gramajadet">• 680 ml / 500g</div>',
        pageUrl: "https://www.bim.com.tr/?Bim_AktuelTarihKey=1146",
        date: "23 Temmuz Salı",
      },
      {
        imageUrl:
          "https://www.bim.com.tr/Uploads/aktuel-urunler/1146_kucuk_543X467_23-temmuz-gida-2-012.jpg",
        title: "Sade",
        price: "90,\n00\n₺",
        description: '<div class="gramajadet">• 680 ml / 500 g</div>',
        pageUrl: "https://www.bim.com.tr/?Bim_AktuelTarihKey=1146",
        date: "23 Temmuz Salı",
      },
      {
        imageUrl:
          "https://www.bim.com.tr/Uploads/aktuel-urunler/1146_kucuk_543X467_23-temmuz-gida-2-009.jpg",
        title: "Pizza Extra Karışık",
        price: "87,\n50\n₺",
        description: '<div class="gramajadet">• 475 g</div>',
        pageUrl: "https://www.bim.com.tr/?Bim_AktuelTarihKey=1146",
        date: "23 Temmuz Salı",
      },
    ]);
    // getAktuelProducts();
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full bg-zinc-900">
      <div className="w-full h-full">
        {isLoading ? (
          <div className="w-full h-full flex items-center justify-center">
            <div id="dots" className="flex gap-4">
              <div className="size-4 bg-zinc-200 rounded-full animate-pulse"></div>
              <div className="size-4 bg-zinc-200 rounded-full animate-pulse delay-100"></div>
              <div className="size-4 bg-zinc-200 rounded-full animate-pulse delay-200"></div>
            </div>
          </div>
        ) : (
          <div className="h-full w-full flex flex-col">
            <div className="w-full sticky top-0 left-0 bg-zinc-900 border-b border-zinc-600 px-2 py-3">
              <div className="text-3xl text-text font-bold mb-6 text-zinc-50">
                Bim Aktüel Ürünler
              </div>

              <div className="flex gap-4 w-full px-1">
                <label className="relative w-full">
                  {!hideSearchLabel && (
                    <span className="text-zinc-50 absolute left-2 bottom-2 select-none pointer-events-none">
                      Ara:
                    </span>
                  )}

                  <input
                    className="appearance-none bg-zinc-900 border border-zinc-700 text-zinc-50 rounded-md text-lg w-full outline-none focus:outline-none p-1 px-2 hover:border-zinc-500 focus:border-zinc-200 focus:ring-2 focus:ring-zinc-200"
                    type="search"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    onFocus={() => setHideSearchLabel(true)}
                    onBlur={() => !searchText && setHideSearchLabel(false)}
                  />
                </label>

                <div
                  className={`shrink-0 flex gap-1 p-1 px-1.5 rounded-md items-center text-zinc-50 select-none cursor-pointer ${
                    sort
                      ? "bg-zinc-500 hover:bg-zinc-600"
                      : "bg-zinc-700 hover:bg-zinc-800"
                  }`}
                  onClick={() => setSort((prev) => !prev)}
                >
                  {!sort ? (
                    <ArrowDown01Icon size={24} />
                  ) : (
                    <ArrowDown10Icon size={24} />
                  )}
                  Ücret
                </div>

                <div className="text-zinc-50 select-none cursor-pointer items-center w-20 hidden md:flex">
                  <div
                    onClick={() => setViewType("grid")}
                    className={`p-1 w-full h-full flex items-center justify-center rounded-l-md ${
                      viewType === "grid"
                        ? "bg-zinc-700 hover:bg-zinc-800"
                        : "bg-zinc-500 hover:bg-zinc-600"
                    }`}
                  >
                    <GridIcon />
                  </div>

                  <div
                    onClick={() => setViewType("list")}
                    className={`p-1 w-full h-full flex items-center justify-center rounded-r-md ${
                      viewType === "list"
                        ? "bg-zinc-700 hover:bg-zinc-800"
                        : "bg-zinc-500 hover:bg-zinc-600"
                    }`}
                  >
                    <Rows3Icon />
                  </div>
                </div>
              </div>
            </div>

            <div
              id="scrollContainer"
              className={`w-full h-full overflow-y-auto px-4 py-6 gap-4 ${
                viewType === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
                  : "flex flex-col"
              }`}
            >
              {searchedProducts.map((product, index) => (
                <AktuelCard
                  key={index}
                  product={product}
                  grid={viewType === "grid"}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
