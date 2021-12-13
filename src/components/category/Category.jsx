import React from "react";
import { useSearchParams } from "react-router-dom";
import { category, filterByCategory } from "../../data";

export default function Category() {
  let [searchParams] = useSearchParams();
  let search = searchParams.get("cat");
  const list = React.useMemo(() => {
    if (!search) return category;
    return filterByCategory(search);
  }, [search]);
  return (
    <div>
      {list.map((cat) => (
        <p key={cat.id}>
          {cat.name} {cat.price}
        </p>
      ))}
    </div>
  );
}
