import { prisma } from "$lib/server/prisma";
import { fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { generateSlug } from "$lib/utils/slug";
import {
  getCategoriesHierarchy,
  type CategoryWithChildren,
} from "$lib/server/queries/categories";

export const load: PageServerLoad = async ({ params }) => {
  const category = await prisma.category.findUnique({
    where: { id: params.id },
  });

  if (!category) {
    throw redirect(404, "/admin/categories");
  }

  const allCategories = await getCategoriesHierarchy();

  // Filter out the current category and its descendants from the list of potential parents
  const getDescendantIds = (
    catId: string,
    categories: CategoryWithChildren[],
  ): string[] => {
    const category = categories.find((c) => c.id === catId);
    if (!category) return [];
    let ids = [catId];
    if (category.children) {
      for (const child of category.children) {
        ids = [...ids, ...getDescendantIds(child.id, categories)];
      }
    }
    return ids;
  };

  const flatCategories = (
    categories: CategoryWithChildren[],
  ): CategoryWithChildren[] => {
    let flat: CategoryWithChildren[] = [];
    for (const category of categories) {
      flat.push({ ...category, children: [] });
      if (category.children) {
        flat = [...flat, ...flatCategories(category.children)];
      }
    }
    return flat;
  };

  const allFlatCategories = flatCategories(allCategories);
  const descendantIds = getDescendantIds(params.id, allCategories);
  const availableParents = allFlatCategories.filter(
    (c) => !descendantIds.includes(c.id),
  );

  return { category, categories: availableParents };
};

export const actions: Actions = {
  updateCategory: async ({ request, params }) => {
    const data = await request.formData();
    const name = data.get("name") as string;
    const parentId = data.get("parentCategoryId") as string | undefined;

    if (!name) {
      return fail(400, { message: "El nombre es requerido." });
    }

    try {
      await prisma.category.update({
        where: { id: params.id },
        data: {
          name,
          slug: generateSlug(name),
          parentId: parentId || null,
        },
      });
      return { success: true, message: "Categoría actualizada exitosamente!" };
    } catch (error) {
      console.error("Error al actualizar la categoría:", error);
      return fail(500, { message: "Fallo al actualizar la categoría." });
    }
  },
};
