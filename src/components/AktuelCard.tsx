import { AktuelProduct } from "../api/aktuel";

type Props = {
  product: AktuelProduct;
  grid: boolean;
};

export default function AktuelCard({ product, grid }: Props) {
  function getProductPrice() {
    return product.price.replaceAll("\n", "");
  }

  function getImageUrl() {
    return product.imageUrl.replaceAll("kucuk", "buyuk");
  }

  return (
    <div
      className={`border border-zinc-500 bg-zinc-700 w-full flex p-2 rounded-lg text-zinc-50 ${
        grid ? "flex-col gap-2" : "gap-4"
      }`}
    >
      <div
        className={`bg-zinc-900 border overflow-hidden rounded-md flex-shrink-0 ${
          grid ? "w-full" : "size-48"
        }`}
      >
        {product.imageUrl && (
          <img
            onClick={() => window.open(product.imageUrl, "_blank")}
            className="size-full cursor-pointer"
            src={getImageUrl()}
            alt={product.title + " image"}
          />
        )}
      </div>

      <div>
        <div
          className="text-xl font-semibold pb-1 cursor-pointer"
          onClick={() => window.open(product.pageUrl, "_blank")}
        >
          {product.title}
        </div>

        <div className="text-sm flex gap-1 items-center text-zinc-50 pl-0.5 pb-0.5">
          <span className="text-base">{getProductPrice()}</span>

          <span className="w-1 h-1 rounded-full bg-zinc-400 shrink-0" />

          <span className="opacity-80">{product.date}</span>
        </div>

        <div
          className="text-xs text-zinc-50/60 pl-0.5"
          dangerouslySetInnerHTML={{ __html: product.description }}
        />
      </div>
    </div>
  );
}
