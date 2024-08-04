import { AktuelProduct } from "../api/aktuel";

type Props = {
  product: AktuelProduct;
};

export default function AktuelCard({ product }: Props) {
  function getProductPrice() {
    return product.price.replaceAll("\n", "");
  }

  function getImageUrl() {
    return product.imageUrl.replaceAll("kucuk", "buyuk");
  }

  return (
    <div className="border border-zinc-500 bg-zinc-700 w-full flex gap-4 p-2 rounded-lg text-zinc-50">
      <div className="size-48 bg-zinc-900 border overflow-hidden rounded-md flex-shrink-0">
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

          <span>{product.date}</span>
        </div>

        <div
          className="text-xs text-zinc-50/60 pl-0.5"
          dangerouslySetInnerHTML={{ __html: product.description }}
        />
      </div>
    </div>
  );
}
