
import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";
import { PAGE_META } from "../lib/render-page.mjs";

type PageMeta = {
  title: string;
  description: string;
};

const pageMetaByPath: Record<string, PageMeta> = PAGE_META;

export function SeoSync() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  useEffect(() => {
    const path =
      pathname === "/" ? "/" : pathname.replace(/\/$/, "");

    const meta =
      pageMetaByPath[path] ?? pageMetaByPath["/"];

    document.title = meta.title;

    const description =
      document.querySelector<HTMLMetaElement>(
        'meta[name="description"]'
      );

    description?.setAttribute("content", meta.description);
  }, [pathname]);

  return null;
}
