import { renderToStaticMarkup } from "react-dom/server";
import { RichText } from "../src/components/ui";
import { test, expect } from "vitest";
test("rich", () => {
  const h = renderToStaticMarkup(<RichText text={"Susun: **Nasab Nabi ﷺ hingga Adnan** (bahagian 1)\nSifat **Iradah** الإرادة ialah"} />);
  console.log(h);
  expect(h).toContain("<strong>Nasab Nabi ﷺ hingga Adnan</strong>");
  expect(h).not.toContain("**");
  expect(h).toContain('class="arab-inline">الإرادة</span>');
});
